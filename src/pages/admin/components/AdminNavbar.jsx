import React from 'react';
import { Search, Bell, HelpCircle, User } from 'lucide-react';

export default function AdminNavbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-slate-200">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="bg-blue-800 text-white p-1.5 rounded-lg flex items-center justify-center font-bold text-lg leading-none">
                    <span className="mb-0.5">D</span>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                        <span className="font-bold text-blue-900 text-lg">Dr.Sna</span>
                        <span className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-[9px] font-bold rounded-sm tracking-wider uppercase">SUPER</span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 tracking-wider">ADMIN</span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center relative w-[400px]">
                <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search clinics, doctors, transactions..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-500"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-5">
                <div className="relative cursor-pointer">
                    <Bell className="w-5 h-5 text-slate-600" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                </div>
                <HelpCircle className="w-5 h-5 text-slate-600 cursor-pointer" />
                
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-slate-800">Dr. S. Na</span>
                            <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded-sm tracking-wider uppercase">SUPER</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">Chief Administrator</span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center text-white shrink-0">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
