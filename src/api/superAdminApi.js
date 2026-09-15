import { getAuth } from "../auth/authStorage";

const BASE_URL = "http://localhost:8080/api";

function authHeaders() {
    const auth = getAuth();
    return {
        "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en",
        ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    };
}

export async function getDashboardSummary() {
    const res = await fetch(`${BASE_URL}/super-admin/dashboard`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load super admin dashboard summary");
    }
    return res.json();
}

