import { getToken } from "../auth/authStorage";

const BASE_URL = "http://localhost:8080/api/clinic";

function authHeaders() {
    return {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json", "Accept-Language": localStorage.getItem("i18nextLng") || "en"
    };
}

export async function fetchInsurances() {
    const res = await fetch(`${BASE_URL}/insurance-companies`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Failed to fetch insurances");
    return res.json();
}

export async function addInsurance(data) {
    const res = await fetch(`${BASE_URL}/insurance-companies`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to add insurance: ${text}`);
    }
    return res.json();
}

export async function updateInsurance(id, data) {
    const res = await fetch(`${BASE_URL}/insurance-companies/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to update insurance: ${text}`);
    }
    return res.json();
}

export async function deleteInsurance(id) {
    const res = await fetch(`${BASE_URL}/insurance-companies/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to delete insurance: ${text}`);
    }
}

