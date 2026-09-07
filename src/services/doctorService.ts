// src/services/doctorService.ts
import { getToken } from '../auth/authStorage';

const BASE_URL = 'http://localhost:8080/api/clinic';

export interface CreateDoctorDto {
    fullName: string;
    email: string;
    specialty: string;
    phone?: string;
    sendEmailNotification?: boolean;
}

export const createDoctor = async (doctorData: CreateDoctorDto) => {
    const token = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}/doctors`, {
        method: 'POST',
        headers,
        body: JSON.stringify(doctorData),
    });

    if (!response.ok) {
        const text = await response.text().catch(() => '');
        let errMsg = 'Failed to add doctor';
        try {
            const errData = JSON.parse(text);
            errMsg = errData.message || errMsg;
            if (errData.validationErrors && errData.validationErrors.length > 0) {
                errMsg += ': ' + errData.validationErrors.join(', ');
            }
        } catch {
            if (text) errMsg += `: ${text}`;
        }
        throw new Error(errMsg);
    }

    return await response.json();
};