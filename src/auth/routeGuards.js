import {redirect} from "react-router";
import {getAuth, getRole} from "./authStorage.js";
import {getRoleRedirect} from "./roleRedirect.js";

export function requireRole(requiredRole) {
    const auth = getAuth();

    if (!auth) {
        throw redirect("/login");
    }

    const role = getRole();

    if (role !== requiredRole) {
        throw redirect("/unauthorized");
    }

    return auth;
}

export function requireGuest() {
    const auth = getAuth();

    if (auth) {
        throw redirect(
            getRoleRedirect(auth.role)
        );
    }

    return null;
}