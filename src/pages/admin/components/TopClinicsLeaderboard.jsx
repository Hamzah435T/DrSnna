import React from 'react';
import { Award } from 'lucide-react';
import { MOCK_TOP_CLINICS } from '../mockAdminData';

export default function TopClinicsLeaderboard() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-start justify-between mb-5">
                <div className="flex items-start gap-2">
                    <div className="text-blue-700 mt-0.5">
                        <Award className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-[15px] font-bold text-slate-900 leading-tight">Top Clinics —</h2>
                        <h2 className="text-[15px] font-bold text-slate-900 leading-tight">Commission</h2>
                    </div>
                </div>
                <div className="text-right">
                    <span className="block text-[9px] font-bold text-teal-700 uppercase tracking-wider">October</span>
                    <span className="block text-[9px] font-bold text-teal-700 uppercase tracking-wider">Leaderboard</span>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {MOCK_TOP_CLINICS.map((clinic) => (
                    <div key={clinic.rank} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                                <span className={`text-[10px] font-bold ${clinic.rank === 1 ? 'text-blue-700' : 'text-slate-600'}`}>{clinic.rank}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[13px] font-bold text-slate-800 leading-tight">{clinic.name}</span>
                                <span className="text-[10px] text-slate-500 font-medium">{clinic.location} • {clinic.rate}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[13px] font-bold text-slate-900 leading-tight">
                                {clinic.revenue.toLocaleString()} <span className="text-[10px] font-bold">JOD</span>
                            </span>
                            <span className={`text-[9px] font-bold ${clinic.rank === 1 ? 'text-teal-600' : clinic.rank === 4 ? 'text-slate-400' : 'text-slate-500'}`}>
                                {clinic.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
