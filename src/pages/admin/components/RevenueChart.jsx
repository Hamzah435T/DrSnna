import React from 'react';
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { BarChart3, CheckCircle2 } from 'lucide-react';
import { MOCK_CHART_DATA } from '../mockAdminData';

export default function RevenueChart() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                <div className="flex items-start gap-3">
                    <div className="text-blue-700 mt-1">
                        <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Commission Revenue — Last 6 Months</h2>
                        <p className="text-xs text-slate-500 mt-1">Volume growth across network bookings (May - Oct 2023)</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="flex bg-slate-100 p-0.5 rounded-lg">
                        <button className="px-3 py-1 bg-white text-blue-700 font-bold text-xs rounded-md shadow-sm">JOD</button>
                        <button className="px-3 py-1 text-slate-500 font-semibold text-xs rounded-md hover:bg-slate-200/50">USD</button>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-semibold">
                        <div className="flex items-center gap-1.5 text-slate-600">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-700"></div> Actual
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                            <div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div> Target
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={MOCK_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 11 }}
                            domain={[20000, 50000]}
                            ticks={[20000, 30000, 40000, 50000]}
                            tickFormatter={(value) => value.toLocaleString()}
                        />
                        <Tooltip 
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar 
                            dataKey="actual" 
                            fill="#1d4ed8" 
                            radius={[6, 6, 0, 0]} 
                            barSize={45} 
                        />
                        <Line 
                            type="monotone" 
                            dataKey="target" 
                            stroke="#0d9488" 
                            strokeWidth={3}
                            dot={{ fill: '#0d9488', r: 4, strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 bg-slate-50 rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between border border-slate-100">
                <div className="flex items-center gap-4 text-[11px]">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-semibold uppercase tracking-wider">Average Network Commission:</span>
                        <span className="text-blue-700 font-bold">13.2%</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-[11px] mt-3 md:mt-0">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-semibold uppercase tracking-wider">6-Month Total Collected:</span>
                        <span className="text-slate-900 font-bold text-xs">232,650 JOD</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 w-fit px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
                Payout Settlement Succeeded
            </div>
        </div>
    );
}
