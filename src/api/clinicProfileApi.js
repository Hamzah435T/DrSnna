// src/api/clinicProfileApi.js
import { clinicFetch } from "./clinicClient";

const BASE_URL = "http://localhost:8080/api/clinic";

export async function fetchClinicProfile() {
    const res = await clinicFetch(`${BASE_URL}/profile`);
    if (!res.ok) throw new Error("Failed to fetch clinic profile");
    return res.json();
}

export async function updateClinicProfile(data) {
    const res = await clinicFetch(`${BASE_URL}/profile`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        let errMsg = "Failed to update profile";
        try {
            const errData = JSON.parse(text);
            errMsg = errData.message || errMsg;
            if (errData.validationErrors?.length) {
                errMsg += ": " + errData.validationErrors.join(", ");
            }
        } catch {
            errMsg += ` (Status ${res.status}): ${text.substring(0, 100)}`;
        }
        throw new Error(errMsg);
    }
    return res.json();
}

export async function resubmitApplication(data) {
    const res = await clinicFetch(`${BASE_URL}/resubmit`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        let errMsg = "Failed to resubmit application";
        try {
            const errData = JSON.parse(text);
            errMsg = errData.message || errMsg;
            if (errData.validationErrors?.length) {
                errMsg += ": " + errData.validationErrors.join(", ");
            }
        } catch {
            errMsg += ` (Status ${res.status}): ${text.substring(0, 100)}`;
        }
        throw new Error(errMsg);
    }
    return res.json();
}

export async function fetchClinicHours() {
    const res = await clinicFetch(`${BASE_URL}/schedules/clinic-hours`);
    if (!res.ok) throw new Error("Failed to fetch clinic hours");
    return res.json();
}

export async function saveClinicHours(dayOfWeekStr, startTime, endTime) {
    const res = await clinicFetch(`${BASE_URL}/schedules/clinic-hours`, {
        method: "POST",
        body: JSON.stringify({
            dayOfWeek: dayOfWeekStr,
            startTime,
            endTime,
        }),
    });
    if (!res.ok) throw new Error("Failed to save clinic hours");
    return res.json();
}

export async function deleteClinicHours(dayOfWeekStr) {
    const res = await clinicFetch(`${BASE_URL}/schedules/clinic-hours?dayOfWeek=${dayOfWeekStr}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete clinic hours");
}

export async function fetchSpecialties() {
    const res = await clinicFetch(`${BASE_URL}/specialties`);
    if (!res.ok) throw new Error("Failed to fetch specialties");
    return res.json();
}

export async function addSpecialty(name, durationMinutes = 60) {
    const res = await clinicFetch(`${BASE_URL}/specialties`, {
        method: "POST",
        body: JSON.stringify({ name, durationMinutes }),
    });
    if (!res.ok) throw new Error("Failed to add specialty");
    return res.json();
}

export async function deleteSpecialty(name) {
    const res = await clinicFetch(`${BASE_URL}/specialties/${encodeURIComponent(name)}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to remove specialty");
}

export async function deleteSpecialtyPermanently(name) {
    const res = await clinicFetch(`${BASE_URL}/specialties/${encodeURIComponent(name)}/permanent`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete specialty permanently");
}

export async function fetchAllSpecialties() {
    const res = await clinicFetch(`${BASE_URL}/specialties/all`);
    if (!res.ok) throw new Error("Failed to fetch all specialties");
    return res.json();
}

export async function updateSpecialtyDuration(specialtyId, durationMinutes) {
    const res = await clinicFetch(`${BASE_URL}/specialties/${specialtyId}/duration`, {
        method: "PUT",
        body: JSON.stringify({ durationMinutes }),
    });
    if (!res.ok) throw new Error("Failed to update specialty duration");
    return res.json();
}