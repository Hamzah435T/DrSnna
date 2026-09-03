// src/pages/patient/UserProfile.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { getAuth } from '../../auth/authStorage';
import PatientNavbar from '../../components/PatientNavbar';
import {
    getMyProfile,
    updateMyProfile,
    getPatientFavorites,
    addDoctorToFavorites,
    removeDoctorFromFavorites,
    getPatientAppointments,
    getDoctorAppointments,
    getDoctorSchedule
} from '../../api/patientApi';
import {
    Mail,
    Phone,
    MapPin,
    Edit3,
    Heart,
    CreditCard,
    ArrowUpRight,
    ArrowDownLeft,
    X,
    Lock,
    KeyRound,
    ChevronLeft,
    ChevronRight,
    Plus,
    Calendar as CalendarIcon
} from 'lucide-react';
import { utcToLocalRecurring, utcToLocalSpecific } from '../../utils/timezone';

export default function UserProfile() {
    const navigate = useNavigate();
    const auth = getAuth();

    // ── Profile State ──
    const [userData, setUserData] = useState({
        fullName: 'Loading...',
        role: auth?.role || 'PATIENT',
        city: 'AMMAN',
        email: '',
        phone: '',
        bio: '',
        visits: 0,
        upcoming: 0,
        favorites: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    const isDoctor = auth?.role === 'DOCTOR' || userData.role === 'DOCTOR';

    // ── Edit Profile Modal State ──
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editStep, setEditStep] = useState('verify'); // 'verify' | 'form'
    const [verifyPassword, setVerifyPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [editForm, setEditForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: 'AMMAN',
        newPassword: '',
        confirmPassword: ''
    });

    // ── Appointments & History State (Patient) ──
    const [historyFilter, setHistoryFilter] = useState('Past'); // 'Past' | 'Upcoming' | 'All'
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [historyList, setHistoryList] = useState([]);

    // ── Appointments & History State (Doctor) ──
    const [docHistoryFilter, setDocHistoryFilter] = useState('Past'); // 'Past' | 'Upcoming' | 'All'
    const [doctorAppointments, setDoctorAppointments] = useState([]);
    const [doctorSchedules, setDoctorSchedules] = useState([]);

    // ── Doctor Calendar & Weekly View State ──
    const [calendarTab, setCalendarTab] = useState('Month'); // 'Month' | 'Week' | 'Day'
    const [currentCalDate, setCurrentCalDate] = useState(new Date());

    // ── Favorites State ──
    const [favoritesList, setFavoritesList] = useState([]);

    // ── Initial Data Fetching ──
    useEffect(() => {
        loadInitialData();
    }, []);

    // ── Reload Patient Appointments When Filter Changes ──
    useEffect(() => {
        if (!isDoctor) {
            loadPatientAppointments(historyFilter.toLowerCase());
        }
    }, [historyFilter, isDoctor]);

    async function loadInitialData() {
        setIsLoading(true);
        try {
            // 1. Fetch Profile Info
            const profile = await getMyProfile();
            setUserData(prev => ({
                ...prev,
                fullName: profile.fullName || '',
                role: profile.role || 'PATIENT',
                city: profile.city || 'AMMAN',
                email: profile.email || '',
                phone: profile.phone || '07 9999 9999',
                bio: profile.bio || '',
            }));

            // 2. Fetch Appointments & Schedules
            if (profile.role === 'DOCTOR') {
                const [docApts, docSched] = await Promise.all([
                    getDoctorAppointments(null, 'all'),
                    getDoctorSchedule()
                ]);
                const aptsList = docApts || [];
                setDoctorAppointments(aptsList);
                setDoctorSchedules(docSched || []);

                const now = new Date();
                const upcomingCount = aptsList.filter(a => new Date(a.appointmentAt) > now && a.status !== 'CANCELLED').length;
                setUserData(prev => ({
                    ...prev,
                    upcoming: upcomingCount
                }));
            } else {
                const [favs, upcomingRes] = await Promise.all([
                    getPatientFavorites(),
                    getPatientAppointments('upcoming')
                ]);
                setFavoritesList(favs || []);
                setUpcomingAppointments(upcomingRes?.appointments || []);
                setUserData(prev => ({
                    ...prev,
                    favorites: favs?.length || 0,
                    upcoming: upcomingRes?.count || upcomingRes?.appointments?.length || 0
                }));
            }
        } catch (err) {
            console.error('Failed to load profile data:', err);
        } finally {
            setIsLoading(false);
        }
    }

    async function loadPatientAppointments(scope) {
        try {
            const res = await getPatientAppointments(scope === 'past' ? 'all' : scope);
            setHistoryList(res?.appointments || []);
        } catch (err) {
            console.error('Failed to load scoped appointments:', err);
        }
    }

    // ── Filter Patient Appointments ──
    const filteredHistoryList = useMemo(() => {
        const now = new Date();

        return historyList.filter((item) => {
            if (!item.appointmentAt) return false;
            const itemDate = new Date(item.appointmentAt);
            const hasPassed = itemDate <= now;

            if (historyFilter === 'Past') return hasPassed;
            if (historyFilter === 'Upcoming') return !hasPassed && item.status !== 'CANCELLED';
            return true;
        });
    }, [historyList, historyFilter]);

    // ── Filter Doctor Appointments: 1. Upcoming ──
    const upcomingDoctorAppointments = useMemo(() => {
        const now = new Date();
        return doctorAppointments.filter((item) => {
            if (!item.appointmentAt) return false;
            const itemDate = new Date(item.appointmentAt);
            return itemDate > now && item.status !== 'CANCELLED';
        });
    }, [doctorAppointments]);

    // ── Filter Doctor Appointments: 2. History ──
    const filteredDoctorHistoryList = useMemo(() => {
        const now = new Date();

        return doctorAppointments.filter((item) => {
            if (!item.appointmentAt) return false;
            const itemDate = new Date(item.appointmentAt);
            const hasPassed = itemDate <= now;

            if (docHistoryFilter === 'Past') return hasPassed;
            if (docHistoryFilter === 'Upcoming') return !hasPassed && item.status !== 'CANCELLED';
            return true;
        });
    }, [doctorAppointments, docHistoryFilter]);

    // ── Calendar Grid Computation ──
    const calendarDays = useMemo(() => {
        const year = currentCalDate.getFullYear();
        const month = currentCalDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        // Convert Sunday (0) to 7 for Mon (1) -> Sun (7) layout
        let startDay = firstDayOfMonth.getDay();
        startDay = startDay === 0 ? 6 : startDay - 1;

        const prevMonthLastDay = new Date(year, month, 0).getDate();
        const totalDays = lastDayOfMonth.getDate();

        const days = [];

        // Previous Month Overflow
        for (let i = startDay - 1; i >= 0; i--) {
            const dayNum = prevMonthLastDay - i;
            days.push({
                dayNumber: dayNum,
                isCurrentMonth: false,
                dateStr: `${year}-${String(month).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
            });
        }

        // Current Month Days
        for (let i = 1; i <= totalDays; i++) {
            days.push({
                dayNumber: i,
                isCurrentMonth: true,
                dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
            });
        }

        // Next Month Overflow to make complete weeks (multiples of 7)
        const remaining = 7 - (days.length % 7);
        if (remaining < 7) {
            for (let i = 1; i <= remaining; i++) {
                days.push({
                    dayNumber: i,
                    isCurrentMonth: false,
                    dateStr: `${year}-${String(month + 2).padStart(2, '0')}-${String(i).padStart(2, '0')}`
                });
            }
        }

        return days;
    }, [currentCalDate]);

    function prevMonth() {
        setCurrentCalDate(new Date(currentCalDate.getFullYear(), currentCalDate.getMonth() - 1, 1));
    }

    function nextMonth() {
        setCurrentCalDate(new Date(currentCalDate.getFullYear(), currentCalDate.getMonth() + 1, 1));
    }

    // ── Toggle Favorite Doctor ──
    async function toggleFavorite(doctor) {
        const isFav = favoritesList.some(f => f.id === doctor.id || f.doctorId === doctor.id);
        const doctorId = doctor.id || doctor.doctorId;

        try {
            if (isFav) {
                await removeDoctorFromFavorites(doctorId);
                setFavoritesList(prev => prev.filter(f => (f.id || f.doctorId) !== doctorId));
                setUserData(prev => ({ ...prev, favorites: Math.max(0, prev.favorites - 1) }));
            } else {
                await addDoctorToFavorites(doctorId);
                setFavoritesList(prev => [...prev, doctor]);
                setUserData(prev => ({ ...prev, favorites: prev.favorites + 1 }));
            }
        } catch (err) {
            console.error('Error toggling favorite:', err);
        }
    }

    // ── Edit Profile Modal Handlers ──
    function handleOpenEditModal() {
        setEditStep('verify');
        setVerifyPassword("");
        setPasswordError("");
        setEditForm({
            fullName: userData.fullName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            city: userData.city || 'AMMAN',
            newPassword: '',
            confirmPassword: ''
        });
        setIsEditModalOpen(true);
    }

    function handleVerifyPassword(e) {
        e.preventDefault();
        setPasswordError("");

        if (!verifyPassword.trim()) {
            setPasswordError("Please enter your current password to continue.");
            return;
        }
        setEditStep('form');
        setPasswordError("");
    }

    async function handleSaveProfile(e) {
        e.preventDefault();
        setPasswordError("");

        if (editForm.newPassword) {
            if (editForm.newPassword === verifyPassword) {
                setPasswordError("New password cannot be the same as your current password.");
                return;
            }
            if (editForm.newPassword.length < 8) {
                setPasswordError("New password must be at least 8 characters long.");
                return;
            }
            if (!editForm.confirmPassword) {
                setPasswordError("Please re-type your new password to confirm.");
                return;
            }
            if (editForm.newPassword !== editForm.confirmPassword) {
                setPasswordError("New password and confirm password do not match.");
                return;
            }
        }

        try {
            const payload = {
                fullName: editForm.fullName,
                email: editForm.email,
                city: editForm.city,
                password: editForm.newPassword || verifyPassword,
                confirmPassword: editForm.confirmPassword || verifyPassword
            };

            const updated = await updateMyProfile(payload);

            setUserData(prev => ({
                ...prev,
                fullName: updated.fullName,
                email: updated.email,
                city: updated.city,
            }));

            setIsEditModalOpen(false);
            setPasswordError("");
            setVerifyPassword("");
        } catch (err) {
            setPasswordError(err.message || "Failed to update profile. Please check your current password.");
        }
    }

    function formatDateTime(isoString) {
        if (!isoString) return 'Date not set';
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    const userInitials = userData.fullName
        ? userData.fullName
            .split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : 'U';

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
                <PatientNavbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <PatientNavbar />

            <main className="max-w-2xl mx-auto px-4 py-6 sm:py-8 space-y-6">

                {/* ── TOP GREETING & PILL NAVIGATION ── */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-10 w-10 rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-200">
                            <img
                                src="/logo.png"
                                className="h-17 w-auto object-contain mix-blend-multiply"
                                alt="Logo"
                            />
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-2xl gap-1">
                            <button className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-white text-blue-600 shadow-xs">
                                Profile
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900"
                            >
                                Appointments
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900"
                            >
                                Book
                            </button>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        Good afternoon, {userData.fullName.split(' ')[0]}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Track your appointments, bookings and schedule — all in one place.
                    </p>

                    <div className="flex items-center gap-2 mt-4">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-semibold">
                            🔔
                        </div>
                        <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                            {userInitials}
                        </div>
                    </div>
                </div>

                {/* ── 1. EDIT INFO SECTION ── */}
                <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base font-bold text-slate-900">Edit Info</h2>
                        <button
                            onClick={handleOpenEditModal}
                            className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit info"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-5">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-indigo-500 text-white font-bold text-xl flex items-center justify-center shadow-inner">
                                {userInitials}
                            </div>
                            <button
                                onClick={handleOpenEditModal}
                                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-slate-200 text-blue-600 flex items-center justify-center shadow-xs"
                            >
                                <Edit3 className="w-3 h-3" />
                            </button>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                {userData.fullName}
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                                {isDoctor ? 'Doctor Account' : 'Patient Account'}
                            </p>
                            <div className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-[11px] font-medium mt-1.5">
                                <MapPin className="w-3 h-3 text-indigo-500" />
                                {userData.city}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2.5 mb-6">
                        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-400 block font-medium">Email</span>
                                <span className="text-xs font-semibold text-slate-800">{userData.email}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Phone className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-[10px] text-slate-400 block font-medium">Phone</span>
                                <span className="text-xs font-semibold text-slate-800">{userData.phone}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleOpenEditModal}
                        className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center cursor-pointer"
                    >
                        Edit profile
                    </button>

                    {/* Stats counters */}
                    <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-slate-100 text-center">
                        <div>
                            <span className="text-xl font-extrabold text-slate-900 block">{userData.visits}</span>
                            <span className="text-[11px] text-slate-400 font-medium">Visits</span>
                        </div>
                        <div className="border-x border-slate-100">
                            <span className="text-xl font-extrabold text-slate-900 block">
                                {String(userData.upcoming).padStart(2, '0')}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">Upcoming</span>
                        </div>
                        <div>
                            <span className="text-xl font-extrabold text-slate-900 block">
                                {String(userData.favorites).padStart(2, '0')}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">Favorites</span>
                        </div>
                    </div>
                </section>

                {/* ── 2. UPCOMING APPOINTMENTS SECTION (PATIENT ONLY) ── */}
                {!isDoctor && (
                    <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-bold text-slate-900">Upcoming Appointments</h2>
                            <button onClick={() => setHistoryFilter('Upcoming')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                                View all
                            </button>
                        </div>

                        {upcomingAppointments.length === 0 ? (
                            <p className="text-xs text-slate-400 py-4 text-center">No upcoming appointments booked.</p>
                        ) : (
                            <div className="space-y-3">
                                {upcomingAppointments.map((apt) => (
                                    <div
                                        key={apt.appointmentId}
                                        className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-teal-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                                {apt.doctorName ? apt.doctorName.slice(0, 2).toUpperCase() : 'DR'}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900">{apt.doctorName || 'Doctor Appointment'}</h4>
                                                <p className="text-[11px] text-slate-400">{apt.serviceName || apt.serviceNames?.join(', ') || 'Dental Service'} · {formatDateTime(apt.appointmentAt)}</p>
                                            </div>
                                        </div>
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                                            {apt.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {/* ── 3. HISTORY APPOINTMENT SECTION (PATIENT ONLY) ── */}
                {!isDoctor && (
                    <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-bold text-slate-900">Appointment History</h2>

                            <p value="Past">Past Appointments list</p>


                        </div>

                        {filteredHistoryList.length === 0 ? (
                            <p className="text-xs text-slate-400 py-4 text-center">
                                No {historyFilter.toLowerCase()} appointments found.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {filteredHistoryList.map((item) => {
                                    const isCancelled = item.status === 'CANCELLED';
                                    const statusLabel = isCancelled ? 'CANCELLED' : 'FINISHED';

                                    return (
                                        <div
                                            key={item.appointmentId}
                                            className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-white"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                                    {item.clinicName ? item.clinicName.slice(0, 2).toUpperCase() : 'CL'}
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-900">{item.doctorName || item.clinicName}</h4>
                                                    <p className="text-[11px] text-slate-400">
                                                        {item.serviceNames?.join(', ') || item.serviceName || 'Dental Care'} · {formatDateTime(item.appointmentAt)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Status Badge: Defaults to FINISHED unless explicitly CANCELLED */}
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${isCancelled
                                                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                                                : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                                }`}>
                                                {statusLabel}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                )}

                {/* ── 4. WALLET SECTION (STATIC - PATIENT ONLY) ── */}
                {!isDoctor && (
                    <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-bold text-slate-900">Wallet</h2>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                                Active
                            </span>
                        </div>

                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 p-5 text-white shadow-lg shadow-blue-500/20">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-[11px] font-extrabold tracking-widest uppercase opacity-90">
                                    DENTACARE
                                </span>
                                <div className="w-8 h-6 rounded-md bg-white/20 backdrop-blur-xs flex items-center justify-center">
                                    <CreditCard className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            <span className="text-[10px] uppercase font-medium opacity-80 block">Available balance</span>
                            <div className="text-2xl font-black tracking-tight mt-0.5 mb-6">
                                JOD 125.00
                            </div>

                            <div className="flex justify-between items-center text-xs font-mono opacity-80">
                                <span>•••• •••• 4832</span>
                                <span>09/26</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer">
                                <ArrowDownLeft className="w-3.5 h-3.5" />
                                Top up
                            </button>
                            <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer">
                                <ArrowUpRight className="w-3.5 h-3.5" />
                                Send
                            </button>
                        </div>
                    </section>
                )}

                {/* ── 5. FAVORITE DOCTORS SECTION (PATIENT ONLY) ── */}
                {!isDoctor && (
                    <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                        <h2 className="text-base font-bold text-slate-900 mb-4">Favorite Doctors</h2>
                        {favoritesList.length === 0 ? (
                            <p className="text-xs text-slate-400 py-4 text-center">No favorited doctors added yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {favoritesList.map((fav) => (
                                    <div
                                        key={fav.id || fav.doctorId}
                                        className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                                {fav.doctorName ? fav.doctorName.slice(0, 2).toUpperCase() : 'DR'}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900">{fav.doctorName}</h4>
                                                <p className="text-[11px] text-slate-400">{fav.clinicName} · {fav.specialties || fav.city}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleFavorite(fav)}
                                            className="p-2 rounded-xl border bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100 transition-colors cursor-pointer"
                                            title="Remove favorite"
                                        >
                                            <Heart className="w-4 h-4 fill-rose-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {/* ── 6. DOCTOR PORTAL SECTIONS (DOCTOR ROLE ONLY) ── */}
                {isDoctor && (
                    <div className="space-y-6">

                        {/* 1. Doctor Upcoming Appointments */}
                        <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-bold text-slate-900">Upcoming Appointments</h2>
                                <button onClick={() => setDocHistoryFilter('Upcoming')} className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                                    View all
                                </button>
                            </div>

                            {upcomingDoctorAppointments.length === 0 ? (
                                <p className="text-xs text-slate-400 py-4 text-center">No upcoming appointments booked.</p>
                            ) : (
                                <div className="space-y-3">
                                    {upcomingDoctorAppointments.map((item) => (
                                        <div
                                            key={item.appointmentId}
                                            className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-teal-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                                    {item.patientName ? item.patientName.slice(0, 2).toUpperCase() : (item.formPatientName ? item.formPatientName.slice(0, 2).toUpperCase() : 'PT')}
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-slate-900">
                                                        {item.patientName || item.formPatientName || 'Patient'}
                                                    </h4>
                                                    <p className="text-[11px] text-slate-400">
                                                        {item.serviceNames?.join(', ') || item.serviceName || 'Dental Care'} · {formatDateTime(item.appointmentAt)}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                                                {item.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* 2. Doctor Appointment History */}
                        <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-bold text-slate-900">Appointment History</h2>
                                <p value="Past">Past Appointments list</p>


                            </div>

                            {filteredDoctorHistoryList.length === 0 ? (
                                <p className="text-xs text-slate-400 py-4 text-center">
                                    No {docHistoryFilter.toLowerCase()} appointments found.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {filteredDoctorHistoryList.map((item) => {
                                        const isCancelled = item.status === 'CANCELLED';
                                        const statusLabel = isCancelled ? 'CANCELLED' : 'FINISHED';

                                        return (
                                            <div
                                                key={item.appointmentId}
                                                className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                                                        {item.patientName ? item.patientName.slice(0, 2).toUpperCase() : 'PT'}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-bold text-slate-900">
                                                            {item.patientName || item.formPatientName || 'Patient'}
                                                        </h4>
                                                        <p className="text-[11px] text-slate-400">
                                                            {item.serviceNames?.join(', ') || item.serviceName || 'Dental Care'} · {formatDateTime(item.appointmentAt)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${isCancelled
                                                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                                                    : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                                    }`}>
                                                    {statusLabel}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </section>

                        {/* 3. Weekly Schedule (Connected to backend doctorSchedules) */}
                        <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-base font-bold text-slate-900">Weekly Schedule</h2>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600">
                                    This week
                                </span>
                            </div>

                            {doctorSchedules.length === 0 ? (
                                <p className="text-xs text-slate-400 py-4 text-center">No shifts or schedules registered for this week.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="text-slate-400 border-b border-slate-100 font-semibold uppercase tracking-wider text-[10px]">
                                                <th className="py-3 px-2">ID</th>
                                                <th className="py-3 px-2">SCHEDULE / SHIFT</th>
                                                <th className="py-3 px-2">TIME &amp; DATE</th>
                                                <th className="py-3 px-2">DOCTOR</th>
                                                <th className="py-3 px-2 text-right">STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {doctorSchedules.map((row) => {
                                                // Convert UTC schedule to Local Time
                                                let localDateStr = row.specificDate;
                                                let localDayStr = row.dayOfWeek;
                                                let localStart = row.startTime ? row.startTime.substring(0, 5) : "";
                                                let localEnd = row.endTime ? row.endTime.substring(0, 5) : "";

                                                if (row.specificDate) {
                                                    const start = utcToLocalSpecific(row.specificDate, localStart || "00:00");
                                                    const end = utcToLocalSpecific(row.specificDate, localEnd || "00:00");
                                                    localDateStr = start.localDate;
                                                    localStart = row.startTime ? start.localTime : "";
                                                    localEnd = row.endTime ? end.localTime : "";
                                                } else if (row.dayOfWeek) {
                                                    const start = utcToLocalRecurring(row.dayOfWeek, localStart || "00:00");
                                                    const end = utcToLocalRecurring(row.dayOfWeek, localEnd || "00:00");
                                                    localDayStr = start.localDayOfWeek;
                                                    localStart = row.startTime ? start.localTime : "";
                                                    localEnd = row.endTime ? end.localTime : "";
                                                }

                                                return (
                                                    <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="py-3.5 px-2 font-semibold text-slate-400">
                                                            #{row.id}
                                                        </td>
                                                        <td className="py-3.5 px-2">
                                                            <span className="font-bold text-slate-900 block leading-tight">
                                                                {row.type === 'DOCTOR_SHIFT' ? 'Doctor Shift Consultation' : row.type}
                                                            </span>
                                                        </td>
                                                        <td className="py-3.5 px-2 text-slate-600 whitespace-nowrap">
                                                            {localDateStr || localDayStr || 'Recurring'}
                                                            <span className="block text-[10px] text-slate-400">{localStart} - {localEnd}</span>
                                                        </td>
                                                        <td className="py-3.5 px-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                                                                    {userInitials}
                                                                </div>
                                                                <span className="font-medium text-slate-800 text-[11px] truncate max-w-[100px]">
                                                                    {userData.fullName.split(' ')[0]}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3.5 px-2 text-right">
                                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                                Approved
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>

                        {/* 4. Schedule Calendar (Month/Week/Day layout with dynamic event pills) */}
                        <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                            <h2 className="text-base font-bold text-slate-900 mb-4">Schedule Calendar</h2>

                            {/* View Switcher: Month | Week | Day */}
                            <div className="flex bg-slate-100/80 p-1 rounded-2xl w-fit mb-5">
                                {['Month', 'Week', 'Day'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setCalendarTab(tab)}
                                        className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${calendarTab === tab
                                            ? 'bg-white text-blue-600 shadow-xs'
                                            : 'text-slate-500 hover:text-slate-900'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Month Header Navigation & Add Event Button */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={prevMonth}
                                        className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <span className="font-extrabold text-slate-900 text-sm sm:text-base min-w-[130px] text-center">
                                        {monthNames[currentCalDate.getMonth()]} {currentCalDate.getFullYear()}
                                    </span>
                                    <button
                                        onClick={nextMonth}
                                        className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => alert("Shift management is available via Clinic Administration")}
                                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                                >
                                    <Plus className="w-4 h-4 stroke-[3]" />
                                    <span>Add Event</span>
                                </button>
                            </div>

                            {/* Days of Week Header */}
                            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-slate-400 mb-2 uppercase tracking-wider">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span className="text-rose-500">Sat</span>
                                <span className="text-rose-500">Sun</span>
                            </div>

                            {/* Calendar Days Matrix */}
                            <div className="grid grid-cols-7 gap-1.5">
                                {calendarDays.map((cell, idx) => {
                                    const hasShift = doctorSchedules.some(s => s.specificDate === cell.dateStr);
                                    const hasAppointments = doctorAppointments.filter(a => a.appointmentAt?.startsWith(cell.dateStr));
                                    const todayObj = new Date();
                                    const localIsoDate = new Date(todayObj.getTime() - (todayObj.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
                                    const isToday = localIsoDate === cell.dateStr;

                                    return (
                                        <div
                                            key={idx}
                                            className={`min-h-[75px] rounded-2xl p-1.5 flex flex-col justify-between border transition-all ${cell.isCurrentMonth
                                                ? isToday
                                                    ? 'bg-blue-50/50 border-blue-200'
                                                    : 'bg-white border-slate-100 hover:border-slate-200'
                                                : 'bg-slate-50/40 border-transparent opacity-40'
                                                }`}
                                        >
                                            <span
                                                className={`text-[11px] font-bold w-6 h-6 flex items-center justify-center rounded-full ${isToday
                                                    ? 'bg-blue-600 text-white shadow-xs'
                                                    : cell.isCurrentMonth
                                                        ? (idx % 7 === 5 || idx % 7 === 6) ? 'text-rose-500' : 'text-slate-800'
                                                        : 'text-slate-400'
                                                    }`}
                                            >
                                                {cell.dayNumber}
                                            </span>

                                            <div className="space-y-1 mt-1">
                                                {hasShift && (
                                                    <div className="text-[8px] font-bold bg-purple-600 text-white px-1.5 py-0.5 rounded-md truncate text-center shadow-xs">
                                                        Staff Shift
                                                    </div>
                                                )}
                                                {hasAppointments.length > 0 && (
                                                    <div className="text-[8px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-md truncate text-center shadow-xs">
                                                        {hasAppointments.length} Visit{hasAppointments.length > 1 ? 's' : ''}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                    </div>
                )}

            </main>

            {/* ── EDIT PROFILE MODAL (2-STEP GATE) ── */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 my-8">
                        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">
                                    {editStep === 'verify' ? 'Security Verification' : 'Edit Profile Information'}
                                </h3>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                    {editStep === 'verify'
                                        ? 'Enter your current password to unlock profile editing'
                                        : 'Update your personal details and credentials'}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setPasswordError("");
                                    setVerifyPassword("");
                                }}
                                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* ── STEP 1: PASSWORD VERIFICATION GATE ── */}
                        {editStep === 'verify' ? (
                            <form onSubmit={handleVerifyPassword} className="space-y-4">
                                <div className="flex flex-col items-center text-center py-2">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <p className="text-xs text-slate-500 max-w-[280px]">
                                        To protect your account security, please confirm your current password before editing.
                                    </p>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        autoFocus
                                        value={verifyPassword}
                                        onChange={(e) => setVerifyPassword(e.target.value)}
                                        placeholder="Enter your current password"
                                        className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                        required
                                    />
                                </div>

                                {passwordError && (
                                    <div className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-100 flex items-center gap-2">
                                        <span>⚠️</span>
                                        <span>{passwordError}</span>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditModalOpen(false);
                                            setPasswordError("");
                                            setVerifyPassword("");
                                        }}
                                        className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-200 transition-all cursor-pointer"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* ── STEP 2: PROFILE FORM (UNLOCKED) ── */
                            <form onSubmit={handleSaveProfile} className="space-y-4" autoComplete="off">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={editForm.fullName || ""}
                                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                        className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-700 block mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={editForm.email || ""}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                                        <input
                                            type="text"
                                            value={editForm.phone || ""}
                                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold text-slate-700 block mb-1">City / Location</label>
                                        <select
                                            value={editForm.city || "AMMAN"}
                                            onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                                            className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                                            required
                                        >
                                            <option value="AMMAN">Amman</option>
                                            <option value="IRBID">Irbid</option>
                                            <option value="ZARQA">Zarqa</option>
                                            <option value="AQABA">Aqaba</option>
                                            <option value="SALT">Salt</option>
                                            <option value="MADABA">Madaba</option>
                                            <option value="JERASH">Jerash</option>
                                            <option value="AJLOUN">Ajloun</option>
                                            <option value="KARAK">Karak</option>
                                            <option value="TAFILAH">Tafilah</option>
                                            <option value="MAAN">Ma'an</option>
                                            <option value="MAFRAQ">Mafraq</option>
                                        </select>
                                    </div>
                                </div>

                                {/* ── Password Update Section ── */}
                                <div className="pt-3 border-t border-slate-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                            <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                                            Change Password
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-medium">(Optional)</span>
                                    </div>

                                    <div className="space-y-2.5 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                                        <div>
                                            <label className="text-[10px] font-semibold text-slate-600 block mb-1">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="At least 8 characters"
                                                autoComplete="new-password"
                                                value={editForm.newPassword || ""}
                                                onChange={(e) => setEditForm({ ...editForm, newPassword: e.target.value })}
                                                className="w-full text-xs font-semibold px-3 py-1.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-semibold text-slate-600 block mb-1">
                                                Re-type New Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Re-type new password to confirm"
                                                autoComplete="new-password"
                                                value={editForm.confirmPassword || ""}
                                                onChange={(e) => setEditForm({ ...editForm, confirmPassword: e.target.value })}
                                                className="w-full text-xs font-semibold px-3 py-1.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {passwordError && (
                                    <div className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-100 flex items-center gap-2">
                                        <span>⚠️</span>
                                        <span>{passwordError}</span>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditModalOpen(false);
                                            setPasswordError("");
                                            setVerifyPassword("");
                                        }}
                                        className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-200 transition-all cursor-pointer"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}