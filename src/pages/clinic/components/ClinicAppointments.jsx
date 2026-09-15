import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import { fetchDoctors, fetchDoctorSchedule } from "../../../api/clinicDoctorsApi";
import { getClinicAppointments, deleteClinicAppointment, createClinicAppointment, fetchClinicAvailability } from "../../../api/clinicAppointmentsApi";
import ModernAlertModal from "../../../components/ModernAlertModal";
import { localToUtcSpecific } from "../../../utils/timezone";
import '../../patient/ClinicDetails.css';

/**
 * ClinicAppointments – Calendar screen for managing appointments.
 */
export default function ClinicAppointments() {
    const { t } = useTranslation();
    const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [doctorFilters, setDoctorFilters] = useState({});
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [alertConfig, setAlertConfig] = useState({ open: false, title: "", message: "", type: "warning" });

    const showAlert = (message, title = "Notice", type = "warning") => {
        setAlertConfig({ open: true, title, message, type });
    };

    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - d.getDay());
        return d;
    });

    useEffect(() => {
        const loadDoctors = async () => {
            try {
                const docs = await fetchDoctors();
                setDoctors(docs);
                const initialFilters = {};
                docs.forEach(doc => {
                    initialFilters[doc.id] = true;
                });
                setDoctorFilters(initialFilters);
            } catch (err) {
                console.error(err);
            }
        };
        loadDoctors();
    }, []);

    const fetchWeekAppointments = async () => {
        try {
            const startStr = `${currentWeekStart.getFullYear()}-${String(currentWeekStart.getMonth() + 1).padStart(2, '0')}-${String(currentWeekStart.getDate()).padStart(2, '0')}`;
            const end = new Date(currentWeekStart);
            end.setDate(end.getDate() + 6);
            const endStr = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;

            const apps = await getClinicAppointments(startStr, endStr);
            const colors = ["bg-emerald-500", "bg-blue-500", "bg-purple-500", "bg-orange-500"];

            const formatted = apps.map(app => {
                const dt = new Date(app.appointmentAt);
                const hours = dt.getHours();
                const m = String(dt.getMonth() + 1).padStart(2, '0');
                const d = String(dt.getDate()).padStart(2, '0');
                const dateStr = `${dt.getFullYear()}-${m}-${d}`;

                let docIndex = doctors.findIndex(d => d.id === app.doctorId);
                if (docIndex < 0) docIndex = 0;

                return {
                    id: app.appointmentId,
                    doctorId: app.doctorId,
                    doctorName: app.doctorName,
                    type: app.serviceName || "Walk-In",
                    date: dateStr,
                    startTime: `${String(hours).padStart(2, '0')}:00`,
                    endTime: `${String(hours + 1).padStart(2, '0')}:00`,
                    timeIndex: hours,
                    color: colors[docIndex % colors.length]
                };
            });
            setAppointments(formatted);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchWeekAppointments();
    }, [currentWeekStart, doctors]);

    const handleDelete = () => {
        if (!selectedAppointmentId) {
            showAlert("Please select an appointment from the calendar first to delete it.", "No Appointment Selected", "warning");
            return;
        }

        const selectedApp = appointments.find(a => a.id === selectedAppointmentId);
        const doctorLabel = selectedApp ? selectedApp.doctorName : "this appointment";
        const timeLabel = selectedApp ? ` on ${selectedApp.date} at ${selectedApp.startTime}` : "";

        setAlertConfig({
            open: true,
            title: t('clinicAppointments.deleteModal.title'),
            message: `Are you sure you want to delete the appointment for ${doctorLabel}${timeLabel}? This action cannot be undone.`,
            type: "danger",
            showCancel: true,
            cancelText: t('clinicAppointments.deleteModal.cancel'),
            confirmText: t('clinicAppointments.deleteModal.confirm'),
            onConfirm: async () => {
                setAlertConfig(prev => ({ ...prev, open: false }));
                try {
                    await deleteClinicAppointment(selectedAppointmentId);
                    fetchWeekAppointments();
                    setSelectedAppointmentId(null);
                } catch (err) {
                    console.error(err);
                    showAlert("Failed to delete appointment. Please try again.", "Delete Failed", "error");
                }
            }
        });
    };

    const days = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(currentWeekStart);
        date.setDate(date.getDate() + i);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const dayNum = String(date.getDate()).padStart(2, '0');

        return {
            name: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
            date: date.getDate(),
            dateString: `${year}-${month}-${dayNum}`,
            active: date.toDateString() === new Date().toDateString()
        };
    });

    const times = [
        "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM",
        "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM",
        "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
    ];

    const visibleAppointments = appointments.filter(app => doctorFilters[app.doctorId]);

    function getAppointmentsForCell(colIdx, timeIndex) {
        const dateStr = days[colIdx].dateString;
        return visibleAppointments.filter(app => app.date === dateStr && app.timeIndex === timeIndex);
    }

    const scrollContainerRef = useRef(null);
    const hasScrolledRef = useRef(false);

    useEffect(() => {
        if (!scrollContainerRef.current || hasScrolledRef.current) return;
        const currentWeekDateStrings = days.map(d => d.dateString);
        const currentWeekApps = visibleAppointments.filter(app => currentWeekDateStrings.includes(app.date));
        let earliestTimeIndex = 8;
        if (currentWeekApps.length > 0) {
            earliestTimeIndex = Math.min(...currentWeekApps.map(app => app.timeIndex));
        }
        const scrollPos = Math.max(0, earliestTimeIndex * 100 - 20);
        setTimeout(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({ top: scrollPos, behavior: 'smooth' });
                hasScrolledRef.current = true;
            }
        }, 100);
    });

    useEffect(() => {
        hasScrolledRef.current = false;
    }, [currentWeekStart, doctorFilters]);

    const [portalNode, setPortalNode] = useState(null);
    useEffect(() => {
        const node = document.getElementById("sidebar-page-content");
        if (node) setPortalNode(node);
    }, []);

    const colors = ["bg-emerald-500", "bg-blue-500", "bg-purple-500", "bg-orange-500"];
    const sidebarContent = (
        <div className="flex flex-col gap-4 mt-22">
            <div className="mt-2">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">{t('clinicDashboard.dailySchedule.title')}</h3>
                <div className="flex flex-col gap-1.5">
                    {doctors.map((doc, idx) => (
                        <DoctorToggle
                            key={doc.id}
                            name={doc.fullName}
                            color={colors[idx % colors.length]}
                            checked={!!doctorFilters[doc.id]}
                            onChange={(v) => setDoctorFilters(f => ({ ...f, [doc.id]: v }))}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] min-h-0 bg-white rounded-xl shadow-sm relative">
            {portalNode && createPortal(sidebarContent, portalNode)}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-500">
                        <button onClick={() => {
                            const d = new Date(currentWeekStart);
                            d.setDate(d.getDate() - 7);
                            setCurrentWeekStart(d);
                        }} className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"><ChevronLeftIcon /></button>
                        <button onClick={() => {
                            const d = new Date(currentWeekStart);
                            d.setDate(d.getDate() + 7);
                            setCurrentWeekStart(d);
                        }} className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"><ChevronRightIcon /></button>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                        {currentWeekStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDelete}
                        className={`rounded-full py-2 px-4 flex items-center justify-center gap-1.5 font-semibold transition-all text-[13px] ${selectedAppointmentId
                            ? 'bg-red-500 text-white shadow-md hover:bg-red-600 cursor-pointer'
                            : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <TrashIcon className="w-4 h-4" /> {t('clinicAppointments.actions.deleteSelected')}
                    </button>
                    <button
                        onClick={() => setIsNewAppointmentOpen(true)}
                        className="bg-blue-800 text-white rounded-full py-2 px-4 flex items-center justify-center gap-1.5 font-semibold shadow-md cursor-pointer hover:bg-blue-700 transition-colors text-[13px]"
                    >
                        <span className="text-lg leading-none mb-0.5">+</span> {t('clinicAppointments.actions.newAppointment')}
                    </button>
                </div>
            </div>

            <div ref={scrollContainerRef} className="flex-1 overflow-auto relative bg-white scroll-smooth">
                <div className="min-w-[800px] grid grid-cols-[60px_repeat(7,1fr)] grid-rows-[70px_repeat(24,100px)] relative">
                    <div className="border-b border-r border-gray-100 bg-white sticky top-0 left-0 z-30"></div>
                    {days.map((day, i) => (
                        <div key={i} className="border-b border-r border-gray-100 flex flex-col items-center justify-center bg-white sticky top-0 z-20">
                            <span className={`text-xs font-semibold ${day.active ? 'text-blue-600' : 'text-gray-400'}`}>{day.name}</span>
                            <span className={`text-2xl font-bold mt-1 ${day.active ? 'bg-blue-800 text-white w-10 h-10 rounded-full flex items-center justify-center' : 'text-gray-800'}`}>
                                {day.date}
                            </span>
                        </div>
                    ))}
                    {times.map((time, rowIdx) => (
                        <div key={`time-row-${rowIdx}`} className="contents">
                            <div className="border-r border-b border-gray-100 flex items-start justify-center pt-2 bg-white sticky left-0 z-20">
                                <span className="text-[10px] font-semibold text-gray-400">{time}</span>
                            </div>
                            {days.map((_, colIdx) => {
                                const cellApps = getAppointmentsForCell(colIdx, rowIdx);
                                return (
                                    <div key={`cell-${rowIdx}-${colIdx}`} className="border-r border-b border-gray-100 relative p-1 group hover:bg-gray-50/50 transition-colors z-10">
                                        <div className="flex w-full h-full gap-1 relative">
                                            {cellApps.map(app => {
                                                const isSelected = selectedAppointmentId === app.id;
                                                return (
                                                    <div
                                                        key={app.id}
                                                        onClick={() => setSelectedAppointmentId(app.id)}
                                                        className={`flex-1 rounded-md p-2 cursor-pointer text-white overflow-hidden transition-all duration-200 ${app.color} ${isSelected ? 'ring-2 ring-blue-900 shadow-lg scale-[1.02] z-30' : 'opacity-90 hover:opacity-100 z-20'}`}
                                                    >
                                                        <p className="text-xs font-bold leading-tight">{app.doctorName} {app.type && `- ${app.type}`}</p>
                                                        <p className="text-[10px] opacity-90 mt-0.5">{app.startTime} - {app.endTime}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            {isNewAppointmentOpen && (
                <NewAppointmentModal
                    doctors={doctors}
                    onClose={() => setIsNewAppointmentOpen(false)}
                    onSaved={() => {
                        setIsNewAppointmentOpen(false);
                        fetchWeekAppointments();
                    }}
                />
            )}
            <ModernAlertModal
                isOpen={alertConfig.open}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                showCancel={alertConfig.showCancel}
                cancelText={alertConfig.cancelText}
                confirmText={alertConfig.confirmText}
                onConfirm={alertConfig.onConfirm}
                onClose={() => setAlertConfig(prev => ({ ...prev, open: false }))}
            />
        </div>
    );
}

function formatTime12h(time24) {
    if (!time24) return '';
    const [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}


function getUpcomingDates() {
    const dates = [];
    const today = new Date();
    for (let offset = 0; offset < 7; offset++) {
        const d = new Date(today);
        d.setDate(today.getDate() + offset);
        dates.push(d);
    }
    return dates;
}

function formatDateLabel(date) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
}

function formatDateForApi(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function NewAppointmentModal({ doctors, onClose, onSaved }) {
    const { t } = useTranslation();
    const [selectedDoc, setSelectedDoc] = useState(doctors[0]?.id || null);

    // Services
    const [services, setServices] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);


    // Filter services based on selected doctor
    const filteredServices = useMemo(() => {
        if (!selectedDoc || !services.length) return [];
        const doc = doctors.find(d => d.id === selectedDoc);
        if (!doc || !doc.specialty) return [];

        const docSpecialties = doc.specialty.split(',').map(s => s.trim().toLowerCase());
        const filtered = services.filter(service => {
            const serviceName = service.name.toLowerCase().trim();
            return docSpecialties.some(ds => serviceName.includes(ds) || ds.includes(serviceName));
        });

        return filtered;
    }, [selectedDoc, doctors, services]);

    // Reset selected services when doctor changes
    useEffect(() => {
        if (filteredServices.length > 0) {
            // Only set if we don't already have valid selections for this doctor
            setSelectedServiceIds(prev => {
                const validIds = prev.filter(id => filteredServices.some(s => s.id === id));
                if (validIds.length > 0) return validIds;
                return [filteredServices[0].id];
            });
        } else {
            setSelectedServiceIds([]);
        }
    }, [filteredServices]);

    // Dates
    const activeDates = useMemo(() => getUpcomingDates(), []);
    const [selectedDate, setSelectedDate] = useState(activeDates[0]);

    // Slots
    const [slotsByDate, setSlotsByDate] = useState({});
    const [loadingSlots, setLoadingSlots] = useState(false);

    // Appointment Selection
    const [selectedTime, setSelectedTime] = useState(null); // { date, time, utcDate, utcTime, rawTime }

    // UI State
    const [loading, setLoading] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ open: false, title: "", message: "", type: "warning" });

    // 1. Fetch clinic specialties (services)
    useEffect(() => {
        let isMounted = true;
        const loadServices = async () => {
            try {
                // We fetch specialties using the generic fetch from clinicProfileApi
                const { fetchSpecialties } = await import('../../../api/clinicProfileApi');
                const specs = await fetchSpecialties();
                if (isMounted) {
                    const mappedSpecs = specs.map((s, idx) => ({
                        id: s.id || `service-${idx}`,
                        name: s.name || s,
                        duration: s.durationMinutes || 30
                    }));
                    setServices(mappedSpecs);
                    if (mappedSpecs.length > 0) {
                        setSelectedServiceIds([mappedSpecs[0].id]);
                    }
                }
            } catch (err) {
                console.warn("Failed to load clinic specialties", err);
            }
        };
        loadServices();
        return () => { isMounted = false; };
    }, []);

    // 2. Fetch Slots when Doc, Service, or Date changes
    useEffect(() => {
        let isMounted = true;

        if (!selectedDoc || !selectedServiceIds.length) {
            setSlotsByDate({});
            return;
        }

        setLoadingSlots(true);
        setSelectedTime(null);

        // Fetch all 7 days in parallel to build the map
        Promise.all(
            activeDates.map(date => {
                const dateStr = formatDateForApi(date);
                return fetchClinicAvailability(dateStr, selectedDoc, selectedServiceIds)
                    .then(res => {
                        const rawSlots = Array.isArray(res) ? res : [];
                        return { date: dateStr, slots: rawSlots };
                    })
                    .catch(() => ({ date: dateStr, slots: [] }));
            })
        ).then(results => {
            if (!isMounted) return;

            const map = {};
            results.forEach(result => {
                const convertedSlots = result.slots
                    .map(slot => {
                        const rawTime = typeof slot === 'string' ? slot : (slot.time || '');
                        if (!rawTime) return null;

                        const timeWithSec = rawTime.length === 5 ? `${rawTime}:00` : rawTime;

                        // Original backend utc times for booking payload
                        let utcDate, utcTime;
                        if (slot.appointmentAt) {
                            const apptDateObj = new Date(slot.appointmentAt);
                            utcDate = `${apptDateObj.getUTCFullYear()}-${String(apptDateObj.getUTCMonth() + 1).padStart(2, '0')}-${String(apptDateObj.getUTCDate()).padStart(2, '0')}`;
                            utcTime = `${String(apptDateObj.getUTCHours()).padStart(2, '0')}:${String(apptDateObj.getUTCMinutes()).padStart(2, '0')}:00`;
                        }

                        return {
                            time: timeWithSec, // We assume timeWithSec is Local Time directly
                            rawTime,
                            time12h: formatTime12h(timeWithSec),
                            available: typeof slot === 'object' ? slot.available !== false : true,
                            utcDate,
                            utcTime,
                            scheduleId: typeof slot === 'object' ? (slot.scheduleId || slot.id) : undefined
                        };
                    })
                    .filter(Boolean);

                map[result.date] = convertedSlots.sort((a, b) => a.time.localeCompare(b.time));
            });

            setSlotsByDate(map);
            setLoadingSlots(false);
        });

        return () => { isMounted = false; };
    }, [selectedDoc, activeDates, selectedServiceIds]);

    const handleTreatmentClick = (serviceId) => {
        setSelectedServiceIds(prev => {
            if (prev.includes(serviceId)) {
                if (prev.length === 1) return prev;
                return prev.filter(id => id !== serviceId);
            }
            if (prev.length >= 2) return prev;
            return [...prev, serviceId];
        });
    };

    const handleSave = async () => {
        if (!selectedDoc || !selectedTime) return;
        setLoading(true);
        try {
            await createClinicAppointment({
                doctorId: selectedDoc,
                appointmentDate: selectedTime.utcDate || formatDateForApi(selectedDate),
                appointmentTime: selectedTime.utcTime || selectedTime.time,
                serviceIds: selectedServiceIds
            });
            onSaved();
        } catch (err) {
            console.error(err);
            const msg = err.message || "Failed to create appointment";
            const isAlreadyBooked = msg.toLowerCase().includes("already booked") || msg.toLowerCase().includes("overlap");
            setAlertConfig({
                open: true,
                title: isAlreadyBooked ? "Slot Already Booked" : "Unable to Schedule",
                message: isAlreadyBooked
                    ? "This appointment time slot is already reserved for this doctor or overlaps with another. Please choose a different slot."
                    : msg,
                type: isAlreadyBooked ? "warning" : "error"
            });
        } finally {
            setLoading(false);
        }
    };

    const colors = ["bg-emerald-500", "bg-blue-500", "bg-purple-500", "bg-orange-500"];
    const selectedDateStr = formatDateForApi(selectedDate);
    const currentSlots = slotsByDate[selectedDateStr] || [];

    // Group slots by hour
    const groupedSlots = {};
    currentSlots.forEach(slot => {
        const hour = slot.time.split(':')[0];
        if (!groupedSlots[hour]) groupedSlots[hour] = [];
        groupedSlots[hour].push(slot);
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-[900px] mx-4 flex flex-col overflow-hidden animate-[scaleIn_0.2s_ease-out] max-h-[90vh]">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">{t('clinicAppointments.newModal.title')}</h2>
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <CloseIcon />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 bg-slate-50/30">

                    {/* DOCTOR SELECTION */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">{t('clinicAppointments.newModal.selectDoctor')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {doctors.map((doc, idx) => (
                                <div
                                    key={doc.id}
                                    onClick={() => { setSelectedDoc(doc.id); }}
                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedDoc === doc.id ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${colors[idx % colors.length]}`}>
                                        {doc.fullName.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">{doc.fullName}</h4>
                                        <p className="text-xs text-gray-500">{doc.specialty || 'General Practice'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="cd-appointment-picker !p-0 !bg-transparent !shadow-none">
                        {/* 1. TREATMENT */}
                        <div className="cd-appointment-section">
                            <div className="cd-appointment-heading">
                                <span>{t('clinicAppointments.newModal.selectTreatment')}</span>
                            </div>
                            <div className="cd-treatment-list">
                                {filteredServices.length > 0 ? (
                                    filteredServices.map(treatment => {
                                        const selected = selectedServiceIds.includes(treatment.id);
                                        return (
                                            <button
                                                key={treatment.id}
                                                type="button"
                                                className={`cd-treatment-btn ${selected ? 'cd-treatment-selected' : ''}`}
                                                onClick={() => handleTreatmentClick(treatment.id)}
                                            >
                                                <span className="cd-treatment-radio">{selected ? '✓' : ''}</span>
                                                <span className="cd-treatment-name">{treatment.name}</span>
                                                <span className="cd-treatment-duration">{treatment.duration} min</span>
                                            </button>
                                        );
                                    })
                                ) : (
                                    <div className="text-sm text-slate-500 italic py-2">
                                        {services.length === 0 ? t('clinicAppointments.newModal.loadingServices') : t('clinicAppointments.newModal.noTreatments')}
                                    </div>
                                )}
                            </div>
                            {selectedServiceIds.length >= 2 && (
                                <div className="cd-treatment-limit">{t('clinicAppointments.newModal.maxTreatments')}</div>
                            )}
                        </div>

                        {/* 2. DATE SELECTOR */}
                        <div className="cd-appointment-section">
                            <div className="cd-appointment-heading">
                                <span>{t('clinicAppointments.newModal.selectDate')}</span>
                                <span className="cd-appointment-legend">
                                    <span><i className="cd-dot-selected"></i> {t('clinicAppointments.newModal.selected')}</span>
                                    <span><i className="cd-dot-available"></i> {t('clinicAppointments.newModal.available')}</span>
                                    <span><i className="cd-dot-booked"></i> {t('clinicAppointments.newModal.booked')}</span>
                                </span>
                            </div>
                            <div className="cd-date-selector">
                                {activeDates.map(date => {
                                    const dateStr = formatDateForApi(date);
                                    const isSelected = selectedDateStr === dateStr;
                                    const slots = slotsByDate[dateStr] || [];
                                    const availableCount = slots.filter(s => s.available).length;

                                    return (
                                        <button
                                            key={dateStr}
                                            type="button"
                                            className={`cd-date-btn ${isSelected ? 'cd-date-selected' : ''}`}
                                            onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                                        >
                                            <span className="cd-date-top">{formatDateLabel(date).split(',')[0]}</span>
                                            <strong>{date.getDate()}</strong>
                                            <span className="cd-date-month">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                                            {availableCount > 0 && (
                                                <span className="cd-date-available">{availableCount} {t('clinicAppointments.newModal.slots')}</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 3. TIME */}
                        <div className="cd-appointment-section">
                            <div className="cd-appointment-heading">
                                <span>{t('clinicAppointments.newModal.selectTime')}</span>
                                {loadingSlots && <span className="cd-loading-text">{t('clinicAppointments.newModal.loading')}</span>}
                            </div>

                            {!loadingSlots && currentSlots.length === 0 ? (
                                <div className="cd-no-slots">
                                    {t('clinicAppointments.newModal.noSlots')}
                                </div>
                            ) : (
                                <div className="cd-hour-list">
                                    {Object.entries(groupedSlots)
                                        .sort(([a], [b]) => a.localeCompare(b))
                                        .map(([hour, slots]) => (
                                            <div key={hour} className="cd-hour-row">
                                                <div className="cd-hour-label">
                                                    <strong>{formatTime12h(`${hour}:00`)}</strong>
                                                    <span>{slots.filter(s => s.available).length} {t('clinicAppointments.newModal.slotsFree')}</span>
                                                </div>
                                                <div className="cd-hour-slots">
                                                    {[0, 15, 30, 45].map(minute => {
                                                        const minuteString = String(minute).padStart(2, '0');
                                                        const slot = slots.find(s => s.time.startsWith(`${hour}:${minuteString}`));
                                                        if (!slot) return <div key={minute} className="cd-slot-empty" />;

                                                        const isSelected = selectedTime?.time === slot.time;
                                                        return (
                                                            <button
                                                                key={minute}
                                                                type="button"
                                                                disabled={!slot.available}
                                                                className={`cd-new-slot ${isSelected ? 'cd-new-slot-selected' : slot.available ? 'cd-new-slot-available' : 'cd-new-slot-booked'}`}
                                                                onClick={() => slot.available && setSelectedTime({ date: selectedDateStr, time: slot.time, utcDate: slot.utcDate, utcTime: slot.utcTime, rawTime: slot.rawTime })}
                                                            >
                                                                <span>{slot.time12h}</span>
                                                                {!slot.available && <small>{t('clinicAppointments.newModal.booked')}</small>}
                                                                {slot.available && !isSelected && <small>{t('clinicAppointments.newModal.available')}</small>}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-5 border-t border-gray-200 flex justify-end gap-3 bg-white">
                    <button onClick={onClose} disabled={loading} className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer border border-gray-300 shadow-sm">
                        {t('clinicAppointments.newModal.cancel')}
                    </button>
                    <button disabled={!selectedTime || loading} onClick={handleSave} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md disabled:opacity-50 transition-all cursor-pointer">
                        {loading ? t('clinicAppointments.newModal.saving') : t('clinicAppointments.newModal.schedule')}
                    </button>
                </div>
            </div>
            <ModernAlertModal
                isOpen={alertConfig.open}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onClose={() => setAlertConfig(prev => ({ ...prev, open: false }))}
            />
        </div>
    );
}




function ChevronLeftIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>; }
function ChevronRightIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>; }
function CloseIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>; }

function DoctorToggle({ name, color, checked, onChange }) {
    return (
        <label className="flex items-center justify-between px-2 py-1.5 cursor-pointer group">
            <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{name}</span>
            </div>
            <input type="checkbox" className="hidden" checked={checked} onChange={(e) => onChange(e.target.checked)} />
            <div className={`w-9 h-5 rounded-full relative transition-colors flex items-center ${checked ? color : 'bg-gray-200'}`}>
                <div className={`absolute left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${checked ? 'translate-x-[16px]' : 'translate-x-0'}`}></div>
            </div>
        </label>
    );
}

function TrashIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
    );
}

