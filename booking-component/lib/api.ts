import { Doctor, Appointment } from '@/lib/api/types';

// Utility function to construct API URLs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

// Fetch all doctors
export async function getDoctors(): Promise<Doctor[]> {
  console.log('Fetching doctors...');
  const apiUrl = buildUrl('/api/doctors');

  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Response:', res.status, res.statusText, errorText);
      throw new Error(`Failed to fetch doctors: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw new Error('Failed to fetch doctors. Please try again later.');
  }
}

// Fetch doctor by ID
export async function getDoctorById(id: string): Promise<Doctor | null> {
  const apiUrl = buildUrl(`/api/doctors/${id}`);
  console.log('Fetching doctor by ID:', apiUrl);

  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Response:', res.status, res.statusText, errorText);
      throw new Error(`Failed to fetch doctor: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Fetched doctor:', data);
    return data;
  } catch (error) {
    console.error(`Error fetching doctor with id ${id}:`, error);
    throw new Error(`Failed to fetch doctor with id ${id}. Please try again later.`);
  }
}

// Fetch available appointments for a doctor on a specific date
export async function getAvailableAppointments(doctorId: number, date: string): Promise<Appointment[]> {
  const apiUrl = buildUrl(`/api/appointments?doctorId=${doctorId}&date=${date}`);

  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Response:', res.status, res.statusText, errorText);
      throw new Error(`Failed to fetch appointments: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Fetched appointments:', data);
    return data;
  } catch (error) {
    console.error(`Error fetching appointments for doctorId ${doctorId} on ${date}:`, error);
    throw new Error('Failed to fetch appointments. Please try again later.');
  }
}

// Book an appointment
export async function bookAppointment(appointmentData: any): Promise<{ success: boolean; message: string }> {
  const apiUrl = buildUrl('/api/appointments');

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Response:', res.status, res.statusText, errorText);
      throw new Error(`Failed to book appointment: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Appointment booked successfully:', data);
    return data;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw new Error('Failed to book appointment. Please try again later.');
  }
}