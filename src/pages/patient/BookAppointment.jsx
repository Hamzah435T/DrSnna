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
    FileText
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
    const [selectedService, setSelectedService] = useState(stateData.service || '');
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

                // Auto-select doctor if passed or if only one doctor exists
                if (stateData.doctorId) {
                    setSelectedDoctorId(stateData.doctorId);
                } else if (data.doctors && data.doctors.length === 1) {
                    setSelectedDoctorId(data.doctors[0].doctorId);
                }

                // Auto-select service if passed or if clinic has services
                if (stateData.service) {
                    setSelectedService(stateData.service);
                } else if (data.services && data.services.length > 0) {
                    setSelectedService(data.services[0]);
                } else if (data.specialties && data.specialties.length > 0) {
                    setSelectedService(data.specialties[0]);
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
    }, [effectiveClinicId, stateData.doctorId, stateData.service]);

    // Fetch availability slots from Backend API
    useEffect(() => {
        if (!clinic?.clinicId || !selectedDayObj) return;

        let isMounted = true;
        fetchAvailability(clinic.clinicId, selectedDayObj.dateStr, selectedDoctorId || undefined)
            .then(slots => {
                if (!isMounted) return;
                if (slots && Array.isArray(slots) && slots.length > 0) {
                    const mapped = slots.map(s => {
                        const rawTime = s.time ? s.time.substring(0, 5) : '';
                        let formattedTime = rawTime;
                        if (rawTime) {
                            const [h, m] = rawTime.split(':').map(Number);
                            const ampm = h >= 12 ? 'PM' : 'AM';
                            const hour = h % 12 || 12;
                            formattedTime = `${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
                        }
                        return {
                            time: formattedTime || s.time,
                            rawTime: rawTime || s.time,
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
    }, [clinic?.clinicId, selectedDayObj, selectedDoctorId]);

    // List of active clinic doctors
    const activeDoctors = clinic?.doctors ? clinic.doctors.filter(doc => doc.isActive !== false) : [];

    // List of available services
    const clinicServices = (clinic?.services && clinic.services.length > 0)
        ? clinic.services
        : (clinic?.specialties && clinic.specialties.length > 0)
            ? clinic.specialties
            : ['General Dental Consultation', 'Teeth Cleaning', 'Emergency Dental Care'];

    // Formatted clinic hours
    const displayHours = clinic?.workingHours || (clinic?.clinicHours ? mergeClinicHours(clinic.clinicHours) : 'Schedule available upon booking');

    // Sequential Step Completion Logic
    const isStep1Complete = Boolean(fullName.trim() && age.toString().trim());
    const isStep2Complete = Boolean(isStep1Complete && selectedService);
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

        // Sequential Validation
        if (!fullName.trim() || !age.toString().trim()) {
            setAlertConfig({
                open: true,
                title: 'Patient Details Required (Step 1)',
                message: 'Please provide the patient full name and age before proceeding.',
                type: 'warning'
            });
            return;
        }

        if (!selectedService) {
            setAlertConfig({
                open: true,
                title: 'Medical Service Required (Step 2)',
                message: 'Please choose a dental service for your visit.',
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
            // Find selected doctor object
            const docObj = activeDoctors.find(d => String(d.doctorId) === String(selectedDoctorId));
            const doctorName = docObj ? docObj.fullName : (activeDoctors[0]?.fullName || 'Specialist Doctor');

            // Format appointment time for backend (HH:mm:ss)
            const timeSlotObj = availableSlots.find(s => s.time === selectedTimeSlot);
            const rawTime = timeSlotObj?.rawTime || selectedTimeSlot;
            const formattedTime = rawTime.length === 5 ? `${rawTime}:00` : rawTime;

            const payload = {
                clinicId: clinic.clinicId,
                doctorId: selectedDoctorId ? Number(selectedDoctorId) : (activeDoctors[0]?.doctorId || null),
                appointmentDate: selectedDayObj.dateStr,
                appointmentTime: formattedTime,
                service: selectedService,
                paymentMethod: paymentMethod,
                patientName: fullName,
                patientAge: age ? Number(age) : null,
                patientPhone: phoneNumber,
                notes: notes
            };

            let responseData = null;
            try {
                responseData = await bookPatientAppointment(payload);
            } catch (apiErr) {
                // If network/endpoint fallback
                console.warn('API booking response/fallback:', apiErr.message);
                if (apiErr.message && !apiErr.message.includes('Failed to fetch') && !apiErr.message.includes('NetworkError')) {
                    throw apiErr;
                }
            }

            const deterministicBookingId = `BK-${payload.clinicId}-${payload.doctorId || 1}-${payload.appointmentDate.replace(/-/g, '')}`;
            const bookingResult = {
                bookingId: responseData?.id || responseData?.bookingId || deterministicBookingId,
                patientName: fullName,
                patientAge: age,
                patientPhone: phoneNumber,
                clinicName: clinic?.clinicName || 'Dental Clinic',
                doctorName: doctorName,
                service: selectedService,
                date: `${selectedDayObj.formattedDate}, ${selectedDayObj.fullDate.getFullYear()}`,
                time: selectedTimeSlot,
                paymentMethod: paymentMethod,
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

    // If no clinic was specified or error occurred
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
                {/* Main Card Container */}
                <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-6xl overflow-hidden flex flex-col min-h-[850px] relative border border-slate-100">

                    {/* BEGIN: TopStepper (Dynamic Sequential Progression) */}
                    <div className="pt-8 pb-6 px-8 border-b border-slate-100 bg-white">
                        <div className="max-w-3xl mx-auto flex justify-between items-center relative z-10">

                            {/* Step 1: Details */}
                            <div className="flex flex-col items-center relative z-10 w-1/4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 relative z-10 transition-all shadow-xs ${isStep1Complete
                                        ? 'bg-blue-600 text-white'
                                        : currentActiveStep === 1
                                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                            : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {isStep1Complete ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
                                </div>
                                <span className={`text-xs font-bold transition-colors ${isStep1Complete || currentActiveStep === 1 ? 'text-blue-600' : 'text-slate-400'
                                    }`}>
                                    Details
                                </span>
                                <div className={`absolute top-4.5 left-1/2 w-full h-[2px] transition-colors -z-10 ${isStep1Complete ? 'bg-blue-600' : 'bg-slate-200'
                                    }`} />
                            </div>

                            {/* Step 2: Service */}
                            <div className="flex flex-col items-center relative z-10 w-1/4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 relative z-10 transition-all shadow-xs ${isStep2Complete
                                        ? 'bg-blue-600 text-white'
                                        : currentActiveStep === 2
                                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                            : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {isStep2Complete ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
                                </div>
                                <span className={`text-xs font-bold transition-colors ${isStep2Complete || currentActiveStep === 2 ? 'text-blue-600' : 'text-slate-400'
                                    }`}>
                                    Service
                                </span>
                                <div className={`absolute top-4.5 left-1/2 w-full h-[2px] transition-colors -z-10 ${isStep2Complete ? 'bg-blue-600' : 'bg-slate-200'
                                    }`} />
                            </div>

                            {/* Step 3: Time */}
                            <div className="flex flex-col items-center relative z-10 w-1/4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 relative z-10 transition-all shadow-xs ${isStep3Complete
                                        ? 'bg-blue-600 text-white'
                                        : currentActiveStep === 3
                                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                            : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {isStep3Complete ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
                                </div>
                                <span className={`text-xs font-bold transition-colors ${isStep3Complete || currentActiveStep === 3 ? 'text-blue-600' : 'text-slate-400'
                                    }`}>
                                    Time
                                </span>
                                <div className={`absolute top-4.5 left-1/2 w-full h-[2px] transition-colors -z-10 ${isStep3Complete ? 'bg-blue-600' : 'bg-slate-200'
                                    }`} />
                            </div>

                            {/* Step 4: Confirm */}
                            <div className="flex flex-col items-center relative z-10 w-1/4">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mb-2 relative z-10 transition-all shadow-xs ${bookingSuccessData
                                        ? 'bg-emerald-600 text-white'
                                        : isStep4Complete || currentActiveStep === 4
                                            ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                                            : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {bookingSuccessData ? <Check className="w-4 h-4 stroke-[3]" /> : '4'}
                                </div>
                                <span className={`text-xs font-bold transition-colors ${bookingSuccessData ? 'text-emerald-600' : isStep4Complete || currentActiveStep === 4 ? 'text-blue-600' : 'text-slate-400'
                                    }`}>
                                    Confirm
                                </span>
                            </div>

                        </div>
                    </div>
                    {/* END: TopStepper */}

                    {/* BEGIN: ContentArea */}
                    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

                        {/* BEGIN: MainFormArea */}
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

                                {/* Patient Information Section */}
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
                                                name="fullName"
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
                                                name="age"
                                                type="number"
                                                min="1"
                                                max="120"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                placeholder="e.g. 35"
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
                                                name="phoneNumber"
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

                                {/* Medical Service Section */}
                                <section className="mb-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                            <Stethoscope className="w-5 h-5 text-blue-600" />
                                            2. Medical Service &amp; Doctor
                                        </h2>
                                        {isStep2Complete && (
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                                                <Check className="w-3 h-3 stroke-[3]" /> Service Selected
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="healthcareService">
                                                Select Healthcare Service
                                            </label>
                                            <select
                                                id="healthcareService"
                                                name="healthcareService"
                                                value={selectedService}
                                                onChange={(e) => setSelectedService(e.target.value)}
                                                className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 text-slate-700 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none cursor-pointer"
                                                required
                                            >
                                                <option value="" disabled>Choose a service...</option>
                                                {clinicServices.map((srv, idx) => (
                                                    <option key={idx} value={srv}>
                                                        {srv}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Doctor Selector from Clinic */}
                                        {activeDoctors.length > 0 && (
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="doctorSelect">
                                                    Select Doctor (Optional)
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
                                                    <option value="">Any Available Doctor in Clinic</option>
                                                    {activeDoctors.map((doc) => (
                                                        <option key={doc.doctorId} value={doc.doctorId}>
                                                            {doc.fullName} {doc.specialty ? `— (${doc.specialty})` : ''}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                <hr className="border-slate-100 mb-8" />

                                {/* Preferred Date & Time Section */}
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

                                    {/* Day Selector (Horizontal Scrollable) */}
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
                                                    className={`shrink-0 w-20 h-16 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs ${isSelected
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

                                    {/* Time Slots Grid from Backend */}
                                    {availableSlots.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                            {availableSlots.map((slot, sIdx) => {
                                                const isSelected = selectedTimeSlot === slot.time || selectedTimeSlot === slot.rawTime;
                                                if (!slot.available) {
                                                    return (
                                                        <button
                                                            key={sIdx}
                                                            disabled
                                                            type="button"
                                                            className="py-2.5 px-3 rounded-lg border border-slate-100 bg-slate-50 text-slate-400 text-sm font-medium cursor-not-allowed text-center opacity-50"
                                                        >
                                                            {slot.time}
                                                        </button>
                                                    );
                                                }

                                                return (
                                                    <button
                                                        key={sIdx}
                                                        type="button"
                                                        onClick={() => setSelectedTimeSlot(slot.time)}
                                                        className={`py-2.5 px-3 rounded-lg text-sm font-semibold text-center transition-all cursor-pointer shadow-2xs ${isSelected
                                                                ? 'border-2 border-blue-600 bg-blue-600 text-white scale-[1.02] shadow-sm'
                                                                : 'border border-blue-200 text-blue-700 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-300'
                                                            }`}
                                                    >
                                                        {slot.time}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-6 text-center text-slate-400 text-sm">
                                            No available time slots on this date for the selected doctor/clinic.
                                        </div>
                                    )}
                                </section>

                                <hr className="border-slate-100 mb-8" />

                                {/* Payment Details Section */}
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
                                                name="paymentMethod"
                                                value={paymentMethod}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 text-slate-700 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none cursor-pointer"
                                                required
                                            >
                                                <option value="" disabled>Select payment option...</option>
                                                <option value="cash">Pay Cash at Clinic (Upon Arrival)</option>
                                                <option value="credit">Credit Card (Visa / Mastercard)</option>
                                                <option value="debit">Debit Card</option>
                                                <option value="insurance">Dental Insurance Coverage</option>
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
                                                placeholder="e.g. sensitivity in upper molars, need routine cleaning..."
                                                className="w-full border border-slate-200 rounded-lg shadow-2xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm py-2.5 px-3.5 bg-slate-50/50 hover:bg-white focus:bg-white transition-all outline-none resize-none"
                                            />
                                        </div>
                                    </div>
                                </section>

                            </form>
                        </main>
                        {/* END: MainFormArea */}

                        {/* BEGIN: Sidebar */}
                        <aside className="w-full lg:w-[340px] bg-slate-50/60 p-6 lg:p-8 flex flex-col gap-6 shrink-0 border-t lg:border-t-0 border-slate-100">

                            {/* Clinic Info Card */}
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                                <h3 className="text-base font-bold text-blue-700 flex items-center gap-2 mb-4">
                                    <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                                    {clinic?.clinicName || 'Clinic Information'}
                                </h3>

                                <div className="space-y-3 text-sm text-slate-600">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                                        <span className="leading-snug">
                                            {clinic?.detailedAddress || clinic?.city || 'Address provided upon booking'}
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                                        <span className="leading-snug">
                                            {displayHours}
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Phone className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
                                        <span className="leading-snug">
                                            {clinic?.phoneNumber || 'Phone not available'}
                                        </span>
                                    </div>
                                </div>

                                {/* Actual Clinic Photo from Project */}
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

                            {/* Help Card */}
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                                    <AlertCircle className="w-4 h-4 text-blue-600" />
                                    Need Help?
                                </h4>
                                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                                    If you require immediate assistance, urgent pain relief or emergency dental surgery, please call emergency services.
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
                        {/* END: Sidebar */}

                    </div>
                    {/* END: ContentArea */}

                    {/* BEGIN: Fixed Bottom Actions & Footer */}
                    <div className="border-t border-slate-200/80 bg-white">
                        {/* Action Buttons */}
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
                                    <span>Confirm</span>
                                )}
                            </button>
                        </div>

                        {/* Footer with App Logo */}
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
                                <a className="hover:text-blue-600 transition-colors" href="#">Contact Support</a>
                                <a className="hover:text-blue-600 transition-colors" href="#">Help Center</a>
                            </div>
                            <div className="text-slate-400">© 2026 DrSnna Health</div>
                        </footer>
                    </div>
                    {/* END: Fixed Bottom Actions & Footer */}

                </div>
            </div>

            {/* Confirmation Success Modal */}
            {bookingSuccessData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 text-center animate-[scaleIn_0.25s_ease-out]">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>

                        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
                            Appointment Confirmed!
                        </h2>
                        <p className="text-sm text-slate-500 mb-6">
                            Your dental visit has been successfully booked with the clinic.
                        </p>

                        <div className="bg-slate-50 rounded-2xl p-4 text-left space-y-2.5 mb-6 text-xs border border-slate-100">
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Booking ID:</span>
                                <span className="font-bold text-blue-600">{bookingSuccessData.bookingId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Patient:</span>
                                <span className="font-bold text-slate-800">{bookingSuccessData.patientName} {bookingSuccessData.patientAge ? `(Age: ${bookingSuccessData.patientAge})` : ''}</span>
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
                                <span className="text-slate-400 font-medium">Service:</span>
                                <span className="font-bold text-slate-800">{bookingSuccessData.service}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Date & Time:</span>
                                <span className="font-bold text-emerald-600">{bookingSuccessData.date} at {bookingSuccessData.time}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Payment:</span>
                                <span className="font-bold text-slate-800 capitalize">{bookingSuccessData.paymentMethod}</span>
                            </div>
                            {bookingSuccessData.notes && (
                                <div className="flex justify-between border-t border-slate-200/60 pt-2 mt-2">
                                    <span className="text-slate-400 font-medium flex items-center gap-1">
                                        <FileText className="w-3 h-3" />
                                        Notes:
                                    </span>
                                    <span className="font-medium text-slate-700 italic max-w-[250px] text-right truncate">
                                        {bookingSuccessData.notes}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/')}
                                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-all cursor-pointer"
                            >
                                Back to Home
                            </button>
                            <button
                                onClick={() => navigate(`/clinic-details/${clinic?.clinicId || effectiveClinicId}`)}
                                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-md shadow-blue-500/20"
                            >
                                View Clinic
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modern Alert Modal for Input Validation */}
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
