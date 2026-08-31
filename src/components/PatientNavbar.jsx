// src/components/PatientNavbar.jsx
import React from 'react';
import { useNavigate, useSubmit } from 'react-router';
import { Stethoscope, User } from 'lucide-react';
import { getAuth } from '../auth/authStorage';

export default function PatientNavbar() {
    const navigate = useNavigate();
    const submit = useSubmit();
    const auth = getAuth();

    function handleLogout() {
        submit(null, { method: 'post', action: '/logout' });
    }

    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Brand / Logo */}
                <div
                    className="flex items-center gap-2.5 cursor-pointer select-none"
                    onClick={() => navigate('/')}
                >
                    <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1 shadow-xs overflow-hidden">
                        <img src="/logo.png" alt="DrSnna" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                            DrSnna
                        </span>
                        <p className="text-[10px] text-slate-500 font-medium -mt-0.5">Patient Portal</p>
                    </div>
                </div>

                {/* Right Actions: Logout & User Profile Trigger */}
                <div className="flex items-center gap-3 sm:gap-4">

                    {/* ── LOGOUT Button (Image Asset) ── */}
                    <button
                        onClick={handleLogout}
                        className="transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
                        title="Log Out"
                    >
                        <img
                            src="/logout-btn.png"
                            alt="Logout"
                            className="h-17 w-auto object-contain mix-blend-multiply"
                        />
                    </button>

                    {/* ── User Profile Icon (Entry Point) ── */}
                    <button
                        onClick={() => navigate('/profile')}
                        className="relative w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 text-blue-700 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                        aria-label="User Profile"
                        title="Open Profile"
                    >
                        <User className="w-5 h-5" />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                    </button>
                </div>

            </div>
        </header>
    );
}