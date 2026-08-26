import React from 'react';
import { useNavigate, useSubmit } from 'react-router';
import { Stethoscope, User, LogOut } from 'lucide-react';

export default function PatientNavbar() {
    const navigate = useNavigate();
    const submit = useSubmit();

    return (
        <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                <div
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                        <Stethoscope className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                        <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
                            Dr.Sna Dental
                        </span>
                        <p className="text-[10px] text-slate-500 font-medium -mt-0.5">Patient Portal</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => submit(null, { method: 'post', action: '/logout' })}
                        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>

                    <div
                        className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center cursor-default"
                        aria-label="User Profile"
                        title="User Profile (Inactive)"
                    >
                        <User className="w-4 h-4 text-slate-600" />
                    </div>
                </div>

            </div>
        </header>
    );
}
