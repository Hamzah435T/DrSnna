import { getToken } from "../auth/authStorage";

const API_URL = 'http://localhost:8080/api/clinic/appointments';

function authHeaders() {
    return {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    };
}

export const getClinicAppointments = async (startDate, endDate, doctorId, status) => {
    try {
        const params = new URLSearchParams();

        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        if (doctorId) params.append('doctorId', doctorId);
        if (status) params.append('status', status);

        const response = await fetch(`${API_URL}?${params.toString()}`, {
            method: 'GET',
            headers: authHeaders()
        });
        if (!response.ok) throw new Error("Failed to fetch clinic appointments");
        return await response.json();
    } catch (error) {
        console.error('Error fetching clinic appointments:', error);
        throw error;
    }
};

export const createClinicAppointment = async (appointmentData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(appointmentData)
        });
        if (!response.ok) {
            const errBody = await response.text();
            let errMsg = "Failed to create appointment";
            try {
                const json = JSON.parse(errBody);
                errMsg = json.message || errMsg;
            } catch (e) {
                errMsg = `${errMsg}: ${errBody}`;
            }
            throw new Error(errMsg);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating clinic appointment:', error);
        throw error;
    }
};

export const deleteClinicAppointment = async (appointmentId) => {
    try {
        const response = await fetch(`${API_URL}/${appointmentId}`, {
            method: 'DELETE',
            headers: authHeaders()
        });
        if (!response.ok) throw new Error("Failed to delete appointment");
        return true;
    } catch (error) {
        console.error('Error deleting clinic appointment:', error);
        throw error;
    }
};
