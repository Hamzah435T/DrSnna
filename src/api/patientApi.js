// src/api/patientApi.js
import { getAuth } from "../auth/authStorage";

const BASE_URL = "http://localhost:8080/api";

function authHeaders() {
    const auth = getAuth();
    return {
        "Content-Type": "application/json",
        ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    };
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
    const url = `${BASE_URL}/patient/clinics${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to search clinics");
    }
    return res.json();
}
export const getClinics = searchClinics;
export const fetchClinics = searchClinics;

export async function getClinicDetails(clinicId) {
    const res = await fetch(`${BASE_URL}/patient/clinics/${clinicId}`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load clinic details");
    }
    return res.json();
}
export const fetchClinicDetails = getClinicDetails;

// ── 2. Slot Availability Endpoint ────────────────────────────────────
export async function fetchAvailability({ clinicId, date, doctorId } = {}) {
    if (!clinicId || !date) return [];

    const params = new URLSearchParams();
    params.append("date", date);
    if (doctorId && doctorId !== "undefined" && doctorId.trim() !== "") {
        params.append("doctorId", doctorId);
    }

    try {
        const res = await fetch(
            `${BASE_URL}/patient/clinics/${clinicId}/availability?${params.toString()}`,
            {
                headers: authHeaders(),
            }
        );

        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
    }
}
export const getAvailability = fetchAvailability;

// ── 3. Appointment Booking Endpoint ──────────────────────────────────
export async function bookAppointment(payload) {
    const res = await fetch(`${BASE_URL}/appointments/book`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Failed to complete appointment booking");
    }
    return data;
}
export const bookPatientAppointment = bookAppointment;

// ── 4. Patient Appointments & History ────────────────────────────────
export async function getPatientAppointments(scope = "upcoming") {
    const res = await fetch(`${BASE_URL}/patient/appointments?scope=${scope}`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load appointments");
    }
    return res.json();
}
export const fetchPatientAppointments = getPatientAppointments;

export async function getAppointmentDetails(appointmentId) {
    const res = await fetch(`${BASE_URL}/patient/appointments/${appointmentId}`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load appointment details");
    }
    return res.json();
}

export async function cancelAppointment(appointmentId) {
    const res = await fetch(`${BASE_URL}/patient/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: authHeaders(),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Failed to cancel appointment");
    }
    return data;
}

// ── 5. Reviews ───────────────────────────────────────────────────────
export async function createReview(reviewPayload) {
    const res = await fetch(`${BASE_URL}/patient/reviews`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(reviewPayload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Failed to submit review");
    }
    return data;
}

// ── 6. Patient Favorites ─────────────────────────────────────────────
export async function getPatientFavorites() {
    const res = await fetch(`${BASE_URL}/patient/favorites`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load favorite doctors");
    }
    return res.json();
}

export async function addDoctorToFavorites(doctorId) {
    const res = await fetch(`${BASE_URL}/patient/favorites`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ doctorId }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Failed to add favorite");
    }
    return data;
}

export async function removeDoctorFromFavorites(doctorId) {
    const res = await fetch(`${BASE_URL}/patient/favorites/${doctorId}`, {
        method: "DELETE",
        headers: authHeaders(),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Failed to remove favorite");
    }
    return data;
}

// ── 7. Profile / Auth Endpoints ──────────────────────────────────────
export async function getMyProfile() {
    const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load profile details");
    }
    return res.json();
}
export const getPatientProfile = getMyProfile;

export async function updateMyProfile(profileData) {
    const res = await fetch(`${BASE_URL}/auth/me`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(profileData),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
    }
    return data;
}
export const updatePatientProfile = updateMyProfile;

// ── 8. Doctor View Endpoints ─────────────────────────────────────────
export async function getDoctorAppointments(date = null, scope = "upcoming") {
    const params = new URLSearchParams({ scope });
    if (date) params.append("date", date);

    const res = await fetch(`${BASE_URL}/doctor/appointments?${params.toString()}`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load doctor appointments");
    }
    return res.json();
}
export const fetchDoctorAppointments = getDoctorAppointments;

export async function getDoctorSchedule() {
    const res = await fetch(`${BASE_URL}/doctor/schedule`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load doctor schedule");
    }
    return res.json();
}
export const fetchDoctorSchedule = getDoctorSchedule;

// ── 9. Wallet Endpoint ───────────────────────────────────────────────
export async function getWallet() {
    const res = await fetch(`${BASE_URL}/patient/wallet`, {
        headers: authHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load wallet details");
    }
    return res.json();
}