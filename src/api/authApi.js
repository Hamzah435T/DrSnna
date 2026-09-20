const API_BASE_URL = "http://localhost:8080/api";

export async function login({ email, password }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include",            // needed so the browser stores Set-Cookie
        headers: {
            "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en",
        },

        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
}

// Refresh Token Rotation: every refresh call invalidates the cookie it used.
// If two refreshes run at the same time, the second one sends an already-used
// token and fails, so concurrent callers share one in-flight request.
let refreshInFlight = null;

async function doRefresh() {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",            // needed so the browser sends the cookie
        headers: {
            "Accept-Language": localStorage.getItem("i18nextLng") || "en",
        },
    });

    // Error bodies are not guaranteed to be JSON, so don't let parsing hide the status.
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Session expired");
    }

    return data;
}

export function refreshAccessToken() {
    if (!refreshInFlight) {
        refreshInFlight = doRefresh().finally(() => {
            refreshInFlight = null;
        });
    }
    return refreshInFlight;
}

export async function registerPatient({
                                          fullName,
                                          email,
                                          city,
                                          password,
                                          confirmPassword,
                                      }) {
    const response = await fetch(
        `${API_BASE_URL}/auth/register/user`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en",
            },

            body: JSON.stringify({
                fullName,
                email,
                city,
                password,
                confirmPassword,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Patient registration failed");
    }

    return data;
}

export async function registerClinic({
                                         clinicName,
                                         email,
                                         city,
                                         clinicLicenseNumber,
                                         password,
                                         confirmPassword,
                                     }) {
    const response = await fetch(
        `${API_BASE_URL}/auth/register/clinic`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en",
            },

            body: JSON.stringify({
                clinicName,
                email,
                city,
                clinicLicenseNumber,
                password,
                confirmPassword,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "clinic registration failed");
    }

    return data;
}

export async function logout(token) {
    const response = await fetch(
        `${API_BASE_URL}/auth/logout`,
        {
            method: "POST",
            credentials: "include",        // needed so the browser sends and clears the cookie
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Logout failed");
    }

    return data;
}

export async function changeAdminPassword({
                                              newPassword,
                                              confirmPassword,
                                              token,
                                          }) {
    const response = await fetch(
        `${API_BASE_URL}/auth/change-password`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept-Language":
                    localStorage.getItem("i18nextLng") || "en",
            },

            body: JSON.stringify({
                newPassword,
                confirmPassword,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to change password"
        );
    }

    return data;
}