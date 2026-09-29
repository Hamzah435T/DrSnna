// src/api/clinicClient.js
import { getToken, clearAuth } from "../auth/authStorage";

export async function clinicFetch(url, options = {}) {
    const token = getToken();
    const headers = {
        "Content-Type": "application/json",
        "Accept-Language": localStorage.getItem("i18nextLng") || "en",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    let response;
    try {
        response = await fetch(url, {
            ...options,
            headers,
            credentials: "include",
        });
    } catch (networkError) {
        throw new Error("Network connection error. Please check your connectivity.");
    }

    // Intercept Revoked Token (401) and Restricted/Decommissioned Clinic Access (403)
    if (response.status === 401 || response.status === 403) {
        clearAuth();
        // Redirect to login; once the clinic re-logs in, ClinicDashboard detects REJECTED and renders RejectedApplication
        window.location.href = "/login";
        throw new Error("Session expired or permissions revoked. Redirecting to login...");
    }

    return response;
}