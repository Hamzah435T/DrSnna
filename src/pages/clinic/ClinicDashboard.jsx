import React from 'react';
import { Outlet } from 'react-router';
import ClinicSidebar from '../../clinic/ClinicSidebar';

export default function ClinicDashboard() {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Sidebar Navigation */}
            <ClinicSidebar />

            {/* Main Content Area */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
}