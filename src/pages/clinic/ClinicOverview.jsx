import React from 'react';
import {
    Users,
    CalendarCheck,
    UserCheck,
    CalendarDays,
    Banknote,
    FileText,
    CalendarX,
    DollarSign
} from 'lucide-react';

export default function ClinicOverview() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome to Dr.Sna Dental!</h1>
                <p className="text-gray-500 text-[15px] mt-1.5 font-medium">
                    Here is what's happening at your clinic today, October 24th.
                </p>
            </div>

            {/* Top 4 KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="TOTAL PATIENTS"
                    value="1,248"
                    change="+12%"
                    changeColor={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
                    icon={Users}
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <StatCard
                    title="APPOINTMENTS"
                    value="42"
                    subValue="/ 50 slots"
                    badge="Today"
                    icon={CalendarCheck}
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                />
                <StatCard
                    title="MONTHLY REVENUE"
                    value="$48.5k"
                    change="+5.2%"
                    changeColor={{ bg: 'bg-cyan-50', text: 'text-cyan-600' }}
                    icon={Banknote}
                    iconBg="bg-gray-100"
                    iconColor="text-gray-800"
                />
                <StatCard
                    title="ACTIVE DOCTORS"
                    value="8"
                    icon={UserCheck}
                    iconBg="bg-cyan-100"
                    iconColor="text-cyan-600"
                />
            </div>

            {/* Main Grid: Daily Schedule & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Daily Schedule Table (2/3 width) */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col h-full">
                    <div className="flex justify-between items-start p-6 pb-4">
                        <div>
                            <h2 className="text-[17px] font-bold text-gray-900">Daily Schedule</h2>
                            <p className="text-sm text-gray-500 mt-0.5">Upcoming appointments for today.</p>
                        </div>
                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">View Full Calendar</button>
                    </div>

                    <div className="flex-1 overflow-x-auto px-6">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="text-[11px] font-bold text-gray-400 tracking-wider border-b border-gray-100 uppercase">
                                    <th className="pb-3 w-[15%]">Time</th>
                                    <th className="pb-3 w-[25%]">Patient</th>
                                    <th className="pb-3 w-[25%]">Treatment</th>
                                    <th className="pb-3 w-[20%]">Doctor</th>
                                    <th className="pb-3 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {/* Row 1 */}
                                <tr>
                                    <td className="py-4 text-gray-900 font-medium text-sm">09:00 AM</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[11px] font-bold shrink-0">JD</div>
                                            <span className="font-semibold text-gray-900 text-[13px] leading-tight">John<br />Doe</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-gray-500 text-[13px] leading-tight">Root Canal<br />Prep</td>
                                    <td className="py-4 text-gray-700 text-[13px] leading-tight">Dr.<br />Jenkins</td>
                                    <td className="py-4 text-right">
                                        <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[11px] font-bold bg-cyan-100 text-cyan-600 text-center leading-tight">In<br />Progress</span>
                                    </td>
                                </tr>
                                {/* Row 2 */}
                                <tr>
                                    <td className="py-4 text-gray-900 font-medium text-sm">10:15 AM</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <img src="https://i.pravatar.cc/150?img=5" alt="Sarah" className="w-8 h-8 rounded-full object-cover shrink-0" />
                                            <span className="font-semibold text-gray-900 text-[13px] leading-tight">Sarah<br />Williams</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-gray-500 text-[13px] leading-tight">Invisalign<br />Checkup</td>
                                    <td className="py-4 text-gray-700 text-[13px] leading-tight">Dr. Chen</td>
                                    <td className="py-4 text-right">
                                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-600 text-center leading-tight">Waiting</span>
                                    </td>
                                </tr>
                                {/* Row 3 */}
                                <tr>
                                    <td className="py-4 text-gray-900 font-medium text-sm">11:30 AM</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[11px] font-bold shrink-0">MR</div>
                                            <span className="font-semibold text-gray-900 text-[13px] leading-tight">Michael<br />Ross</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-gray-500 text-[13px] leading-tight">Routine<br />Cleaning</td>
                                    <td className="py-4 text-gray-700 text-[13px] leading-tight">Hygienist<br />Smith</td>
                                    <td className="py-4 text-right">
                                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold border border-gray-300 text-gray-500 bg-white text-center leading-tight">Confirmed</span>
                                    </td>
                                </tr>
                                {/* Row 4 */}
                                <tr>
                                    <td className="py-4 text-gray-400 font-medium text-sm line-through decoration-gray-300">01:00 PM</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-[11px] font-bold shrink-0">AL</div>
                                            <span className="font-semibold text-gray-400 text-[13px] leading-tight">Amanda<br />Lee</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-gray-400 text-[13px] leading-tight">Consultation</td>
                                    <td className="py-4 text-gray-400 text-[13px] leading-tight">Dr.<br />Jenkins</td>
                                    <td className="py-4 text-right">
                                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-400 text-center leading-tight">Cancelled</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-slate-50/50 rounded-b-2xl p-4 text-center border-t border-gray-100 mt-auto">
                        <button className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors">Load More Appointments</button>
                    </div>
                </div>

                {/* Recent Activity Timeline (1/3 width) */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col h-full">
                    <h2 className="text-[17px] font-bold text-gray-900 mb-6">Recent Activity</h2>

                    <div className="relative pl-3 space-y-7 flex-1">
                        {/* Vertical Line */}
                        <div className="absolute left-[25px] top-2 bottom-6 w-[2px] bg-gray-200"></div>

                        {/* Item 1 */}
                        <div className="relative flex gap-4">
                            <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center z-10 shrink-0 ring-4 ring-white">
                                <CalendarDays className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col mt-0.5">
                                <p className="font-bold text-gray-900 text-sm">New booking for Dr. Jenkins</p>
                                <p className="text-[12px] text-gray-500 mt-0.5">Patient: Emily Carter • Tomorrow, 2:30 PM</p>
                                <span className="text-[11px] font-medium text-gray-400 mt-1.5">10 mins ago</span>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="relative flex gap-4">
                            <div className="w-7 h-7 rounded-full bg-cyan-50 text-cyan-500 flex items-center justify-center z-10 shrink-0 ring-4 ring-white">
                                <DollarSign className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col mt-0.5">
                                <p className="font-bold text-gray-900 text-sm">Payment received: $450.00</p>
                                <p className="text-[12px] text-gray-500 mt-0.5">Invoice #INV-2023-089 paid by Credit Card.</p>
                                <span className="text-[11px] font-medium text-gray-400 mt-1.5">45 mins ago</span>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="relative flex gap-4">
                            <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center z-10 shrink-0 ring-4 ring-white">
                                <FileText className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col mt-0.5">
                                <p className="font-bold text-gray-900 text-sm">Medical record updated</p>
                                <p className="text-[12px] text-gray-500 leading-snug mt-0.5">Dr. Chen updated charting for patient<br />Robert Fox.</p>
                                <span className="text-[11px] font-medium text-gray-400 mt-1.5">2 hours ago</span>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className="relative flex gap-4">
                            <div className="w-7 h-7 rounded-full bg-red-50 text-red-500 flex items-center justify-center z-10 shrink-0 ring-4 ring-white">
                                <CalendarX className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex flex-col mt-0.5">
                                <p className="font-bold text-gray-900 text-sm">Cancellation</p>
                                <p className="text-[12px] text-gray-500 leading-snug mt-0.5">Amanda Lee cancelled 1:00 PM<br />appointment.</p>
                                <span className="text-[11px] font-medium text-gray-400 mt-1.5">3 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Sub-component for KPI Cards
function StatCard({ title, value, subValue, change, changeColor, icon: Icon, iconBg, iconColor, badge, avatars }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] relative flex flex-col justify-between h-full min-h-[160px]">
            <div className="flex justify-between items-start">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg} ${iconColor}`}>
                    <Icon className="w-5 h-5" />
                </div>
                {change && (
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${changeColor.bg} ${changeColor.text}`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                        {change}
                    </div>
                )}
                {badge && <span className="text-xs font-semibold text-gray-500">{badge}</span>}
            </div>

            <div className="mt-auto">
                <div className="text-[11px] font-bold text-gray-500 tracking-wider mb-1.5">{title}</div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold text-gray-900 tracking-tight">{value}</span>
                    {subValue && <span className="text-sm text-gray-500 font-medium">{subValue}</span>}
                </div>
                {avatars && (
                    <div className="flex -space-x-1.5 mt-2.5">
                        <img className="w-6 h-6 rounded-full border-2 border-white relative z-30" src="https://i.pravatar.cc/100?img=1" alt="doctor" />
                        <img className="w-6 h-6 rounded-full border-2 border-white relative z-20" src="https://i.pravatar.cc/100?img=2" alt="doctor" />
                        <img className="w-6 h-6 rounded-full border-2 border-white relative z-10" src="https://i.pravatar.cc/100?img=3" alt="doctor" />
                        <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[9px] font-bold text-gray-500 relative z-0">+5</div>
                    </div>
                )}
            </div>
        </div>
    );
}