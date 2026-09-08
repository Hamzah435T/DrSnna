import React, { useState } from 'react';
import { X, Clock, CheckCircle2 } from 'lucide-react';

export default function ClinicReviewModal({ clinic, onClose }) {
    const [overrideRate, setOverrideRate] = useState(clinic.defaultCommission || 12.0);

    if (!clinic) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col relative overflow-hidden animate-in fade-in zoom-in duration-200 my-2 max-h-[95vh]">
                {/* Header */}
                <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                            </svg>
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Application Review & Onboarding</span>
                            <h2 className="text-2xl font-bold text-slate-900">{clinic.name}</h2>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-5 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                    {/* Status Banner */}
                    <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-3 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2 text-cyan-800 text-sm font-semibold">
                            <Clock className="w-4 h-4" />
                            <span>Submitted on {clinic.submitted} (Queue #1 of 7)</span>
                        </div>
                        <span className="px-3 py-1 bg-cyan-200/50 text-cyan-800 text-[10px] font-bold tracking-wider uppercase rounded-md">
                            Pending Verification
                        </span>
                    </div>

                    {/* 3 Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Legal */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Legal Brand & Trade Name</span>
                            <h3 className="text-sm font-bold text-slate-900 mb-2 leading-tight">{clinic.legalName}</h3>
                            <span className="text-xs font-semibold text-teal-600">Registry {clinic.registryNo}</span>
                        </div>
                        {/* Location */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Location & Expansion</span>
                            <h3 className="text-sm font-bold text-slate-900 mb-2">{clinic.location}</h3>
                            <span className="text-xs font-medium text-slate-500">{clinic.branches} Operational Branch{clinic.branches > 1 ? 'es' : ''}</span>
                        </div>
                        {/* Staff */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Staff & Practice Scale</span>
                            <h3 className="text-sm font-bold text-slate-900 mb-2">{clinic.doctors} Accredited Dentists</h3>
                            <span className="text-xs font-medium text-slate-500">{clinic.operatories} Operatories • {clinic.currency} Settlement</span>
                        </div>
                    </div>

                    {/* Disciplines */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 shrink-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Registered Dental Disciplines</span>
                        <div className="flex flex-wrap gap-2">
                            {clinic.disciplines.map(disc => (
                                <span key={disc} className="px-3 py-1.5 bg-white border border-slate-200 text-blue-700 text-[11px] font-bold rounded-lg shadow-sm">
                                    {disc}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tax Compliance */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 shrink-0">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-bold text-slate-900">Tax Compliance & Jordanian MOH License</h3>
                            <span className="text-[11px] font-medium text-slate-500">Tax Registration No. (TIN)</span>
                            <span className="text-sm font-bold text-slate-800">{clinic.taxNo}</span>
                        </div>
                        <div className="flex flex-col items-end gap-1 mt-4 md:mt-0">
                            <div className="flex items-center gap-1 text-teal-600 text-[11px] font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Verified with Ministry
                            </div>
                            <span className="text-[11px] font-medium text-slate-500 mt-1">MOH Practicing Authority License</span>
                            <span className="text-sm font-bold text-slate-800">{clinic.mohLicense}</span>
                        </div>
                    </div>

                    {/* Commission Override */}
                    <div className="bg-slate-100 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">Super Admin Commission Override (%)</h3>
                            <p className="text-[11px] text-slate-500 font-medium mt-1">Default platform tier: 12.0%. Custom agreements override global rate.</p>
                        </div>
                        <div className="mt-4 md:mt-0 relative flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden w-32 shadow-sm">
                            <input 
                                type="number" 
                                value={overrideRate}
                                onChange={(e) => setOverrideRate(e.target.value)}
                                className="w-full py-1.5 pl-3 pr-8 text-sm font-bold text-slate-900 focus:outline-none"
                            />
                            <span className="absolute right-3 text-slate-400 font-bold text-xs">%</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between mt-auto shrink-0">
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-lg transition-colors">
                        <X className="w-4 h-4" /> Reject Application
                    </button>
                    <div className="flex items-center gap-3">
                        <button onClick={onClose} className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors">
                            Dismiss
                        </button>
                        <button className="flex items-center gap-1.5 px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors shadow-sm">
                            <CheckCircle2 className="w-4 h-4" /> Approve & Activate Clinic
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
