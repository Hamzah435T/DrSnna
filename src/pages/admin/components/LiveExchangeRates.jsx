import React from 'react';
import { RefreshCw, Activity } from 'lucide-react';
import { MOCK_EXCHANGE_RATES } from '../mockAdminData';

export default function LiveExchangeRates() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-600" />
                    <h2 className="text-[15px] font-bold text-slate-900">Live Exchange Rates</h2>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors">
                    <RefreshCw className="w-3 h-3" /> Sync
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {MOCK_EXCHANGE_RATES.map((rate) => (
                    <div key={rate.currency} className="flex flex-col border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-bold w-8 text-center py-1 rounded bg-slate-50 ${rate.currency === 'USD' ? 'text-blue-700' : 'text-slate-700'}`}>
                                    {rate.currency}
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-bold text-slate-800 leading-tight">{rate.pair}</span>
                                    <span className="text-[10px] text-slate-400 font-medium">{rate.name}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[13px] font-bold text-slate-900 leading-tight">{rate.rate.toFixed(4)}</span>
                                {rate.isPegged ? (
                                    <span className={`text-[10px] font-bold ${rate.color}`}>Pegged • {rate.change}</span>
                                ) : (
                                    <span className={`text-[10px] font-bold ${rate.color}`}>{rate.change}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>Central Bank of Jordan feed</span>
                <span>Today, 11:45 AM GMT+3</span>
            </div>
        </div>
    );
}
