import { redirect } from "react-router";
import { getAuth, getRole } from "./authStorage.js";
import { getRoleRedirect } from "./roleRedirect.js";

export function requireRole(requiredRole) {
    const auth = getAuth();

    if (!auth) {
        throw redirect("/login");
    }

    const role = getRole();

    if (role !== requiredRole) {
        throw redirect("/unauthorized");
    }

    // Inactive admins must change their password first
    if (
        requiredRole === "ADMIN" &&
        auth.isActive === false
    ) {
        throw redirect("/admin/change-password");
    }

    return auth;
}

export function requireInactiveAdmin() {
    const auth = getAuth();

    if (!auth) {
        throw redirect("/login");
    }

    if (auth.role !== "ADMIN") {
        throw redirect("/unauthorized");
    }

    // Active admins should never access the password-change page
    if (auth.isActive !== false) {
        throw redirect("/admin");
    }

    return auth;
}

export function requireGuest() {
    const auth = getAuth();

    if (auth) {
        // Inactive admin needs to change password
        if (
            auth.role === "ADMIN" &&
            auth.isActive === false
        ) {
            throw redirect("/admin/change-password");
        }

        throw redirect(
            getRoleRedirect(auth.role)
        );
    }

    return null;
}