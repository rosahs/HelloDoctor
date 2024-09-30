import { Doctor, Appointment } from '@/lib/api/types';

export async function getDoctors(): Promise<Doctor[]> {
  const res = await fetch('/api/doctors');
  if (!res.ok) throw new Error('Failed to fetch doctors');
  return res.json();
}

export async function getDoctorById(id: string) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${API_BASE_URL}/api/doctors/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch doctor");
    }
    return response.json();
  }

export async function getAvailableAppointments(doctorId: number, date: string): Promise<Appointment[]> {
  const res = await fetch(`/api/appointments?doctorId=${doctorId}&date=${date}`);
  if (!res.ok) throw new Error('Failed to fetch appointments');
  return res.json();
}

export async function bookAppointment(appointmentData: any): Promise<{ success: boolean; message: string }> {
  const res = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointmentData),
  });
  if (!res.ok) throw new Error('Failed to book appointment');
  return res.json();
}