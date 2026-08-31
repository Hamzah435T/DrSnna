import { getToken } from "../auth/authStorage";

const BASE_URL = "http://localhost:8080/api/patient";

function authHeaders() {
    return {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    };
}

/** 
 * Search for clinics.
 * Note: fee and rating filters are not supported by the backend yet, 
 * so they will be handled client-side.
 */
export async function searchClinics({ name, city, specialty, date, availableOnly }) {
    const params = new URLSearchParams();
    
    if (name) params.append("name", name);
    if (city && city !== "All Cities") {
        // Map UI city names to backend ENUM
        const cityMap = {
            "Amman": "AMMAN",
            "Irbid": "IRBID",
            "Zarqa": "ZARQA",
            "Aqaba": "AQABA",
            "Salt": "BALQA",
            "Mafraq": "MAFRAQ",
            "Ajloun": "AJLOUN",
            "Jerash": "JERASH",
            "Madaba": "MADABA",
            "Karak": "KARAK",
            "Tafilah": "TAFILEH",
            "Maan": "MAAN"
        };
        const mappedCity = cityMap[city];
        if (mappedCity) params.append("city", mappedCity);
    }
    if (specialty && specialty !== "All Specialties") {
        params.append("specialty", specialty);
    }
    if (date) {
        params.append("date", date);
    }
    if (availableOnly) {
        params.append("availableOnly", "true");
    }

    const res = await fetch(`${BASE_URL}/clinics?${params.toString()}`, {
        headers: authHeaders()
    });
    
    if (!res.ok) {
        throw new Error("Failed to search clinics");
    }
    
    return res.json();
}

/** Fetch full clinic details by ID. */
export async function fetchClinicDetails(clinicId) {
    const res = await fetch(`${BASE_URL}/clinics/${clinicId}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch clinic details");
    return res.json();
}

/** Fetch availability slots for a clinic on a given date, optionally for a specific doctor. */
export async function fetchAvailability(clinicId, date, doctorId) {
    const params = new URLSearchParams({ date });
    if (doctorId) params.append("doctorId", doctorId);

    const res = await fetch(`${BASE_URL}/clinics/${clinicId}/availability?${params.toString()}`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch availability");
    return res.json();
}

/** Book an appointment as a patient */
export async function bookPatientAppointment(appointmentData) {
    const res = await fetch(`${BASE_URL}/appointments`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(appointmentData)
    });
    if (!res.ok) {
        const errBody = await res.text();
        let errMsg = "Failed to book appointment";
        try {
            const json = JSON.parse(errBody);
            errMsg = json.message || errMsg;
        } catch {
            errMsg = `${errMsg}: ${errBody}`;
        }
        throw new Error(errMsg);
    }
    return res.json();
}

