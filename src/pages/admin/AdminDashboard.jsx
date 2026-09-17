import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import AdminNavbar from './components/AdminNavbar';
import AdminStatsRow from './components/AdminStatsRow';
import RevenueChart from './components/RevenueChart';
import PendingClinicsTable from './components/PendingClinicsTable';
import LiveExchangeRates from './components/LiveExchangeRates';
import TopClinicsLeaderboard from './components/TopClinicsLeaderboard';
import AdminAuditLog from './components/AdminAuditLog';
import ClinicReviewModal from './components/ClinicReviewModal';
import { getDashboardSummary, getPendingClinics, getClinics } from '../../api/superAdminApi';

export default function AdminDashboard() {
    const [reviewClinic, setReviewClinic] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [pendingClinics, setPendingClinics] = useState([]);
    const [activeClinics, setActiveClinics] = useState([]);
    const [currentTab, setCurrentTab] = useState('active'); // default to 'active' so your 2 clinics show immediately

    const loadData = async () => {
        setLoading(true);
        try {
            const [pendingData, activeData, summaryData] = await Promise.all([
                getPendingClinics(),
                getClinics('APPROVED'),
                getDashboardSummary()
            ]);

            setPendingClinics(pendingData);
            setActiveClinics(activeData);
            setDashboardData(summaryData);
        } catch (err) {
            console.error("Failed to load dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const displayedClinics = currentTab === 'pending' ? pendingClinics : activeClinics;

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
                <AdminStatsRow
                    onReviewClick={() => setCurrentTab('pending')}
                    commission={{
                        value: dashboardData?.commissionRevenueCurrentMonth ?? 48250.00,
                        isPositive: true,
                        change: dashboardData?.commissionRevenueChangePercent ?? 14.8
                    }}
                    activeClinics={dashboardData ? {
                        value: dashboardData.activeClinics,
                        newThisMonth: dashboardData.activeClinicsNewThisMonth
                    } : {
                        value: activeClinics.length,
                        newThisMonth: 0
                    }}
                    pendingApprovals={pendingClinics?.length || 0}
                    bookings={{
                        value: dashboardData?.bookingsThisMonth ?? 3840,
                        isPositive: true,
                        change: dashboardData?.bookingsChangePercent ?? 9.2
                    }}
                />

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Left Column (Main Content) */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <RevenueChart />
                        <PendingClinicsTable
                            clinics={displayedClinics}
                            currentTab={currentTab}
                            onTabChange={setCurrentTab}
                            pendingCount={pendingClinics.length}
                            activeCount={activeClinics.length}
                            onReviewClick={(clinic) => setReviewClinic(clinic)}
                        />
                    </div>

                    {/* Right Column (Side Content) */}
                    <div className="flex flex-col gap-5">
                        <LiveExchangeRates />
                        <TopClinicsLeaderboard clinics={dashboardData?.topClinicsByCommission || []} />
                        <AdminAuditLog />
                    </div>
                </div>
            </div>

            {reviewClinic && (
                <ClinicReviewModal
                    clinicId={reviewClinic.clinicId}
                    onClose={() => setReviewClinic(null)}
                    onRefresh={loadData}
                />
            )}
        </div>
    );
}