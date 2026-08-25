import React from 'react';
import { Outlet } from 'react-router-dom';
import ClinicSidebar from '../../components/clinic/ClinicSidebar';

export default function ClinicDashboard() {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Sidebar Navigation */}
            <ClinicSidebar />

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}