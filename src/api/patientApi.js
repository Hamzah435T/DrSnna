
import { getAuth, saveAuth, clearAuth } from "../auth/authStorage";
import { refreshAccessToken } from "./authApi";

const BASE_URL = "http://localhost:8080/api";

// ── Central Fetch Wrapper with Silent 401 Refresh ───────────────────────
async function apiFetch(url, options = {}) {
    const auth = getAuth();
    const headers = {
        "Content-Type": "application/json",
        "Accept-Language": localStorage.getItem("i18nextLng") || "en",
        ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
        ...options.headers,
    };

    let res = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
    });

    // If Access Token expired, silently refresh and retry once
    if (res.status === 401 && !url.includes("/auth/")) {
        try {
            const newAuthData = await refreshAccessToken();
            saveAuth(newAuthData);

            headers["Authorization"] = `Bearer ${newAuthData.token}`;
            res = await fetch(url, {
                ...options,
                headers,
                credentials: "include",
            });
        } catch (refreshErr) {
        clearAuth();
        window.location.href = "/login";
        throw new Error("Session expired. Please log in again.", { cause: refreshErr });
    }
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
}

function cleanQueryParams(params = {}) {
    if (typeof params === "string") return params;
    const clean = {};
    Object.entries(params).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            value !== "undefined" &&
            value !== "null" &&
            value !== "All-Cities" &&
            value !== "All Cities" &&
            value !== "All Specialties" &&
            value !== "All"
        ) {
            clean[key] = value;
        }
    });
    return new URLSearchParams(clean).toString();
}

// ── 1. Clinic Discovery Endpoints ─────────────────────────────────────
export async function searchClinics(params = {}) {
    const queryString = cleanQueryParams(params);
    return apiFetch(`${BASE_URL}/patient/clinics${queryString ? `?${queryString}` : ""}`);
}
export const getClinics = searchClinics;
export const fetchClinics = searchClinics;

export async function getClinicDetails(clinicId) {
    return apiFetch(`${BASE_URL}/patient/clinics/${clinicId}`);
}
export const fetchClinicDetails = getClinicDetails;

// ── 2. Slot Availability Endpoint ────────────────────────────────────
export async function fetchAvailability({ clinicId, date, doctorId, serviceId, serviceIds } = {}) {
    if (!clinicId || !date) return [];

    const params = new URLSearchParams();
    params.append("date", date);

    if (serviceIds && serviceIds.length > 0) {
        serviceIds.forEach(id => params.append("serviceId", id));
    } else if (serviceId) {
        params.append("serviceId", serviceId);
    }
    if (doctorId && doctorId !== "undefined" && doctorId.trim() !== "") {
        params.append("doctorId", doctorId);
    }

    try {
        return await apiFetch(`${BASE_URL}/patient/clinics/${clinicId}/availability?${params.toString()}`);
    } catch {
        return [];
    }
}
export const getAvailability = fetchAvailability;

// ── 3. Appointment Booking Endpoint ──────────────────────────────────
export async function bookAppointment(payload) {
    return apiFetch(`${BASE_URL}/appointments/book`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
export const bookPatientAppointment = bookAppointment;

// ── 4. Patient Appointments & History ────────────────────────────────
export async function getPatientAppointments(scope = "upcoming") {
    return apiFetch(`${BASE_URL}/patient/appointments?scope=${scope}`);
}
export const fetchPatientAppointments = getPatientAppointments;

export async function getAppointmentDetails(appointmentId) {
    return apiFetch(`${BASE_URL}/patient/appointments/${appointmentId}`);
}

export async function cancelAppointment(appointmentId) {
    return apiFetch(`${BASE_URL}/patient/appointments/${appointmentId}`, {
        method: "DELETE",
    });
}

// ── 5. Reviews ───────────────────────────────────────────────────────
export async function createReview(reviewPayload) {
    return apiFetch(`${BASE_URL}/patient/reviews`, {
        method: "POST",
        body: JSON.stringify(reviewPayload),
    });
}

// ── 6. Patient Favorites ─────────────────────────────────────────────
export async function getPatientFavorites() {
    return apiFetch(`${BASE_URL}/patient/favorites`);
}

export async function addDoctorToFavorites(doctorId) {
    return apiFetch(`${BASE_URL}/patient/favorites`, {
        method: "POST",
        body: JSON.stringify({ doctorId }),
    });
}

export async function removeDoctorFromFavorites(doctorId) {
    return apiFetch(`${BASE_URL}/patient/favorites/${doctorId}`, {
        method: "DELETE",
    });
}

// ── 7. Profile / Auth Endpoints ──────────────────────────────────────
export async function getMyProfile() {
    return apiFetch(`${BASE_URL}/auth/me`);
}
export const getPatientProfile = getMyProfile;

export async function updateMyProfile(profileData) {
    return apiFetch(`${BASE_URL}/auth/me`, {
        method: "PUT",
        body: JSON.stringify(profileData),
    });
}
export const updatePatientProfile = updateMyProfile;

// ── 8. Doctor View Endpoints ─────────────────────────────────────────
export async function getDoctorAppointments(date = null, scope = "upcoming") {
    const params = new URLSearchParams({ scope });
    if (date) params.append("date", date);
    return apiFetch(`${BASE_URL}/doctor/appointments?${params.toString()}`);
}
export const fetchDoctorAppointments = getDoctorAppointments;

export async function getDoctorSchedule() {
    return apiFetch(`${BASE_URL}/doctor/schedule`);
}
export const fetchDoctorSchedule = getDoctorSchedule;

// ── 9. Wallet Endpoint ───────────────────────────────────────────────
export async function getWallet() {
    return apiFetch(`${BASE_URL}/patient/wallet`);
}