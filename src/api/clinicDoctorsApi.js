/**
 * clinicDoctorsApi.js
 *
 * API service layer for clinic doctor management.
 * Currently returns mock data – swap implementations when the backend is ready.
 *
 * Every function returns a Promise so callers already use async/await,
 * making the migration to real HTTP calls seamless.
 */

const BASE_URL = "http://localhost:8080/api/clinic";

import { getToken } from "../auth/authStorage";
import { localToUtcSpecific, utcToLocalSpecific } from "../utils/timezone";

function authHeaders() {
    return {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    };
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Fetch the list of doctors for this clinic. */
export async function fetchDoctors() {
    const res = await fetch(`${BASE_URL}/doctors`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch doctors");
    const data = await res.json();
    return data.map(d => ({
        ...d,
        id: d.doctorUserId, // Map backend's doctorUserId to id for UI compatibility
    }));
}

/** Fetch the list of available specialties. */
export async function fetchSpecialties() {
    const res = await fetch(`${BASE_URL}/specialties`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch specialties");
    const data = await res.json();
    // Assuming backend returns an array of objects with a name/specialtyName field
    // Map to just strings for the UI
    return data.map(s => s.name || s.specialtyName || s);
}

/** Add a new doctor profile. Returns the created doctor object. */
export async function addDoctor({ fullName, specialty, bio }) {
    // Generate dummy credentials since they aren't on the UI yet
    const email = `${fullName.replace(/\s+/g, '').toLowerCase()}.${Date.now()}@drsna.dummy`;
    const password = 'Password@123'; // Must meet backend validation

    const res = await fetch(`${BASE_URL}/doctors`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ fullName, email, password, specialty, bio }),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        let errMsg = "Failed to add doctor";
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
    const created = await res.json();
    return { ...created, id: created.doctorUserId };
}

/** Update an existing doctor's profile. Returns the updated doctor. */
export async function updateDoctor(doctorId, { fullName, specialty, bio }) {
    if (!doctorId) throw new Error("Doctor ID is missing. Please refresh the page.");
    const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ fullName, specialty, bio }),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        let errMsg = "Failed to update doctor";
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
    const updated = await res.json();
    return { ...updated, id: updated.doctorUserId };
}

/** Toggle a doctor's active status. Returns the updated doctor. */
export async function toggleDoctorStatus(doctorId, isActive) {
    if (!doctorId) throw new Error("Doctor ID is missing. Please refresh the page.");
    const res = await fetch(`${BASE_URL}/doctors/${doctorId}/toggle-status`, {
        method: "PATCH",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed to toggle status");
    const updated = await res.json();
    return { ...updated, id: updated.doctorUserId };
}

/** Fetch working-hour schedule for a doctor. */
export async function fetchDoctorSchedule(doctorId) {
    const res = await fetch(`${BASE_URL}/schedules/doctor-schedule/${doctorId}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch schedule");
    const savedSchedules = await res.json();

    // Map backend schedules to the 7-day format expected by UI
    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function labelForOffset(offset) {
        if (offset === 0) return "Today";
        if (offset === 1) return "Tomorrow";
        const d = new Date(today);
        d.setDate(today.getDate() + offset);
        return `${dayNames[d.getDay()]}, ${monthNames[d.getMonth()]} ${d.getDate()}`;
    }

    // Convert all backend UTC schedules to Local Time
    const localSavedSchedules = savedSchedules.map(s => {
        if (!s.startTime || !s.endTime) return null;
        const start = utcToLocalSpecific(s.specificDate, s.startTime);
        const end = utcToLocalSpecific(s.specificDate, s.endTime);
        return {
            localDate: start.localDate,
            startTime: start.localTime,
            endTime: end.localTime
        };
    }).filter(Boolean);

    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const dayNum = String(d.getDate()).padStart(2, '0');
        const isoDate = `${year}-${month}-${dayNum}`;

        // Find if we have a mapped local schedule for this specific date
        const backendDay = localSavedSchedules.find(s => s.localDate === isoDate);

        return {
            dayLabel: labelForOffset(i),
            isoDate: isoDate, // Keep this for saving later
            isActive: !!backendDay,
            startTime: backendDay ? backendDay.startTime : "",
            endTime: backendDay ? backendDay.endTime : "",
        };
    });
}

export async function saveDoctorSchedule(doctorId, specificDateStr, startTime, endTime) {
    const startTimeFull = startTime.length === 5 ? startTime + ":00" : startTime;
    const endTimeFull = endTime.length === 5 ? endTime + ":00" : endTime;

    const startConv = localToUtcSpecific(specificDateStr, startTimeFull);
    const endConv = localToUtcSpecific(specificDateStr, endTimeFull);

    const res = await fetch(`${BASE_URL}/schedules/doctor-schedule`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
            doctorId,
            type: "DOCTOR_SHIFT",
            specificDate: startConv.utcDate,
            startTime: startConv.utcTime,
            endTime: endConv.utcTime
        })
    });
    if (!res.ok) throw new Error("Failed to save schedule");
    return res.json();
}

/** Delete a specific day's shift schedule. */
export async function deleteDoctorScheduleDate(doctorId, specificDateStr, startTime, endTime) {
    // We need to delete the specific UTC date that this local date mapped to!
    const startTimeFull = (startTime || "09:00").length === 5 ? (startTime || "09:00") + ":00" : (startTime || "09:00");
    const startConv = localToUtcSpecific(specificDateStr, startTimeFull);

    const res = await fetch(`${BASE_URL}/schedules/doctor-schedule/${doctorId}/date/${startConv.utcDate}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!res.ok) throw new Error("Failed to delete schedule");
    return res.text();
}

/** Delete a doctor from the clinic. */
export async function deleteDoctor(doctorId) {
    if (!doctorId) throw new Error("Doctor ID is missing. Please refresh the page.");
    const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        let errMsg = "Failed to delete doctor";
        try {
            const errData = JSON.parse(text);
            errMsg = errData.message || errMsg;
        } catch {
            errMsg += ` (Status ${res.status}): ${text.substring(0, 100)}`;
        }
        throw new Error(errMsg);
    }
}
