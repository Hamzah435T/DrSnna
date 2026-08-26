import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { LayoutDashboard, UserRound, Calendar, Settings, HelpCircle, LogOut, Stethoscope } from 'lucide-react';
import { clearAuth } from '../auth/authStorage';

export default function ClinicSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        clearAuth();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/clinic', icon: LayoutDashboard, end: true },
        { name: 'Doctors', path: '/clinic/doctors', icon: UserRound },
        { name: 'Appointments', path: '/clinic/appointments', icon: Calendar },
        { name: 'Settings', path: '/clinic/settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col justify-between p-4 sticky top-0 h-screen">
            <div>
                {/* Logo Section */}
                <div className="flex items-center gap-3 px-2 py-4 mb-6">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xs">
                        <Stethoscope className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-900 leading-none text-lg">Dr.Sna Dental</h1>
                        <span className="text-[13px] text-gray-500 font-medium">Clinic Portal</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${isActive
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Portal target for page-specific sidebar content */}
                <div id="sidebar-page-content" className="mt-2"></div>
            </div>

            {/* Footer Links */}
            <div className="border-t border-gray-100 pt-4 space-y-1">
                <button className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-900 w-full rounded-xl transition-colors">
                    <HelpCircle className="w-5 h-5" />
                    Support
                </button>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-red-600 w-full rounded-xl transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}