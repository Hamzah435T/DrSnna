import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { fetchDoctors, fetchDoctorSchedule } from "../../../api/clinicDoctorsApi";
import { getClinicAppointments, deleteClinicAppointment, createClinicAppointment } from "../../../api/clinicAppointmentsApi";
import ModernAlertModal from "../../../components/ModernAlertModal";

/**
 * ClinicAppointments – Calendar screen for managing appointments.
 */
export default function ClinicAppointments() {
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
        const d = new Date(2026, 7, 23); // Force August 2026, starting Sunday
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
            title: "Delete Appointment",
            message: `Are you sure you want to delete the appointment for ${doctorLabel}${timeLabel}? This action cannot be undone.`,
            type: "danger",
            showCancel: true,
            cancelText: "Cancel",
            confirmText: "Delete Appointment",
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
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Schedule View</h3>
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
                        <TrashIcon className="w-4 h-4" /> Delete Selected
                    </button>
                    <button
                        onClick={() => setIsNewAppointmentOpen(true)}
                        className="bg-blue-800 text-white rounded-full py-2 px-4 flex items-center justify-center gap-1.5 font-semibold shadow-md cursor-pointer hover:bg-blue-700 transition-colors text-[13px]"
                    >
                        <span className="text-lg leading-none mb-0.5">+</span> New Appointment
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

function NewAppointmentModal({ doctors, onClose, onSaved }) {
    const [selectedDoc, setSelectedDoc] = useState(doctors[0]?.id || null);
    const [docSchedules, setDocSchedules] = useState([]);
    const [bookedSlots, setBookedSlots] = useState(new Set());
    const [selectedTime, setSelectedTime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ open: false, title: "", message: "", type: "warning" });

    useEffect(() => {
        if (selectedDoc) {
            fetchDoctorSchedule(selectedDoc).then(data => {
                const shifts = data.filter(d => d.isActive && d.isoDate);
                shifts.sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate));
                setDocSchedules(shifts);
                setSelectedTime(null);
            });

            // Fetch booked slots for this doctor
            const today = new Date();
            const startStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            const future = new Date(today);
            future.setDate(future.getDate() + 30);
            const endStr = `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, '0')}-${String(future.getDate()).padStart(2, '0')}`;

            getClinicAppointments(startStr, endStr, selectedDoc).then(apps => {
                const booked = new Set();
                apps.forEach(app => {
                    if (app.status !== 'CANCELLED') {
                        const dt = new Date(app.appointmentAt);
                        const hours = String(dt.getHours()).padStart(2, '0');
                        const m = String(dt.getMonth() + 1).padStart(2, '0');
                        const d = String(dt.getDate()).padStart(2, '0');
                        const dateStr = `${dt.getFullYear()}-${m}-${d}`;
                        booked.add(`${dateStr}_${hours}:00`);
                    }
                });
                setBookedSlots(booked);
            }).catch(err => {
                console.error("Failed to load doctor appointments:", err);
            });
        }
    }, [selectedDoc]);

    const getAvailableSlots = (schedule) => {
        const start = parseInt(schedule.startTime.split(':')[0]);
        const end = parseInt(schedule.endTime.split(':')[0]);
        const slots = [];
        for (let i = start; i < end; i++) {
            slots.push(`${String(i).padStart(2, '0')}:00`);
        }
        return slots;
    };

    const handleSave = async () => {
        if (!selectedDoc || !selectedTime) return;
        setLoading(true);
        try {
            await createClinicAppointment({
                doctorId: selectedDoc,
                appointmentDate: selectedTime.date,
                appointmentTime: selectedTime.time + ":00" // HH:mm:ss
            });
            onSaved();
        } catch (err) {
            console.error(err);
            const msg = err.message || "Failed to create appointment";
            const isAlreadyBooked = msg.toLowerCase().includes("already booked");
            setAlertConfig({
                open: true,
                title: isAlreadyBooked ? "Slot Already Booked" : "Unable to Schedule",
                message: isAlreadyBooked
                    ? "This appointment time slot is already reserved for this doctor. Please choose a different hour or day."
                    : msg,
                type: isAlreadyBooked ? "warning" : "error"
            });
        } finally {
            setLoading(false);
        }
    };

    const colors = ["bg-emerald-500", "bg-blue-500", "bg-purple-500", "bg-orange-500"];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-[800px] mx-4 flex flex-col overflow-hidden animate-[scaleIn_0.2s_ease-out]">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">New Walk-In Appointment</h2>
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                        <CloseIcon />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[70vh]">
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-gray-800 mb-4">Select Doctor</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {doctors.map((doc, idx) => (
                                <div
                                    key={doc.id}
                                    onClick={() => { setSelectedDoc(doc.id); setSelectedTime(null); }}
                                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedDoc === doc.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${colors[idx % colors.length]}`}>
                                        {doc.fullName.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">{doc.fullName}</h4>
                                        <p className="text-xs text-gray-500">{doc.specialty}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-gray-800">Select Time</h3>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded bg-white border border-gray-300 inline-block"></span>
                                    <span>Available</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded bg-gray-200 border border-gray-300 inline-block"></span>
                                    <span>Booked</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded bg-gray-100 border border-gray-200 inline-block"></span>
                                    <span>Past</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            {docSchedules.length === 0 && <p className="text-sm text-gray-500">No shifts available for this doctor.</p>}
                            {docSchedules.map((schedule) => {
                                const slots = getAvailableSlots(schedule);
                                return (
                                    <div key={schedule.isoDate}>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{schedule.isoDate} ({schedule.dayLabel})</h4>
                                        <div className="grid grid-cols-8 gap-2">
                                            {slots.map((time, tIdx) => {
                                                const slotKey = `${schedule.isoDate}_${time}`;
                                                const isBooked = bookedSlots.has(slotKey);
                                                const isSelected = selectedTime?.date === schedule.isoDate && selectedTime?.time === time;

                                                // Check if this specific slot time has already passed
                                                const [sYear, sMonth, sDay] = schedule.isoDate.split('-').map(Number);
                                                const [h, m] = time.split(':').map(Number);
                                                const slotDateTime = new Date(sYear, sMonth - 1, sDay, h, m || 0, 0, 0);
                                                const isPast = slotDateTime <= new Date();

                                                const isDisabled = isBooked || isPast;

                                                return (
                                                    <button
                                                        key={tIdx}
                                                        disabled={isDisabled}
                                                        onClick={() => !isDisabled && setSelectedTime({ date: schedule.isoDate, time })}
                                                        title={isBooked ? "Slot already booked" : isPast ? "This time has already passed" : `Select ${time}`}
                                                        className={`w-full h-11 rounded-lg text-sm font-medium border flex items-center justify-center transition-all ${isDisabled
                                                            ? 'bg-gray-100/90 border-gray-200 text-gray-400 cursor-not-allowed select-none opacity-70'
                                                            : isSelected
                                                                ? 'bg-blue-800 border-blue-800 text-white shadow-sm'
                                                                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/40 cursor-pointer'
                                                            }`}
                                                    >
                                                        {isBooked ? (
                                                            <div className="flex flex-col items-center leading-none">
                                                                <span className="line-through text-xs text-gray-400">{time}</span>
                                                                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">Booked</span>
                                                            </div>
                                                        ) : isPast ? (
                                                            <div className="flex flex-col items-center leading-none">
                                                                <span className="line-through text-xs text-gray-400">{time}</span>
                                                                <span className="text-[8px] font-semibold text-gray-400 uppercase tracking-tighter mt-0.5">Past</span>
                                                            </div>
                                                        ) : (
                                                            <span>{time}</span>
                                                        )}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                    <button onClick={onClose} disabled={loading} className="px-6 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button disabled={!selectedTime || loading} onClick={handleSave} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-md disabled:opacity-50 transition-all">
                        {loading ? "Saving..." : "Schedule Appointment"}
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
