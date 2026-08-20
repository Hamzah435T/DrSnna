import {
    createBrowserRouter,
    redirect,
} from "react-router";

import {
    login,
    registerPatient,
    registerClinic, logout,
} from "../api/authApi";
import {clearAuth, getAuth, saveAuth} from "../auth/authStorage";
import { getRoleRedirect } from "../auth/roleRedirect";
import {requireGuest, requireRole} from "../auth/routeGuards.js";
import Login from "../pages/Login";
import Register from "../pages/Register.jsx";
import PatientDashboard from "../pages/patient/PatientDashboard.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import ClinicDashboard from "../pages/clinic/ClinicDashboard.jsx";
import DoctorDashboard from "../pages/doctor/DoctorDashboard.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";
import Landing from "../pages/Landing.jsx";

async function loginAction({ request }) {
    const formData = await request.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const authData = await login({
            email,
            password,
        });

        saveAuth(authData);

        return redirect(
            getRoleRedirect(authData.role)
        );
    } catch (error) {
        return {
            error: error.message,
        };
    }
}

async function registerAction({ request }) {
    const formData = await request.formData();

    const mode = formData.get("mode");

    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
        return {
            error: "Passwords do not match",
        };
    }

    try {
        if (mode === "PATIENT") {
            await registerPatient({
                fullName: formData.get("fullName"),
                email: formData.get("email"),
                city: formData.get("city"),
                password: formData.get("password"),
                confirmPassword: formData.get("confirmPassword"),
            });
        } else if (mode === "CLINIC") {
            await registerClinic({
                clinicName: formData.get("clinicName"),
                email: formData.get("email"),
                city: formData.get("city"),
                clinicLicenseNumber: formData.get(
                    "clinicLicenseNumber"
                ),
                password: formData.get("password"),
                confirmPassword: formData.get(
                    "confirmPassword"
                ),
            });
        } else {
            return {
                error: "Invalid registration type",
            };
        }
    } catch (error) {
        return {
            error: error.message,
        };
    }

    try {
        const authData = await login({
            email,
            password,
        });

        saveAuth(authData);

        return redirect(
            getRoleRedirect(authData.role)
        );
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return redirect(`/login?registered=true`)
    }
}

export async function logoutAction() {
    const auth = getAuth();

    if (!auth) {
        return redirect("/login");
    }

    try {
        await logout(auth.token);
    } catch (error) {
        console.error("Logout failed:", error);
    }

    clearAuth();

    return redirect("/login");
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/login",
        element: <Login />,
        action: loginAction,
        loader: requireGuest,
    },
    {
        path: "/register",
        element: <Register />,
        action: registerAction,
        loader: requireGuest,
    },
    {
        path: "/patient",
        element: <PatientDashboard />,
        loader: () => requireRole("PATIENT"),
    },
    {
        path: "/admin",
        element: <AdminDashboard />,
        loader: () => requireRole("ADMIN"),
    },
    {
        path: "/clinic",
        element: <ClinicDashboard />,
        loader: () => requireRole("CLINIC"),
    },
    {
        path: "/doctor",
        element: <DoctorDashboard />,
        loader: () => requireRole("DOCTOR"),
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
    {
        path: "/logout",
        action: logoutAction,
    },
]);