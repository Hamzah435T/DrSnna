import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import ClinicSidebar from '../../clinic/ClinicSidebar';
import { fetchClinicProfile } from '../../api/clinicProfileApi';
import PendingApproval from './components/PendingApproval';
import RejectedApplication from './components/RejectedApplication';
import { Loader2 } from 'lucide-react';

export default function ClinicDashboard() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        fetchClinicProfile()
            .then((data) => {
                if (isMounted) {
                    setProfile(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            });
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="text-red-500">Error loading profile: {error}</div>
            </div>
        );
    }

    const isApproved = profile?.applicationStatus === 'APPROVED';
    const isPending = profile?.applicationStatus === 'PENDING';
    const isRejected = profile?.applicationStatus === 'REJECTED';
    
    // Allow access to resubmit page for rejected clinics
    const isResubmitPage = location.pathname.endsWith('/resubmit');

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Sidebar Navigation - only show if approved */}
            {isApproved && <ClinicSidebar />}

            {/* Main Content Area */}
            <main className={`flex-1 p-8 ${!isApproved ? 'flex justify-center items-center' : ''}`}>
                {isApproved && <Outlet context={{ profile }} />}
                
                {isPending && <PendingApproval />}
                
                {isRejected && !isResubmitPage && (
                    <RejectedApplication rejectionReason={profile?.rejectionReason} />
                )}
                
                {isRejected && isResubmitPage && (
                    <div className="w-full">
                        <Outlet context={{ profile }} />
                    </div>
                )}
            </main>
        </div>
    );
}