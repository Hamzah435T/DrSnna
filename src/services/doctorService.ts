// src/services/doctorService.ts

export interface CreateDoctorDto {
    fullName: string;
    email: string;
    specialty: string;
    phone: string;
    sendEmailNotification: boolean;
}

export const createDoctor = async (doctorData: CreateDoctorDto) => {
    const response = await fetch('/api/doctors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
    });

    if (!response.ok) {
        throw new Error('Failed to add doctor');
    }

    return await response.json();
};