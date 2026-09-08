import React from 'react';
import { UserCheck } from 'lucide-react';
import { MOCK_PENDING_CLINICS } from '../mockAdminData';

export default function PendingClinicsTable({ onReviewClick }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="text-blue-700 mt-0.5">
                        <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Clinics Awaiting Approval</h2>
                        <p className="text-xs text-slate-500 mt-1">Section 1.3: Review and authorize dental practitioner organizations</p>
                    </div>
                </div>
                <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600">
                    7 submissions pending
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                            <th className="py-2.5 px-5">Clinic Name</th>
                            <th className="py-2.5 px-5">City</th>
                            <th className="py-2.5 px-5">Branches</th>
                            <th className="py-2.5 px-5">Doctors</th>
                            <th className="py-2.5 px-5">Currency</th>
                            <th className="py-2.5 px-5">Submitted</th>
                            <th className="py-2.5 px-5 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_PENDING_CLINICS.map((clinic) => (
                            <tr key={clinic.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-3 px-5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full ${clinic.initialsBg} ${clinic.initialsColor} font-bold text-xs flex items-center justify-center shrink-0`}>
                                            {clinic.initials}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800 leading-tight">{clinic.name}</span>
                                            <span className="text-[10px] text-slate-400 font-medium">ID: {clinic.id}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-5 text-[13px] text-slate-600 font-medium">
                                    {clinic.city}
                                </td>
                                <td className="py-3 px-5">
                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">
                                        {clinic.branches} branch{clinic.branches > 1 ? 'es' : ''}
                                    </span>
                                </td>
                                <td className="py-3 px-5 text-[13px] text-slate-600 font-medium">
                                    {clinic.doctors} doctors
                                </td>
                                <td className="py-3 px-5">
                                    <span className="text-xs font-bold text-teal-700">{clinic.currency}</span>
                                </td>
                                <td className="py-3 px-5 text-[11px] text-slate-500 font-medium whitespace-nowrap">
                                    {clinic.submitted}
                                </td>
                                <td className="py-3 px-5 text-right">
                                    <button 
                                        onClick={() => onReviewClick(clinic)}
                                        className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors"
                                    >
                                        Review
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-slate-50 flex items-center justify-between border-t border-slate-100">
                <span className="text-[11px] font-medium text-slate-500">Showing 4 of 7 pending verification items</span>
                <div className="flex items-center gap-1">
                    <button className="px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800">Previous</button>
                    <button className="w-6 h-6 flex items-center justify-center rounded bg-blue-700 text-white text-xs font-bold">1</button>
                    <button className="w-6 h-6 flex items-center justify-center rounded text-slate-600 hover:bg-slate-200 text-xs font-semibold">2</button>
                    <button className="px-3 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900">Next</button>
                </div>
            </div>
        </div>
    );
}
