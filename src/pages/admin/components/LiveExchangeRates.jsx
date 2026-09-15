import React, { useState, useEffect } from 'react';
import { RefreshCw, Activity } from 'lucide-react';

export default function LiveExchangeRates() {
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdatedDate, setLastUpdatedDate] = useState(null);
    const [relativeTime, setRelativeTime] = useState('');

    const fetchRates = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://open.er-api.com/v6/latest/JOD');
            const data = await res.json();
            
            setRates([
                {
                    currency: 'USD',
                    pair: 'USD/JOD',
                    name: 'US Dollar',
                    rate: data.rates.USD,
                    isPegged: true,
                    color: 'text-blue-500',
                    change: 'Fixed'
                },
                {
                    currency: 'EGP',
                    pair: 'EGP/JOD',
                    name: 'Egyptian Pound',
                    rate: data.rates.EGP,
                    isPegged: false,
                    color: 'text-slate-500',
                    change: 'Live'
                },
                {
                    currency: 'SAR',
                    pair: 'SAR/JOD',
                    name: 'Saudi Riyal',
                    rate: data.rates.SAR,
                    isPegged: true,
                    color: 'text-emerald-500',
                    change: 'Fixed'
                }
            ]);
            
            const date = new Date(data.time_last_update_utc);
            setLastUpdatedDate(date);
        } catch (error) {
            console.error("Failed to fetch rates", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    useEffect(() => {
        if (!lastUpdatedDate) return;
        
        const updateRelativeTime = () => {
            const seconds = Math.floor((new Date() - lastUpdatedDate) / 1000);
            if (seconds < 60) {
                setRelativeTime(`Updated ${seconds} seconds ago`);
            } else if (seconds < 3600) {
                setRelativeTime(`Updated ${Math.floor(seconds / 60)} minutes ago`);
            } else {
                setRelativeTime(`Updated ${Math.floor(seconds / 3600)} hours ago`);
            }
        };

        updateRelativeTime();
        const interval = setInterval(updateRelativeTime, 1000);
        return () => clearInterval(interval);
    }, [lastUpdatedDate]);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-600" />
                    <h2 className="text-[15px] font-bold text-slate-900">Live Exchange Rates</h2>
                </div>
                <button 
                    onClick={fetchRates}
                    disabled={loading}
                    className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50">
                    <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Sync
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {loading && rates.length === 0 ? (
                    <div className="text-center text-sm text-slate-500 py-4">Loading rates...</div>
                ) : rates.map((rate) => (
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
                <span>Open Exchange Rates feed</span>
                <span>{relativeTime || 'Updating...'}</span>
            </div>
        </div>
    );
}
