import React from 'react';
import { Users, CalendarCheck, DollarSign, UserCheck } from 'lucide-react';

export default function ClinicOverview() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 text-sm mt-1">
                    Here is what's happening at your clinic today, October 24th.
                </p>
            </div>

            {/* Top 4 KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="TOTAL PATIENTS" value="1,248" change="+12%" icon={Users} color="blue" />
                <StatCard title="APPOINTMENTS" value="42" subValue="/ 50 slots" icon={CalendarCheck} color="purple" badge="Today" />
                <StatCard title="MONTHLY REVENUE" value="$48.5k" change="+5.2%" icon={DollarSign} color="emerald" />
                <StatCard title="ACTIVE DOCTORS" value="8" icon={UserCheck} color="cyan" avatars={true} />
            </div>

            {/* Main Grid: Daily Schedule & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Daily Schedule Table (2/3 width) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="font-bold text-gray-900">Daily Schedule</h2>
                            <p className="text-xs text-gray-400">Upcoming appointments for today.</p>
                        </div>
                        <button className="text-xs font-semibold text-blue-600 hover:underline">View Full Calendar</button>
                    </div>

                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="text-[11px] font-bold text-gray-400 border-b border-gray-100">
                            <th className="pb-3">TIME</th>
                            <th className="pb-3">PATIENT</th>
                            <th className="pb-3">TREATMENT</th>
                            <th className="pb-3">DOCTOR</th>
                            <th className="pb-3">STATUS</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                        <tr>
                            <td className="py-3.5 text-gray-500 font-medium text-xs">09:00 AM</td>
                            <td className="py-3.5 font-semibold text-gray-800">John Doe</td>
                            <td className="py-3.5 text-gray-500">Root Canal Prep</td>
                            <td className="py-3.5 text-gray-600">Dr. Jenkins</td>
                            <td><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-50 text-cyan-600">In Progress</span></td>
                        </tr>
                        <tr>
                            <td className="py-3.5 text-gray-500 font-medium text-xs">10:15 AM</td>
                            <td className="py-3.5 font-semibold text-gray-800">Sarah Williams</td>
                            <td className="py-3.5 text-gray-500">Invisalign Checkup</td>
                            <td className="py-3.5 text-gray-600">Dr. Chen</td>
                            <td><span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">Waiting</span></td>
                        </tr>
                        <tr>
                            <td className="py-3.5 text-gray-500 font-medium text-xs">11:30 AM</td>
                            <td className="py-3.5 font-semibold text-gray-800">Michael Ross</td>
                            <td className="py-3.5 text-gray-500">Routine Cleaning</td>
                            <td className="py-3.5 text-gray-600">Hygienist Smith</td>
                            <td><span className="px-2.5 py-1 rounded-full text-xs font-medium border border-gray-200 text-gray-600">Confirmed</span></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {/* Recent Activity Timeline (1/3 width) */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h2 className="font-bold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-4 text-xs">
                        <div className="border-l-2 border-blue-500 pl-3 py-0.5">
                            <p className="font-semibold text-gray-800">New booking for Dr. Jenkins</p>
                            <p className="text-gray-400">Patient: Emily Carter - Tomorrow, 2:30 PM</p>
                            <span className="text-[10px] text-gray-300">10 mins ago</span>
                        </div>
                        <div className="border-l-2 border-emerald-500 pl-3 py-0.5">
                            <p className="font-semibold text-gray-800">Payment received: $450.00</p>
                            <p className="text-gray-400">Invoice #INV-2023-089 paid</p>
                            <span className="text-[10px] text-gray-300">45 mins ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-component for KPI Cards
function StatCard({ title, value, subValue, change, icon: Icon, badge }) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                    <Icon className="w-5 h-5" />
                </div>
                {change && <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{change}</span>}
                {badge && <span className="text-xs text-gray-400">{badge}</span>}
            </div>
            <span className="text-[11px] font-bold text-gray-400 tracking-wider">{title}</span>
            <div className="text-2xl font-bold text-gray-900 mt-1">
                {value} <span className="text-xs text-gray-400 font-normal">{subValue}</span>
            </div>
        </div>
    );
}