const API_BASE_URL = "http://localhost:8080/api";

export async function login({ email, password }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
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
                "Content-Type": "application/json",
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
                "Content-Type": "application/json",
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