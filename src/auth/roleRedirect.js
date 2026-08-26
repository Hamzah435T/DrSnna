const ROLE_ROUTES = {
    ADMIN: "/admin",
    CLINIC: "/clinic",
    DOCTOR: "/doctor",
    PATIENT: "/",
};

export function getRoleRedirect(role) {
    return ROLE_ROUTES[role] || "/unauthorized";
}