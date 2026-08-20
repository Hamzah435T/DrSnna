const ROLE_ROUTES = {
    ADMIN: "/admin",
    CLINIC: "/clinic",
    DOCTOR: "/doctor",
    PATIENT: "/patient",
};

export function getRoleRedirect(role) {
    return ROLE_ROUTES[role] || "/unauthorized";
}