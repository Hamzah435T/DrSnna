import { useState } from "react";
import ClinicLayout from "./components/ClinicLayout";
import ClinicDoctors from "./components/ClinicDoctors";

/**
 * ClinicDashboard – root page for the /clinic route.
 *
 * Uses ClinicLayout for the sidebar shell and renders
 * the active sub-page in the main content area.
 *
 * Currently only the "doctors" page is implemented;
 * the other sidebar items are visual placeholders.
 */
export default function ClinicDashboard() {
    const [activePage, setActivePage] = useState("doctors");

    function renderPage() {
        switch (activePage) {
            case "doctors":
                return <ClinicDoctors />;
            // TODO: Implement other pages
            // case "dashboard":
            //     return <ClinicOverview />;
            // case "appointments":
            //     return <ClinicAppointments />;
            // case "settings":
            //     return <ClinicSettings />;
            default:
                return (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        <p>{activePage.charAt(0).toUpperCase() + activePage.slice(1)} — coming soon</p>
                    </div>
                );
        }
    }

    return (
        <ClinicLayout activePage={activePage} onNavigate={setActivePage}>
            {renderPage()}
        </ClinicLayout>
    );
}
