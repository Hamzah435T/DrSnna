// src/pages/patient/BookAppointment.jsx
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import {
    MapPin,
    Clock,
    Phone,
    Calendar,
    Check,
    CheckCircle2,
    ArrowLeft,
    Building2,
    User,
    ShieldCheck,
    CreditCard,
    Stethoscope,
    AlertCircle,
} from 'lucide-react';
import PatientNavbar from '../../components/PatientNavbar';
import { fetchClinicDetails, fetchAvailability, bookPatientAppointment } from '../../api/patientApi';
import { getAuth } from '../../auth/authStorage';
import ModernAlertModal from '../../components/ModernAlertModal';

const DAY_ORDER = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const DAY_SHORT = { MONDAY: 'Mon', TUESDAY: 'Tue', WEDNESDAY: 'Wed', THURSDAY: 'Thu', FRIDAY: 'Fri', SATURDAY: 'Sat', SUNDAY: 'Sun' };

function formatTime12h(time24) {
    if (!time24) return '';
    const [h, m] = time24.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

function mergeClinicHours(clinicHours) {
    if (!clinicHours || clinicHours.length === 0) return '';
    const dayMap = {};
    for (const h of clinicHours) {
        if (h.dayOfWeek) {
            dayMap[h.dayOfWeek] = { start: h.startTime, end: h.endTime };
        }
    }

    const rows = [];
    let i = 0;
    while (i < DAY_ORDER.length) {
        const day = DAY_ORDER[i];
        const hours = dayMap[day];
        const timeStr = hours ? `${formatTime12h(hours.start)} - ${formatTime12h(hours.end)}` : 'Closed';

        let j = i + 1;
        while (j < DAY_ORDER.length) {
            const nextDay = DAY_ORDER[j];
            const nextHours = dayMap[nextDay];
            const nextTimeStr = nextHours ? `${formatTime12h(nextHours.start)} - ${formatTime12h(nextHours.end)}` : 'Closed';
            if (nextTimeStr === timeStr) {
                j++;
            } else {
                break;
            }
        }

        const startDay = DAY_SHORT[DAY_ORDER[i]];
        const endDay = DAY_SHORT[DAY_ORDER[j - 1]];
        const label = i === j - 1 ? startDay : `${startDay} - ${endDay}`;
        if (timeStr !== 'Closed') {
            rows.push(`${label}: ${timeStr}`);
        }
        i = j;
    }
    return rows.join(' | ') || 'Hours upon request';
}

function getNext7Days() {
    const days = [];
    const today = new Date();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);

        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const dateNum = String(d.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${dateNum}`;

        days.push({
            dateStr,
            dayName: i === 0 ? 'Today' : (i === 1 ? 'Tomorrow' : dayNames[d.getDay()]),
            formattedDate: `${monthNames[d.getMonth()]} ${d.getDate()}`,
            fullDate: d
        });
    }
    return days;
}

export default function BookAppointment() {
    const { clinicId: paramClinicId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const stateData = location.state || {};
    const effectiveClinicId = paramClinicId || stateData.clinicId;
    const auth = getAuth();

    // Patient Form State
    const [fullName, setFullName] = useState(auth?.fullName || auth?.name || '');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(auth?.phoneNumber || '');

    // Multiple Service Selection State (Max 2)
    const [selectedServiceIds, setSelectedServiceIds] = useState(() => {
        if (stateData.serviceId) return [stateData.serviceId];
        if (stateData.serviceIds && Array.isArray(stateData.serviceIds)) return stateData.serviceIds;
        return [];
    });

    const [selectedDoctorId, setSelectedDoctorId] = useState(stateData.doctorId || '');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [notes, setNotes] = useState('');

    // Date & Time Selection
    const upcomingDays = useMemo(() => getNext7Days(), []);
    const [selectedDayObj, setSelectedDayObj] = useState(() => {
        if (stateData.selectedDate) {
            const match = upcomingDays.find(d => d.dateStr === stateData.selectedDate);
            if (match) return match;
        }
        return upcomingDays[0];
    });
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(stateData.selectedTime || '');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    // Clinic Data
    const [clinic, setClinic] = useState(null);
    const [loadingClinic, setLoadingClinic] = useState(Boolean(effectiveClinicId));
    const [clinicError, setClinicError] = useState(effectiveClinicId ? null : 'No clinic selected. Please select a clinic to book an appointment.');

    // Confirmation & Alerts
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingSuccessData, setBookingSuccessData] = useState(null);
    const [alertConfig, setAlertConfig] = useState({ open: false, title: '', message: '', type: 'info' });

    // Fetch clinic details from Backend API
    useEffect(() => {
        if (!effectiveClinicId) return;

        let isMounted = true;
        fetchClinicDetails(effectiveClinicId)
            .then(data => {
                if (!isMounted) return;
                setClinic(data);
                setClinicError(null);

                // Auto-select doctor
                if (stateData.doctorId) {
                    setSelectedDoctorId(stateData.doctorId);
                } else if (data.doctors && data.doctors.length === 1) {
                    setSelectedDoctorId(data.doctors[0].doctorId || data.doctors[0].id);
                }

                setLoadingClinic(false);
            })
            .catch(err => {
                if (!isMounted) return;
                setClinicError(err.message || 'Failed to load clinic details from server.');
                setLoadingClinic(false);
            });

        return () => {
            isMounted = false;
        };
    }, [effectiveClinicId, stateData.doctorId]);

    // List of active clinic doctors
    const activeDoctors = useMemo(() => {
        return clinic?.doctors ? clinic.doctors.filter(doc => doc.isActive !== false) : [];
    }, [clinic]);

    // Active doctor entity
    const currentDoctor = useMemo(() => {
        return activeDoctors.find(d => String(d.doctorId || d.id) === String(selectedDoctorId)) || activeDoctors[0];
    }, [activeDoctors, selectedDoctorId]);

    // All clinic services normalized
    const allClinicServices = useMemo(() => {
        if (clinic?.services && clinic.services.length > 0) {
            return clinic.services.map(s => ({
                id: s.serviceId || s.id,
                name: s.serviceName || s.name || 'General Dental Care'
            }));
        }
        if (clinic?.specialties && clinic.specialties.length > 0) {
            return clinic.specialties.map((s) => ({
                id: typeof s === 'object' ? (s.id || s.serviceId) : s,
                name: typeof s === 'object' ? (s.name || s.specialtyName) : s
            }));
        }
        return [];
    }, [clinic]);

    // Filter services dynamically to ONLY what the selected doctor offers
    const doctorServices = useMemo(() => {
        if (!currentDoctor) return allClinicServices;

        const rawSpecialty = currentDoctor.specialty || currentDoctor.specialties;
        if (!rawSpecialty) return allClinicServices;

        let specialtyNames = [];
        if (Array.isArray(rawSpecialty)) {
            specialtyNames = rawSpecialty.map(s => (typeof s === 'object' ? (s.name || s.specialtyName) : s)?.trim().toLowerCase());
        } else if (typeof rawSpecialty === 'string') {
            specialtyNames = rawSpecialty.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
        }

        if (specialtyNames.length === 0) return allClinicServices;

        const filtered = allClinicServices.filter(srv =>
            specialtyNames.includes(srv.name.trim().toLowerCase())
        );

        return filtered.length > 0 ? filtered : allClinicServices;
    }, [currentDoctor, allClinicServices]);

    // Sync selected services when doctor changes
    useEffect(() => {
        if (doctorServices.length > 0) {
            setSelectedServiceIds(prev => {
                const valid = prev.filter(id => doctorServices.some(ds => String(ds.id) === String(id)));
                if (valid.length > 0) return valid;
                return [doctorServices[0].id];
            });
        }
    }, [doctorServices]);

    // Fetch availability slots strictly based on backend schedule
    useEffect(() => {
        const currentClinicId = clinic?.clinicId || clinic?.id || effectiveClinicId;
        if (!currentClinicId) return;

        let isMounted = true;
        setLoadingSlots(true);

        fetchAvailability({
            clinicId: currentClinicId,
            date: selectedDayObj.dateStr,
            doctorId: selectedDoctorId || undefined
        })
            .then(slots => {
                if (!isMounted) return;
                if (slots && Array.isArray(slots) && slots.length > 0) {
                    const mapped = slots.map(s => {
                        const rawTime = s.time ? (s.time.length === 5 ? `${s.time}:00` : s.time) : '09:00:00';
                        const [h, m] = rawTime.split(':').map(Number);
                        const ampm = h >= 12 ? 'PM' : 'AM';
                        const hour = h % 12 || 12;
                        return {
                            time: `${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`,
                            rawTime: rawTime,
                            available: s.available !== false,
                            scheduleId: s.scheduleId
                        };
                    });
                    setAvailableSlots(mapped);
                } else {
                    setAvailableSlots([]);
                }
                setLoadingSlots(false);
            })
            .catch(() => {
                if (!isMounted) return;
                setAvailableSlots([]);
                setLoadingSlots(false);
            });

        return () => {
            isMounted = false;
        };
    }, [clinic?.clinicId, clinic?.id, effectiveClinicId, selectedDayObj, selectedDoctorId]);

    // Handle Service Checkbox Toggle with a 2-Service Limit
    const handleToggleService = (serviceId) => {
        setSelectedServiceIds(prev => {
            if (prev.includes(serviceId)) {
                return prev.filter(id => id !== serviceId);
            } else {
                if (prev.length >= 2) {
                    setAlertConfig({
                        open: true,
                        title: 'Selection Limit Reached',
                        message: 'You can select a maximum of 2 services per consultation visit.',
                        type: 'warning'
                    });
                    return prev;
                }
                return [...prev, serviceId];
            }
        });
    };

    // Formatted clinic hours
    const displayHours = clinic?.workingHours || (clinic?.clinicHours ? mergeClinicHours(clinic.clinicHours) : '09:00 AM - 05:00 PM');

    // Sequential Step Completion Logic
    const isStep1Complete = Boolean(fullName.trim() && age.toString().trim());
    const isStep2Complete = Boolean(isStep1Complete && selectedServiceIds.length > 0);
    const isStep3Complete = Boolean(isStep2Complete && selectedTimeSlot);
    const isStep4Complete = Boolean(isStep3Complete && paymentMethod);

    const currentActiveStep = bookingSuccessData
        ? 4
        : isStep3Complete
            ? 4
            : isStep2Complete
                ? 3
                : isStep1Complete
                    ? 2
                    : 1;

    const handleConfirmBooking = async (e) => {
        e?.preventDefault();

        if (!fullName.trim() || !age.toString().trim()) {
            setAlertConfig({
                open: true,
                title: 'Patient Details Required (Step 1)',
                message: 'Please provide the patient full name and age before proceeding.',
                type: 'warning'
            });
            return;
        }

        if (selectedServiceIds.length === 0) {
            setAlertConfig({
                open: true,
                title: 'Medical Service Required (Step 2)',
                message: 'Please select at least one healthcare service for your visit.',
                type: 'warning'
            });
            return;
        }

        if (!selectedTimeSlot) {
            setAlertConfig({
                open: true,
                title: 'Preferred Time Required (Step 3)',
                message: 'Please choose an available appointment time slot.',
                type: 'warning'
            });
            return;
        }

        if (!paymentMethod) {
            setAlertConfig({
                open: true,
                title: 'Payment Method Required (Step 4)',
                message: 'Please select your preferred payment method to confirm.',
                type: 'warning'
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const clinicId = clinic?.clinicId || clinic?.id || effectiveClinicId;
            const doctorId = selectedDoctorId || (activeDoctors[0]?.doctorId || activeDoctors[0]?.id);

            if (!doctorId) {
                throw new Error("No active doctor is available for this clinic.");
            }

            const timeSlotObj = availableSlots.find(s => s.time === selectedTimeSlot);
            let rawTime = timeSlotObj?.rawTime || '09:00:00';
            if (rawTime.length === 5) rawTime = `${rawTime}:00`;

            const appointmentAt = `${selectedDayObj.dateStr}T${rawTime}`;

            const payload = {
                clinicId: clinicId,
                doctorId: doctorId,
                patientName: fullName.trim(),
                patientAge: parseInt(age, 10),
                serviceIds: selectedServiceIds,
                appointmentAt: appointmentAt,
                paymentMethod: paymentMethod.toUpperCase()
            };

            const responseData = await bookPatientAppointment(payload);

            const docObj = activeDoctors.find(d => String(d.doctorId || d.id) === String(doctorId));
            const selectedServiceNames = doctorServices
                .filter(s => selectedServiceIds.includes(s.id))
                .map(s => s.name)
                .join(', ') || 'Dental Consultation';

            const bookingResult = {
                bookingId: responseData?.appointmentId || `BK-${Date.now().toString().slice(-6)}`,
                patientName: responseData?.patientName || fullName,
                patientAge: responseData?.patientAge || age,
                patientPhone: phoneNumber,
                clinicName: clinic?.clinicName || 'Dental Clinic',
                doctorName: docObj?.fullName || 'Specialist Doctor',
                service: selectedServiceNames,
                date: `${selectedDayObj.formattedDate}, ${selectedDayObj.fullDate.getFullYear()}`,
                time: selectedTimeSlot,
                paymentMethod: paymentMethod.toUpperCase(),
                notes: notes,
                fee: clinic?.checkingFee ? `${clinic.checkingFee} JOD` : 'Standard Clinic Fee'
            };

            setBookingSuccessData(bookingResult);
        } catch (err) {
            setAlertConfig({
                open: true,
                title: 'Unable to Complete Booking',
                message: err.message || 'There was an error scheduling your appointment. Please choose a different slot or try again.',
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (clinicError && !clinic) {
        return (
            <div className="bg-slate-100 min-h-screen flex flex-col font-sans text-slate-700 antialiased">
                <PatientNavbar />
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg text-center border border-slate-200">
                        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Clinic Information Not Available</h2>
                        <p className="text-sm text-slate-500 mb-6">{clinicError}</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-sm"
                            >
                                Browse Clinics
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loadingClinic) {
        return (
            <div className="bg-slate-100 min-h-screen flex flex-col font-sans text-slate-700 antialiased">
                <PatientNavbar />
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="text-center">
                        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm font-semibold text-slate-500">Loading clinic & appointment details...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-100 min-h-screen flex flex-col font-sans text-slate-700 antialiased">
            <PatientNavbar />

            <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
                <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-6xl overflow-hidden flex flex-col min-h-[850px] relative border border-slate-100">

                    {/* Stepper Progress */}
                    <div className="pt-8 pb-6 px-8 border-b border-slate-100 bg-white">
                        <div className="max-w-3xl mx-auto flex justify-between items-center relative z-10">
                            <div className="flex flex-col items-center relative z-10 w-1/4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 relative z-10 transition-all shadow-xs ${
                                    isStep1Complete
                                        ? 'bg-blue-600 text-white'
                                        : currentActiveStep === 1
                                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                            : 'bg-slate-100 text-slate-400'
                                }`}>
                                    {isStep1Complete ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
                                </div>
                                <span className={`text-xs font-bold transition-colors ${
                                    isStep1Complete || currentActiveStep === 1 ? 'text-blue-600' : 'text-slate-400'
                                }`}>
                                    Details
                                </span>
                                <div className={`absolute top-4.5 left-1/2 w-full h-[2px] transition-colors -z-10 ${
                                    isStep1Complete ? 'bg-blue-600' : 'bg-slate-200'
                                }`} />
                            </div>

                            <div className="flex flex-col items-center relative z-10 w-1/4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 relative z-10 transition-all shadow-xs ${
                                    isStep2Complete
                                        ? 'bg-blue-600 text-white'
                                        : currentActiveStep === 2
                                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                            : 'bg-slate-100 text-slate-400'
                                }`}>
                                    {isStep2Complete ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
                                </div>
                                <span className={`text-xs font-bold transition-colors ${
                                    isStep2Complete || currentActiveStep === 2 ? 'text-blue-600' : 'text-slate-400'
                                }`}>
                                    Services
                                </span>
                                <div className={`absolute top-4.5 left-1/2 w-full h-[2px] transition-colors -z-10 ${
                                    isStep2Complete ? 'bg-blue-600' : 'bg-slate-200'
                                }`} />
                            </div>

                            <div className="flex flex-col items-center relative z-10 w-1/4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 relative z-10 transition-all shadow-xs ${
                                    isStep3Complete
                                        ? 'bg-blue-600 text-white'
                                        : currentActiveStep === 3
                                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                            : 'bg-slate-100 text-slate-400'
                                }`}>
                                    {isStep3Complete ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
                                </div>
                                <span className={`text-xs font-bold transition-colors ${
                                    isStep3Complete || currentActiveStep === 3 ? 'text-blue-600' : 'text-slate-400'
                                }`}>
                                    Time
                                </span>
                                <div className={`absolute top-4.5 left-1/2 w-full h-[2px] transition-colors -z-10 ${
                                    isStep3Complete ? 'bg-blue-600' : 'bg-slate-200'
                                }`} />
                            </div>

                            <div className="flex flex-col items-center relative z-10 w-1/4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 relative z-10 transition-all shadow-xs ${
                                    bookingSuccessData
                                        ? 'bg-emerald-600 text-white'
                                        : isStep4Complete || currentActiveStep === 4
                                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                            : 'bg-slate-100 text-slate-400'
                                }`}>
                                    {bookingSuccessData ? <Check className="w-4 h-4 stroke-[3]" /> : '4'}
                                </div>
                                <span className={`text-xs font-bold transition-colors ${
                                    bookingSuccessData ? 'text-emerald-600' : isStep4Complete || currentActiveStep === 4 ? 'text-blue-600' : 'text-slate-400'
                                }`}>
                                    Confirm
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                        <main className="flex-1 overflow-y-auto p-8 lg:p-12 pb-36 lg:pb-36 bg-white lg:border-r border-slate-100">
                            <header className="mb-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer mr-1"
                                        title="Go Back"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
                                        Book an Appointment
                                    </h1>
                                </div>
                                <p className="text-slate-500 text-sm pl-9">
                                    Please provide your details to schedule a verified dental consultation with {clinic?.clinicName || 'the clinic'}.
                                </p>
                            </header>

                            <form onSubmit={handleConfirmBooking}>
                                {/* 1. Patient Information */}
                                <section className="mb-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <User className="w-5 h-5 text-blue-600" />
                                            1. Patient Information
                                        </h2>
                                        {isStep1Complete && (
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                                                <Check className="w-3 h-3 stroke-[3]" /> Details Completed
                                            </span>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="fullName">
                                                Full Name
                                            </label>
                                            <input
                                                id="fullName"
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="Enter patient full name"
                                                required
                                                className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="age">
                                                Age
                                            </label>
                                            <input
                                                id="age"
                                                type="number"
                                                min="1"
                                                max="120"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                placeholder="e.g. 25"
                                                required
                                                className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="phoneNumber">
                                                Phone Number (Optional)
                                            </label>
                                            <input
                                                id="phoneNumber"
                                                type="tel"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                placeholder="e.g. 0791234567"
                                                className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-slate-100 mb-8" />

                                {/* 2. Doctor & Medical Services */}
                                <section className="mb-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <Stethoscope className="w-5 h-5 text-blue-600" />
                                            2. Medical Services &amp; Doctor
                                        </h2>
                                        {isStep2Complete && (
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                                                <Check className="w-3 h-3 stroke-[3]" /> {selectedServiceIds.length} Selected
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-5">
                                        {/* Doctor Selector */}
                                        {activeDoctors.length > 0 && (
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="doctorSelect">
                                                    Select Doctor
                                                </label>
                                                <select
                                                    id="doctorSelect"
                                                    value={selectedDoctorId}
                                                    onChange={(e) => {
                                                        setSelectedDoctorId(e.target.value);
                                                        setSelectedTimeSlot('');
                                                    }}
                                                    className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 text-slate-700 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none cursor-pointer"
                                                >
                                                    {activeDoctors.map((doc) => (
                                                        <option key={doc.doctorId || doc.id} value={doc.doctorId || doc.id}>
                                                            {doc.fullName} {doc.specialty ? `— (${doc.specialty})` : ''}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        {/* Dynamic Doctor Services Checkboxes */}
                                        <div>
                                            <div className="flex items-center justify-between mb-2.5">
                                                <label className="block text-sm font-semibold text-slate-700">
                                                    Select Healthcare Services (Choose up to 2)
                                                </label>
                                                <span className="text-xs text-slate-400 font-medium">
                                                    {selectedServiceIds.length} / 2 selected
                                                </span>
                                            </div>

                                            {doctorServices.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                    {doctorServices.map((srv) => {
                                                        const isChecked = selectedServiceIds.includes(srv.id);
                                                        const isLimitReached = selectedServiceIds.length >= 2 && !isChecked;

                                                        return (
                                                            <label
                                                                key={srv.id}
                                                                className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all select-none shadow-2xs ${
                                                                    isChecked
                                                                        ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 text-blue-900 font-bold cursor-pointer'
                                                                        : isLimitReached
                                                                            ? 'bg-slate-100/60 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                                                                            : 'bg-slate-50/60 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-700 cursor-pointer'
                                                                }`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    disabled={isLimitReached}
                                                                    checked={isChecked}
                                                                    onChange={() => handleToggleService(srv.id)}
                                                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 shrink-0"
                                                                />
                                                                <span className="text-xs leading-snug">{srv.name}</span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 text-center text-slate-400 text-xs">
                                                    No specialty services currently listed for this doctor.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-slate-100 mb-8" />

                                {/* 3. Preferred Date & Time */}
                                <section className="mb-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-blue-600" />
                                            3. Preferred Date &amp; Time
                                        </h2>
                                        {isStep3Complete && (
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                                                <Check className="w-3 h-3 stroke-[3]" /> Time Chosen
                                            </span>
                                        )}
                                    </div>

                                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                                        Select a Day
                                    </label>

                                    <div className="flex space-x-3 mb-6 overflow-x-auto pb-2 scrollbar-none">
                                        {upcomingDays.map((day) => {
                                            const isSelected = selectedDayObj.dateStr === day.dateStr;
                                            return (
                                                <button
                                                    key={day.dateStr}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedDayObj(day);
                                                        setSelectedTimeSlot('');
                                                    }}
                                                    className={`shrink-0 w-20 h-16 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs ${
                                                        isSelected
                                                            ? 'border-2 border-blue-600 bg-blue-50 text-blue-700 font-bold scale-[1.03]'
                                                            : 'border border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 text-slate-700'
                                                    }`}
                                                >
                                                    <span className={`text-xs font-bold mb-0.5 ${isSelected ? 'text-blue-600' : 'text-slate-800'}`}>
                                                        {day.dayName}
                                                    </span>
                                                    <span className={`text-[10px] ${isSelected ? 'text-blue-500 font-semibold' : 'text-slate-400'}`}>
                                                        {day.formattedDate}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="flex items-center justify-between mb-3">
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Available Slots for {selectedDayObj.dayName} ({selectedDayObj.formattedDate})
                                        </label>
                                        {loadingSlots && (
                                            <span className="text-xs text-blue-600 animate-pulse font-medium">
                                                Loading slots...
                                            </span>
                                        )}
                                    </div>

                                    {availableSlots.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                            {availableSlots.map((slot, sIdx) => {
                                                const isSelected = selectedTimeSlot === slot.time || selectedTimeSlot === slot.rawTime;
                                                const isSlotAvailable = slot.available !== false;

                                                return (
                                                    <button
                                                        key={sIdx}
                                                        type="button"
                                                        disabled={!isSlotAvailable}
                                                        onClick={() => {
                                                            if (isSlotAvailable) setSelectedTimeSlot(slot.time);
                                                        }}
                                                        className={`py-2.5 px-3 rounded-lg text-sm font-semibold text-center transition-all ${
                                                            !isSlotAvailable
                                                                ? 'border border-slate-200 bg-slate-100/80 text-slate-400 cursor-not-allowed opacity-60 shadow-none'
                                                                : isSelected
                                                                    ? 'border-2 border-blue-600 bg-blue-600 text-white scale-[1.02] shadow-sm cursor-pointer'
                                                                    : 'border border-blue-200 text-blue-700 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-300 cursor-pointer shadow-2xs'
                                                        }`}
                                                    >
                                                        <span className={!isSlotAvailable ? 'line-through' : ''}>
                                                            {slot.time}
                                                        </span>
                                                        {!isSlotAvailable && (
                                                            <span className="block text-[10px] text-slate-400 font-normal">
                                                                Booked
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-6 text-center text-rose-600 text-xs font-bold">
                                            Clinic is closed or no doctor shifts are scheduled on this date.
                                        </div>
                                    )}
                                </section>

                                <hr className="border-slate-100 mb-8" />

                                {/* 4. Payment Details */}
                                <section className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <CreditCard className="w-5 h-5 text-blue-600" />
                                            4. Payment Details
                                        </h2>
                                        {isStep4Complete && (
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                                                <Check className="w-3 h-3 stroke-[3]" /> Ready to Confirm
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="paymentMethod">
                                                Payment Method
                                            </label>
                                            <select
                                                id="paymentMethod"
                                                value={paymentMethod}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 text-slate-700 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none cursor-pointer"
                                                required
                                            >
                                                <option value="" disabled>Select payment option...</option>
                                                <option value="CASH">Pay Cash at Clinic (Upon Arrival)</option>
                                                <option value="CREDIT">Credit Card (Visa / Mastercard)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="notes">
                                                Special Notes / Symptoms (Optional)
                                            </label>
                                            <textarea
                                                id="notes"
                                                rows="2"
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="e.g. routine checkup, pain in back molars..."
                                                className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none resize-none"
                                            />
                                        </div>
                                    </div>
                                </section>
                            </form>
                        </main>

                        {/* Sidebar */}
                        <aside className="w-full lg:w-[340px] bg-slate-50/60 p-6 lg:p-8 flex flex-col gap-6 shrink-0 border-t lg:border-t-0 border-slate-100">
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                                <h3 className="text-base font-bold text-blue-700 flex items-center gap-2 mb-4">
                                    <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                                    {clinic?.clinicName || 'Clinic Information'}
                                </h3>

                                <div className="space-y-3 text-sm text-slate-600">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                                        <span className="leading-snug">
                                            {clinic?.detailedAddress || clinic?.city || 'Amman, Jordan'}
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                                        <span className="leading-snug">{displayHours}</span>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Phone className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                                        <span className="leading-snug">
                                            {clinic?.phoneNumber || '07 9999 9999'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 rounded-xl overflow-hidden h-36 relative border border-slate-100 bg-slate-100">
                                    <img
                                        alt={clinic?.clinicName || 'Clinic Building'}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        src={clinic?.imageUrl || '/clinic-building.jpg'}
                                        onError={(e) => {
                                            e.currentTarget.src = '/clinic-building.jpg';
                                        }}
                                    />
                                    <div className="absolute top-2 right-2 bg-blue-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                                        <ShieldCheck className="w-3 h-3" />
                                        Verified Practice
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                                    <AlertCircle className="w-4 h-4 text-blue-600" />
                                    Need Help?
                                </h4>
                                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                                    If you require urgent assistance or emergency care, contact clinic support directly.
                                </p>
                                <a
                                    className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
                                    href={clinic?.phoneNumber ? `tel:${clinic.phoneNumber}` : '#'}
                                >
                                    <span>Contact Clinic / Support</span>
                                    <span>→</span>
                                </a>
                            </div>
                        </aside>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="border-t border-slate-200/80 bg-white">
                        <div className="flex justify-end gap-3 px-8 py-4 w-full lg:w-[calc(100%-340px)] bg-slate-50/60">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-6 py-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 active:scale-95 transition-all cursor-pointer shadow-2xs"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmBooking}
                                disabled={isSubmitting}
                                className="px-7 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all cursor-pointer shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                type="button"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Confirming...</span>
                                    </>
                                ) : (
                                    <span>Confirm Booking</span>
                                )}
                            </button>
                        </div>

                        <footer className="px-8 py-3.5 bg-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 border-t border-slate-200/60">
                            <div className="font-bold text-blue-900 mb-2 sm:mb-0 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center p-0.5 overflow-hidden shadow-2xs">
                                    <img src="/logo.png" alt="DrSnna" className="w-full h-full object-contain" />
                                </div>
                                <span className="text-slate-800 font-bold tracking-tight">DrSnna</span>
                            </div>
                            <div className="flex gap-4 mb-2 sm:mb-0">
                                <a className="hover:text-blue-600 transition-colors" href="#">Privacy Policy</a>
                                <a className="hover:text-blue-600 transition-colors" href="#">Terms of Service</a>
                            </div>
                            <div className="text-slate-400">© 2026 DrSnna Health</div>
                        </footer>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {bookingSuccessData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 text-center">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>

                        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
                            Appointment Confirmed!
                        </h2>
                        <p className="text-sm text-slate-500 mb-6">
                            Your dental visit has been successfully registered in the system.
                        </p>

                        <div className="bg-slate-50 rounded-2xl p-4 text-left space-y-2.5 mb-6 text-xs border border-slate-100">
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Booking ID:</span>
                                <span className="font-bold text-blue-600">{bookingSuccessData.bookingId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Patient:</span>
                                <span className="font-bold text-slate-800">{bookingSuccessData.patientName} (Age: {bookingSuccessData.patientAge})</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Clinic:</span>
                                <span className="font-bold text-slate-800">{bookingSuccessData.clinicName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Doctor:</span>
                                <span className="font-bold text-slate-800">{bookingSuccessData.doctorName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Services:</span>
                                <span className="font-bold text-slate-800">{bookingSuccessData.service}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Date & Time:</span>
                                <span className="font-bold text-emerald-600">{bookingSuccessData.date} at {bookingSuccessData.time}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Payment:</span>
                                <span className="font-bold text-slate-800">{bookingSuccessData.paymentMethod}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/profile')}
                                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-all cursor-pointer"
                            >
                                View in Profile
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md shadow-blue-500/20"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ModernAlertModal
                isOpen={alertConfig.open}
                onClose={() => setAlertConfig(prev => ({ ...prev, open: false }))}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
            />
        </div>
    );
}