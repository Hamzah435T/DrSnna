import { getToken } from "../auth/authStorage";

const BASE_URL = "http://localhost:8080/api/clinic";

function authHeaders() {
    return {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    };
}

/** Fetch the clinic profile. */
export async function fetchClinicProfile() {
    const res = await fetch(`${BASE_URL}/profile`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch clinic profile");
    return res.json();
}

/** Update the clinic profile. */
export async function updateClinicProfile(data) {
    const res = await fetch(`${BASE_URL}/profile`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        let errMsg = "Failed to update profile";
        try {
            const errData = JSON.parse(text);
            errMsg = errData.message || errMsg;
            if (errData.validationErrors && errData.validationErrors.length > 0) {
                errMsg += ": " + errData.validationErrors.join(", ");
            }
        } catch {
            errMsg += ` (Status ${res.status}): ${text.substring(0, 100)}`;
        }
        throw new Error(errMsg);
    }
    return res.json();
}

/** Fetch clinic hours from the schedule endpoint. */
export async function fetchClinicHours() {
    const res = await fetch(`${BASE_URL}/schedules/clinic-hours`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch clinic hours");
    return res.json();
}

/** Save a specific day's clinic hours. */
export async function saveClinicHours(dayOfWeekStr, startTime, endTime) {
    const res = await fetch(`${BASE_URL}/schedules/clinic-hours`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
            dayOfWeek: dayOfWeekStr,
            startTime,
            endTime,
        }),
    });
    if (!res.ok) throw new Error("Failed to save clinic hours");
    return res.json();
}

/** Delete a specific day's clinic hours. */
export async function deleteClinicHours(dayOfWeekStr) {
    const res = await fetch(`${BASE_URL}/schedules/clinic-hours?dayOfWeek=${dayOfWeekStr}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete clinic hours");
}

/** Fetch clinic specialties. */
export async function fetchSpecialties() {
    const res = await fetch(`${BASE_URL}/specialties`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch specialties");
    return res.json();
}

/** Add a new specialty. */
export async function addSpecialty(name) {
    const res = await fetch(`${BASE_URL}/specialties`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error("Failed to add specialty");
    return res.json();
}

/** Delete a specialty. */
export async function deleteSpecialty(name) {
    const res = await fetch(`${BASE_URL}/specialties/${encodeURIComponent(name)}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete specialty");
}
