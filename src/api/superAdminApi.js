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

export async function getPendingClinics() {
    const res = await fetch(`${BASE_URL}/super-admin/clinics/pending`, {
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to load pending clinics");
    return res.json();
}

export async function getClinicReview(clinicId) {
    const res = await fetch(`${BASE_URL}/super-admin/clinics/${clinicId}/review`, {
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to load clinic review details");
    return res.json();
}

export async function approveClinic(clinicId) {
    const res = await fetch(`${BASE_URL}/super-admin/clinics/${clinicId}/approve`, {
        method: "POST",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to approve clinic");
    return res.json();
}

export async function rejectClinic(clinicId, data) {
    const res = await fetch(`${BASE_URL}/super-admin/clinics/${clinicId}/reject`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to reject clinic");
    return res.json();
}

export async function overrideCommission(clinicId, rate) {
    const res = await fetch(`${BASE_URL}/super-admin/clinics/${clinicId}/commission`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ commissionRate: rate })
    });
    if (!res.ok) throw new Error("Failed to override commission");
    return res.json();
}
