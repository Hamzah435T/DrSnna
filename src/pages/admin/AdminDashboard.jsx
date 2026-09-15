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
import { getDashboardSummary, getPendingClinics } from '../../api/superAdminApi';

export default function AdminDashboard() {
    const [reviewClinic, setReviewClinic] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [pendingClinics, setPendingClinics] = useState([]);

    const loadData = async () => {
        setLoading(true);
        try {
            const clinicsData = await getPendingClinics();
            setPendingClinics(clinicsData);
        } catch (err) {
            console.error("Failed to load pending clinics", err);
        }

        try {
            const summaryData = await getDashboardSummary();
            setDashboardData(summaryData);
        } catch (err) {
            console.error("Failed to load dashboard data", err);
        }

        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

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
                    onReviewClick={() => {
                        // Dummy click for now
                    }}
                    commission={{
                        value: 48250.00,
                        isPositive: true,
                        change: 14.8
                    }}
                    activeClinics={dashboardData ? {
                        value: dashboardData.activeClinics,
                        newThisMonth: dashboardData.activeClinicsNewThisMonth
                    } : {
                        value: 142,
                        newThisMonth: 6
                    }}
                    pendingApprovals={pendingClinics?.length || 0}
                    bookings={{
                        value: 3840,
                        isPositive: true,
                        change: 9.2
                    }}
                />

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Left Column (Main Content) - Takes up 2 cols on lg screens */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <RevenueChart />
                        <PendingClinicsTable
                            pendingClinics={pendingClinics}
                            onReviewClick={(clinic) => setReviewClinic(clinic)}
                        />
                    </div>

                    {/* Right Column (Side Content) */}
                    <div className="flex flex-col gap-5">
                        <LiveExchangeRates />
                        <TopClinicsLeaderboard clinics={[
                            { clinicId: 1, clinicName: 'SmileArt Studio', city: 'Amman', rating: '15% override rate', commission: 12450, currency: 'JOD' },
                            { clinicId: 2, clinicName: 'Apex Dental Care', city: 'Irbid', rating: '12% standard rate', commission: 9820, currency: 'JOD' },
                            { clinicId: 3, clinicName: 'Little Teeth Clinic', city: 'Amman', rating: '15% rate', commission: 7650, currency: 'JOD' },
                            { clinicId: 4, clinicName: 'Aljubahia Dental', city: 'Amman', rating: '10% rate', commission: 6120, currency: 'JOD' }
                        ]} />
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