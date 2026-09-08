import React from 'react';
import { Wallet, PlusSquare, ClipboardList, Calendar } from 'lucide-react';
import { MOCK_STATS } from '../mockAdminData';

export default function AdminStatsRow({ onReviewClick }) {
    const { commission, activeClinics, pendingApprovals, bookings } = MOCK_STATS;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
            {/* Commission Revenue */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-slate-600">Commission Revenue</span>
                    <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg">
                        <Wallet className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-baseline gap-1 mb-2.5">
                    <h3 className="text-2xl font-bold text-slate-900">{commission.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                    <span className="text-xs font-semibold text-slate-500 uppercase">JOD</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${commission.isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {commission.isPositive ? '↗' : '↘'} +{commission.change}%
                    </span>
                    <span className="text-xs text-slate-400 font-medium">vs last month</span>
                </div>
            </div>

            {/* Active Clinics */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-slate-600">Active Clinics</span>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <PlusSquare className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-baseline gap-1 mb-2.5">
                    <h3 className="text-2xl font-bold text-slate-900">{activeClinics.value}</h3>
                    <span className="text-xs font-semibold text-slate-500">clinics</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-700">
                        + {activeClinics.newThisMonth}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">onboarded this month</span>
                </div>
                <div className="h-1 w-full bg-blue-100 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-blue-700 w-3/4 rounded-full"></div>
                </div>
            </div>

            {/* Pending Approvals */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-slate-600">Pending Approvals</span>
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <ClipboardList className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-baseline gap-1 mb-2.5">
                    <h3 className="text-2xl font-bold text-slate-900">{pendingApprovals}</h3>
                    <span className="text-sm font-semibold text-slate-700">Clinics</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                        <span className="text-[10px] font-bold text-rose-600 leading-tight">Requires<br/>Review</span>
                    </div>
                    <button 
                        onClick={onReviewClick}
                        className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                        Review Now <span>→</span>
                    </button>
                </div>
            </div>

            {/* Bookings This Month */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-slate-600">Bookings This Month</span>
                    <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                        <Calendar className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-baseline gap-1 mb-2.5">
                    <h3 className="text-2xl font-bold text-slate-900">{bookings.value.toLocaleString('en-US')}</h3>
                    <span className="text-xs font-semibold text-slate-500">visits</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${bookings.isPositive ? 'bg-cyan-50 text-cyan-700' : 'bg-red-100 text-red-700'}`}>
                        {bookings.isPositive ? '↗' : '↘'} +{bookings.change}%
                    </span>
                    <span className="text-xs text-slate-400 font-medium">vs last month</span>
                </div>
            </div>
        </div>
    );
}
