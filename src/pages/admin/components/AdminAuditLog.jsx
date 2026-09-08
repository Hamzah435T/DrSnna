import React from 'react';
import { History, UserPlus, CheckCircle, CreditCard, RefreshCw } from 'lucide-react';
import { MOCK_AUDIT_LOGS } from '../mockAdminData';

const ICONS = {
    UserPlus: UserPlus,
    CheckCircle: CheckCircle,
    CreditCard: CreditCard,
    RefreshCw: RefreshCw
};

export default function AdminAuditLog() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-teal-600" />
                    <h2 className="text-[15px] font-bold text-slate-900 leading-tight">Super Admin Audit Log</h2>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-teal-600"></div>
            </div>

            <div className="flex flex-col gap-5 relative">
                {/* Vertical line connecting the timeline */}
                <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-100 -z-0"></div>

                {MOCK_AUDIT_LOGS.map((log) => {
                    const IconComponent = ICONS[log.icon];
                    return (
                        <div key={log.id} className="flex gap-3 relative z-10">
                            <div className={`w-8 h-8 rounded-full ${log.iconBg} ${log.iconColor} flex items-center justify-center shrink-0 border-2 border-white`}>
                                {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                            </div>
                            <div className="flex flex-col pt-1">
                                <span className="text-[11px] font-bold text-slate-800 leading-tight">{log.action}</span>
                                <span className="text-[9px] text-slate-500 font-medium mt-0.5">{log.detail} • {log.time}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="w-full mt-5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition-colors">
                View All Audit Logs
            </button>
        </div>
    );
}
