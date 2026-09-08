import React, { useState } from 'react';
import { Download } from 'lucide-react';
import AdminNavbar from './components/AdminNavbar';
import AdminStatsRow from './components/AdminStatsRow';
import RevenueChart from './components/RevenueChart';
import PendingClinicsTable from './components/PendingClinicsTable';
import LiveExchangeRates from './components/LiveExchangeRates';
import TopClinicsLeaderboard from './components/TopClinicsLeaderboard';
import AdminAuditLog from './components/AdminAuditLog';
import ClinicReviewModal from './components/ClinicReviewModal';

export default function AdminDashboard() {
    const [reviewClinic, setReviewClinic] = useState(null);

    // This makes it easy for the API integration later. 
    // Simply fetch your data in useEffects here, and pass it down as props if needed.
    // Right now, the components internally import from mockAdminData.js

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans">
            <AdminNavbar />

            <div className="max-w-[1600px] mx-auto px-6 py-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                            <span className="text-[10px] font-bold text-teal-700 tracking-wider uppercase">Executive Command Center</span>
                        </div>
                        <h1 className="text-[26px] font-bold text-slate-900 leading-tight">Platform Operations & Performance</h1>
                        <p className="text-[13px] text-slate-500 mt-1">Jordanian & Regional Network oversight, settlement metrics, and credential approvals.</p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                            <span className="px-4 py-1.5 bg-slate-100 text-xs font-bold text-slate-700 border-r border-slate-200">Oct 2023</span>
                            <span className="px-4 py-1.5 text-xs font-semibold text-slate-500">Q3 Summary</span>
                        </div>
                        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors shadow-sm">
                            <Download className="w-4 h-4" /> Financial Export
                        </button>
                    </div>
                </div>

                {/* Top Stats Row */}
                <AdminStatsRow onReviewClick={() => {
                    // Just open the modal with the first pending clinic as an example for the top button
                    import('./mockAdminData').then(m => setReviewClinic(m.MOCK_PENDING_CLINICS[0]));
                }} />

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Left Column (Main Content) - Takes up 2 cols on lg screens */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <RevenueChart />
                        <PendingClinicsTable onReviewClick={(clinic) => setReviewClinic(clinic)} />
                    </div>

                    {/* Right Column (Side Content) */}
                    <div className="flex flex-col gap-5">
                        <LiveExchangeRates />
                        <TopClinicsLeaderboard />
                        <AdminAuditLog />
                    </div>
                </div>
            </div>

            {/* Modal */}
            {reviewClinic && (
                <ClinicReviewModal
                    clinic={reviewClinic}
                    onClose={() => setReviewClinic(null)}
                />
            )}
        </div>
    );
}