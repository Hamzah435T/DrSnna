/**
 * clinicDoctorsApi.js
 *
 * API service layer for clinic doctor management.
 * Currently returns mock data – swap implementations when the backend is ready.
 *
 * Every function returns a Promise so callers already use async/await,
 * making the migration to real HTTP calls seamless.
 */

// ── Helpers ──────────────────────────────────────────────────────────────────

// TODO: Replace BASE_URL with actual backend endpoint
// const BASE_URL = "/api/clinic/doctors";

// import { getToken } from "../../auth/authStorage";
// function authHeaders() {
//     return { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" };
// }

// ── Mock data ────────────────────────────────────────────────────────────────

const MOCK_DOCTORS = [
    {
        id: "doc-1",
        fullName: "Dr. Sarah Jenkins",
        specialty: "General Dentistry",
        bio: "Experienced general dentist focusing on preventative care and patient...",
        isActive: true,
        avatarUrl: null, // null → render initials
        initials: "SJ",
    },
    {
        id: "doc-2",
        fullName: "Dr. Marcus Chen",
        specialty: "Orthodontics",
        bio: "Specializes in modern orthodontic treatments including clear aligners...",
        isActive: true,
        avatarUrl: null,
        initials: "MC",
    },
    {
        id: "doc-3",
        fullName: "Dr. Robert Sterling",
        specialty: "Oral Surgery",
        bio: "Board-certified oral and maxillofacial surgeon. Expert in complex...",
        isActive: false,
        avatarUrl: null,
        initials: "RS",
    },
];

const SPECIALTIES = [
    "General Dentistry",
    "Orthodontics",
    "Oral Surgery",
    "Periodontics",
    "Endodontics",
    "Pediatric Dentistry",
    "Prosthodontics",
    "Cosmetic Dentistry",
];

function generateMockSchedule() {
    const hours = ["10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"];

    // Build 7 consecutive days starting from today
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

    // Pre-defined slot statuses for the 3 configured days to look realistic
    const configuredSlots = {
        0: ["open", "booked", "open", "resting", "resting", "resting", "resting", "resting"],
        1: ["open", "booked", "open", "resting", "resting", "resting", "resting", "resting"],
        2: ["open", "open", "resting", "open", "resting", "resting", "resting", "resting"],
    };

    return Array.from({ length: 7 }, (_, i) => {
        const configured = i < 3;
        return {
            dayLabel: labelForOffset(i),
            configured,
            slots: hours.map((time, si) => ({
                time,
                status: configured ? (configuredSlots[i][si] || "resting") : "resting",
            })),
        };
    });
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Fetch the list of doctors for this clinic. */
export async function fetchDoctors() {
    // TODO: Replace with real API call
    // const res = await fetch(BASE_URL, { headers: authHeaders() });
    // if (!res.ok) throw new Error("Failed to fetch doctors");
    // return res.json();

    return new Promise((resolve) =>
        setTimeout(() => resolve([...MOCK_DOCTORS]), 300)
    );
}

/** Fetch the list of available specialties. */
export async function fetchSpecialties() {
    // TODO: Replace with real API call
    return new Promise((resolve) =>
        setTimeout(() => resolve([...SPECIALTIES]), 100)
    );
}

/** Add a new doctor profile. Returns the created doctor object. */
export async function addDoctor({ fullName, specialty, bio }) {
    // TODO: Replace with real API call
    // const res = await fetch(BASE_URL, {
    //     method: "POST",
    //     headers: authHeaders(),
    //     body: JSON.stringify({ fullName, specialty, bio }),
    // });
    // if (!res.ok) throw new Error("Failed to add doctor");
    // return res.json();

    return new Promise((resolve) =>
        setTimeout(() => {
            const initials = fullName
                .split(" ")
                .filter((p) => p.length > 0)
                .map((p) => p[0].toUpperCase())
                .slice(0, 2)
                .join("");

            resolve({
                id: `doc-${Date.now()}`,
                fullName,
                specialty,
                bio,
                isActive: true,
                avatarUrl: null,
                initials,
            });
        }, 400)
    );
}

/** Update an existing doctor's profile. Returns the updated doctor. */
export async function updateDoctor(doctorId, { fullName, specialty, bio }) {
    // TODO: Replace with real API call
    // const res = await fetch(`${BASE_URL}/${doctorId}`, {
    //     method: "PUT",
    //     headers: authHeaders(),
    //     body: JSON.stringify({ fullName, specialty, bio }),
    // });
    // if (!res.ok) throw new Error("Failed to update doctor");
    // return res.json();

    return new Promise((resolve) =>
        setTimeout(() => {
            const initials = fullName
                .split(" ")
                .filter((p) => p.length > 0)
                .map((p) => p[0].toUpperCase())
                .slice(0, 2)
                .join("");

            resolve({
                id: doctorId,
                fullName,
                specialty,
                bio,
                isActive: true,
                avatarUrl: null,
                initials,
            });
        }, 400)
    );
}

/** Toggle a doctor's active status. Returns the updated doctor. */
export async function toggleDoctorStatus(doctorId, isActive) {
    // TODO: Replace with real API call
    // const res = await fetch(`${BASE_URL}/${doctorId}/status`, {
    //     method: "PATCH",
    //     headers: authHeaders(),
    //     body: JSON.stringify({ isActive }),
    // });
    // if (!res.ok) throw new Error("Failed to toggle status");
    // return res.json();

    return new Promise((resolve) =>
        setTimeout(() => resolve({ id: doctorId, isActive }), 300)
    );
}

/** Fetch working-hour schedule for a doctor. */
export async function fetchDoctorSchedule(doctorId) {
    // TODO: Replace with real API call
    // const res = await fetch(`${BASE_URL}/${doctorId}/schedule`, { headers: authHeaders() });
    // if (!res.ok) throw new Error("Failed to fetch schedule");
    // return res.json();

    return new Promise((resolve) =>
        setTimeout(() => resolve(generateMockSchedule()), 300)
    );
}

/** Update a specific slot's status in a doctor's schedule. */
export async function updateSlotStatus(doctorId, dayIndex, slotIndex, newStatus) {
    // TODO: Replace with real API call
    // const res = await fetch(`${BASE_URL}/${doctorId}/schedule`, {
    //     method: "PATCH",
    //     headers: authHeaders(),
    //     body: JSON.stringify({ dayIndex, slotIndex, status: newStatus }),
    // });
    // if (!res.ok) throw new Error("Failed to update slot");
    // return res.json();

    return new Promise((resolve) =>
        setTimeout(() => resolve({ success: true }), 200)
    );
}
