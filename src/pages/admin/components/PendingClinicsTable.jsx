import React from 'react';
import { Building2, Clock, CheckCircle } from 'lucide-react';

export default function PendingClinicsTable({
                                                clinics = [],
                                                currentTab = 'active',
                                                onTabChange,
                                                pendingCount = 0,
                                                activeCount = 0,
                                                onReviewClick
                                            }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Header with Tabs */}
            <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        {currentTab === 'pending' ? 'Clinics Awaiting Approval' : 'Active Partner Clinics'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {currentTab === 'pending'
                            ? 'Review and authorize dental practitioner organizations'
                            : 'Manage operational clinics, commissions, and decommissions'}
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-slate-100 p-1 rounded-xl gap-1 self-start md:self-auto">
                    <button
                        type="button"
                        onClick={() => onTabChange('active')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentTab === 'active'
                                ? 'bg-white text-blue-700 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Active Clinics ({activeCount})
                    </button>
                    <button
                        type="button"
                        onClick={() => onTabChange('pending')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentTab === 'pending'
                                ? 'bg-white text-blue-700 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Pending ({pendingCount})
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                        <th className="py-2.5 px-5">Clinic Name</th>
                        <th className="py-2.5 px-5">City</th>
                        <th className="py-2.5 px-5">Branches</th>
                        <th className="py-2.5 px-5">Doctors</th>
                        <th className="py-2.5 px-5">Status</th>
                        <th className="py-2.5 px-5 text-right">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {clinics.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="py-8 text-center text-xs font-semibold text-slate-400">
                                No {currentTab} clinics found.
                            </td>
                        </tr>
                    ) : (
                        clinics.map((clinic) => {
                            const initials = clinic.clinicName ? clinic.clinicName.substring(0, 2).toUpperCase() : 'CL';
                            return (
                                <tr key={clinic.clinicId} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-3 px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                                                {initials}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-800 leading-tight">{clinic.clinicName}</span>
                                                <span className="text-[10px] text-slate-400 font-medium">ID: {clinic.clinicId?.split('-')[0]}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-5 text-[13px] text-slate-600 font-medium">
                                        {clinic.city}
                                    </td>
                                    <td className="py-3 px-5">
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">
                                                {clinic.numberOfBranches || 1} branch
                                            </span>
                                    </td>
                                    <td className="py-3 px-5 text-[13px] text-slate-600 font-medium">
                                        {clinic.numberOfDoctors || 0} doctors
                                    </td>
                                    <td className="py-3 px-5">
                                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                                                clinic.applicationStatus === 'APPROVED'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                            }`}>
                                                {clinic.applicationStatus}
                                            </span>
                                    </td>
                                    <td className="py-3 px-5 text-right">
                                        <button
                                            type="button"
                                            onClick={() => onReviewClick(clinic)}
                                            className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                        >
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-slate-50 flex items-center justify-between border-t border-slate-100">
                <span className="text-[11px] font-medium text-slate-500">
                    Showing {clinics.length} {currentTab} clinic items
                </span>
            </div>
        </div>
    );
}