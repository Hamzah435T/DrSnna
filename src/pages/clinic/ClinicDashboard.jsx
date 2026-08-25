import React from 'react';
import {Form} from "react-router";
import ClinicSidebar from '../../components/clinic/ClinicSidebar';

export default function ClinicDashboard() {return <div>
    <h1>clinic Dashboard</h1>
    <Form method="post" action={"/logout"}>
        <button type="submit">
            Logout
        </button>
    </Form>
</div>;
}
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
