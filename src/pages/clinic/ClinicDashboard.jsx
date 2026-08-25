import { Outlet } from "react-router";
import ClinicLayout from "./components/ClinicLayout";

/**
 * ClinicDashboard - root wrapper for the /clinic route.
 *
 * Uses ClinicLayout for the sidebar shell and renders
 * the active sub-page in the main content area via Outlet.
 */
export default function ClinicDashboard() {
    return (
        <ClinicLayout>
            <Outlet />
        </ClinicLayout>
    );
}
