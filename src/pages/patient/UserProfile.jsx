// src/pages/patient/UserProfile.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { getAuth } from '../../auth/authStorage';
import PatientNavbar from '../../components/PatientNavbar';
import {
    Mail,
    Phone,
    MapPin,
    Edit3,
    Heart,
    ChevronRight,
    Calendar,
    Clock,
    Plus,
    CreditCard,
    ArrowUpRight,
    ArrowDownLeft,
    CheckCircle2,
    Clock3,
    X,
    ChevronLeft,
    Sparkles,
    Lock,
    KeyRound
} from 'lucide-react';

export default function UserProfile() {
    const navigate = useNavigate();
    const auth = getAuth();
    const isDoctor = auth?.role === 'DOCTOR';

    // ── Profile State ──
    const [userData, setUserData] = useState({
        fullName: isDoctor ? 'Dr. Sarah Jenkins' : 'Ibraheem Hamzah',
        roleText: isDoctor ? 'Doctor account' : 'Patient account',
        city: 'Amman, Jordan',
        email: isDoctor ? 'sarah.jenkins@dentacare.com' : 'ibraheem@email.com',
        phone: '07 9999 9999',
        bio: 'Regular checkups and dental hygiene follower.',
        visits: 24,
        upcoming: 2,
        favorites: 2,
    });

    // ── Edit Profile Modal State ──
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editStep, setEditStep] = useState('verify'); // 'verify' | 'form'
    const [verifyPassword, setVerifyPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [editForm, setEditForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: 'Amman, Jordan',
        newPassword: '',
        confirmPassword: ''
    });

    // ── History Filter State ──
    const [historyFilter, setHistoryFilter] = useState('Upcoming');

    // ── Calendar Filter State (Doctor only) ──
    const [calendarTab, setCalendarTab] = useState('Month');

    // ── Appointments Mock Data ──
    const [appointments] = useState([
        {
            id: 'apt-1',
            name: 'Dr. Micheen Hamzah',
            time: 'Today, 10:30 AM',
            initials: 'MH',
            color: 'bg-teal-500',
        },
        {
            id: 'apt-2',
            name: 'Dr. Sarah Jenkins',
            time: 'Tomorrow, 09:00 AM',
            initials: 'SJ',
            color: 'bg-rose-500',
        },
    ]);

    // ── Appointment History Mock Data ──
    const [historyList] = useState([
        {
            id: 'h-1',
            name: 'Amman Smile Center',
            type: 'Checkup',
            date: 'Feb 24, 09:00 AM',
            status: 'Pending',
            initials: 'AS',
            color: 'bg-indigo-500',
        },
        {
            id: 'h-2',
            name: 'Dr. Sarah Jenkins',
            type: 'Orthodontics',
            date: 'Feb 18, 11:30 AM',
            status: 'Done',
            initials: 'SJ',
            color: 'bg-pink-500',
        },
    ]);

    // ── Favorites Mock Data ──
    const [favoritesList, setFavoritesList] = useState([
        {
            id: 'fav-1',
            title: 'Amman Smile Center',
            subtitle: 'Dental clinic · Amman',
            initials: 'AS',
            color: 'bg-indigo-500',
            isFavorite: true,
        },
        {
            id: 'fav-2',
            title: 'Dr. Sarah Jenkins',
            subtitle: 'Orthodontist · Appointment',
            initials: 'SJ',
            color: 'bg-pink-500',
            isFavorite: false,
        },
    ]);

    // ── Doctor Weekly Schedule Mock Data ──
    const [weeklySchedule] = useState([
        { id: '10001', project: 'New clinic floor plan', deadline: 'Feb 29', assignee: 'Michael Chen', status: 'Drafting' },
        { id: '10002', project: 'UI overhaul', deadline: 'Feb 29', assignee: 'John Chen', status: 'Revision' },
        { id: '10003', project: 'Branding update', deadline: 'Feb 29', assignee: 'Michael Chen', status: 'Revision' },
        { id: '10004', project: 'New clinic floor plan', deadline: 'Feb 29', assignee: 'Michael Chen', status: 'Approved' },
        { id: '10005', project: 'Branding update', deadline: 'Feb 26', assignee: 'Michael Chen', status: 'Approved' },
        { id: '10006', project: 'UI overhaul', deadline: 'Feb 29', assignee: 'John Chen', status: 'Approved' },
    ]);

    // ── Doctor Schedule Overview ──
    const [scheduleOverview] = useState([
        { time: '09:00 AM', title: 'New clinic floor plan', desc: 'Design update', date: 'Feb 29, 2026', status: 'Waiting' },
        { time: '10:15 AM', title: 'UI overhaul', desc: 'Design update · 09:00–13:30', date: 'Feb 29, 2026', status: 'Waiting' },
        { time: '01:00 PM', title: 'Branding update', desc: 'Design update · 13:30–19:00', date: 'Feb 29, 2026', status: 'Waiting' },
        { time: '12:30 PM', title: 'Branding update', desc: 'Design update · 12:00–12:30', date: 'Feb 29, 2026', status: 'Waiting' },
    ]);

    function toggleFavorite(id) {
        setFavoritesList(prev =>
            prev.map(f => f.id === id ? { ...f, isFavorite: !f.isFavorite } : f)
        );
    }

    function handleOpenEditModal() {
        setEditStep('verify');
        setVerifyPassword("");
        setPasswordError("");
        setEditForm({
            fullName: userData.fullName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            city: userData.city || 'Amman, Jordan',
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

    function handleSaveProfile(e) {
        e.preventDefault();
        setPasswordError("");

        // Password change validation & mandatory re-type check
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
                setPasswordError("Please re-type your new password in the confirm field.");
                return;
            }
            if (editForm.newPassword !== editForm.confirmPassword) {
                setPasswordError("New password and confirm password do not match.");
                return;
            }
        }

        setUserData({
            ...userData,
            fullName: editForm.fullName,
            email: editForm.email,
            phone: editForm.phone,
            city: editForm.city,
        });

        setIsEditModalOpen(false);
        setPasswordError("");
        setVerifyPassword("");
    }

    const userInitials = userData.fullName
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

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
                        Good afternoon, {userData.fullName.split(' ')[0]} <span></span>
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
                            <p className="text-xs text-slate-400 mt-0.5">{userData.roleText}</p>
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
                        className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center"
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

                {/* ── 2. APPOINTMENTS SECTION ── */}
                <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-slate-900">Appointments</h2>
                        <button className="text-xs font-bold text-blue-600 hover:underline">
                            View all
                        </button>
                    </div>

                    <div className="space-y-3">
                        {appointments.map((apt) => (
                            <div
                                key={apt.id}
                                className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${apt.color} text-white font-bold text-xs flex items-center justify-center shadow-xs`}>
                                        {apt.initials}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-900">{apt.name}</h4>
                                        <p className="text-[11px] text-slate-400">Appointment · {apt.time}</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 3. HISTORY APPOINTMENT SECTION ── */}
                <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-slate-900">Appointment History</h2>
                        <select
                            value={historyFilter}
                            onChange={(e) => setHistoryFilter(e.target.value)}
                            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 outline-none"
                        >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        {historyList.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-white"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${item.color} text-white font-bold text-xs flex items-center justify-center shadow-xs`}>
                                        {item.initials}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                                        <p className="text-[11px] text-slate-400">{item.type} · {item.date}</p>
                                    </div>
                                </div>

                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                                    item.status === 'Done'
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                        : 'bg-amber-50 text-amber-600 border border-amber-200'
                                }`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 4. WALLET SECTION (STATIC) ── */}
                <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-slate-900">Wallet</h2>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                            Active
                        </span>
                    </div>

                    {/* Dentacare Card */}
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

                    {/* Card Actions */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all">
                            <ArrowDownLeft className="w-3.5 h-3.5" />
                            Top up
                        </button>
                        <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            Send
                        </button>
                    </div>
                </section>

                {/* ── 5. FAVORITE SECTION ── */}
                <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                    <h2 className="text-base font-bold text-slate-900 mb-4">Favorite</h2>
                    <div className="space-y-3">
                        {favoritesList.map((fav) => (
                            <div
                                key={fav.id}
                                className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${fav.color} text-white font-bold text-xs flex items-center justify-center shadow-xs`}>
                                        {fav.initials}
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-900">{fav.title}</h4>
                                        <p className="text-[11px] text-slate-400">{fav.subtitle}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleFavorite(fav.id)}
                                    className={`p-2 rounded-xl border transition-colors ${
                                        fav.isFavorite
                                            ? 'bg-rose-50 border-rose-100 text-rose-500'
                                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-400'
                                    }`}
                                >
                                    <Heart className={`w-4 h-4 ${fav.isFavorite ? 'fill-rose-500' : ''}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 6. SCHEDULE SECTION (DOCTOR ROLE ONLY) ── */}
                {isDoctor && (
                    <div className="space-y-6">
                        {/* Schedule Overview */}
                        <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-bold text-slate-900">Schedule Overview</h2>
                                <button className="text-slate-400 hover:text-slate-600">•••</button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                    <tr className="text-slate-400 border-b border-slate-100 pb-2">
                                        <th className="font-semibold py-2">TIME</th>
                                        <th className="font-semibold py-2">PROJECT</th>
                                        <th className="font-semibold py-2">DATE</th>
                                        <th className="font-semibold py-2 text-right">STATUS</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                    {scheduleOverview.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50">
                                            <td className="py-3 font-bold text-blue-600 whitespace-nowrap">{item.time}</td>
                                            <td className="py-3">
                                                <span className="font-bold text-slate-900 block">{item.title}</span>
                                                <span className="text-[10px] text-slate-400">{item.desc}</span>
                                            </td>
                                            <td className="py-3 text-slate-600 whitespace-nowrap">{item.date}</td>
                                            <td className="py-3 text-right">
                                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                                        {item.status}
                                                    </span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Weekly Schedule Table */}
                        <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-bold text-slate-900">Weekly Schedule</h2>
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 font-bold text-[10px] rounded-full">
                                    This week
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                    <tr className="text-slate-400 border-b border-slate-100 pb-2">
                                        <th className="font-semibold py-2">ID</th>
                                        <th className="font-semibold py-2">PROJECT</th>
                                        <th className="font-semibold py-2">DEADLINE</th>
                                        <th className="font-semibold py-2">ASSIGNEE</th>
                                        <th className="font-semibold py-2 text-right">STATUS</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                    {weeklySchedule.map((row) => (
                                        <tr key={row.id} className="hover:bg-slate-50/50">
                                            <td className="py-3 font-semibold text-slate-400">{row.id}</td>
                                            <td className="py-3 font-bold text-slate-900">{row.project}</td>
                                            <td className="py-3 text-slate-600">{row.deadline}</td>
                                            <td className="py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-5 h-5 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                                                        MC
                                                    </div>
                                                    <span className="font-medium text-slate-700">{row.assignee}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 text-right">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                        row.status === 'Approved'
                                                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                                            : row.status === 'Revision'
                                                                ? 'bg-purple-50 text-purple-600 border border-purple-200'
                                                                : 'bg-amber-50 text-amber-600 border border-amber-200'
                                                    }`}>
                                                        {row.status}
                                                    </span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Schedule Calendar */}
                        <section className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                                <h2 className="text-base font-bold text-slate-900">Schedule Calendar</h2>
                                <div className="flex items-center gap-2">
                                    <div className="flex bg-slate-100 p-1 rounded-xl">
                                        {['Month', 'Week', 'Day'].map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setCalendarTab(tab)}
                                                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                                                    calendarTab === tab ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'
                                                }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                    <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-blue-700">
                                        <Plus className="w-3.5 h-3.5" />
                                        Add Event
                                    </button>
                                </div>
                            </div>

                            {/* Month Header Navigation */}
                            <div className="flex items-center gap-3 mb-4">
                                <button className="p-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-bold text-slate-900">February 2026</span>
                                <button className="p-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-2">
                                <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
                            </div>

                            <div className="grid grid-cols-7 gap-2 text-xs">
                                {/* Week 1 */}
                                <div className="p-2 text-slate-300">30</div>
                                <div className="p-2 text-slate-300">31</div>
                                <div className="p-2 font-bold text-slate-800">1</div>
                                <div className="p-2 font-bold text-slate-800">
                                    2
                                    <div className="mt-1 bg-amber-500 text-white rounded text-[8px] py-0.5">Shift</div>
                                </div>
                                <div className="p-2 font-bold text-slate-800">3</div>
                                <div className="p-2 font-bold text-rose-500">4</div>
                                <div className="p-2 font-bold text-rose-500">5</div>

                                {/* Week 2 */}
                                <div className="col-span-4 p-2 bg-indigo-50 border border-indigo-100 rounded-xl text-left">
                                    <span className="font-bold text-slate-900 block mb-1">6 – 9 Feb</span>
                                    <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[9px] font-bold">
                                        Staff Shift (09:00 - 17:00)
                                    </span>
                                </div>
                                <div className="col-span-3 p-2 bg-emerald-50 border border-emerald-100 rounded-xl text-left">
                                    <span className="font-bold text-slate-900 block mb-1">10 – 12 Feb</span>
                                    <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[9px] font-bold">
                                        Ortho Consultations
                                    </span>
                                </div>
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
                                {/* ── Personal Info ── */}
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
                                            value={editForm.city || "Amman, Jordan"}
                                            onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                                            className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                                            required
                                        >
                                            <option value="Amman, Jordan">Amman</option>
                                            <option value="Irbid, Jordan">Irbid</option>
                                            <option value="Zarqa, Jordan">Zarqa</option>
                                            <option value="Aqaba, Jordan">Aqaba</option>
                                            <option value="Salt, Jordan">Salt</option>
                                            <option value="Madaba, Jordan">Madaba</option>
                                            <option value="Jerash, Jordan">Jerash</option>
                                            <option value="Ajloun, Jordan">Ajloun</option>
                                            <option value="Karak, Jordan">Karak</option>
                                            <option value="Tafilah, Jordan">Tafilah</option>
                                            <option value="Maan, Jordan">Ma'an</option>
                                            <option value="Mafraq, Jordan">Mafraq</option>
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

                                {/* Validation Error Banner */}
                                {passwordError && (
                                    <div className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-100 flex items-center gap-2">
                                        <span>⚠️</span>
                                        <span>{passwordError}</span>
                                    </div>
                                )}

                                {/* Actions */}
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