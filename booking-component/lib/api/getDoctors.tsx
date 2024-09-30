import { Doctor } from '@/lib/types';

export async function getDoctors(): Promise<Doctor[]> {
  console.log('Fetching doctors...');

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'; 
  const apiUrl = new URL('/api/doctors', baseUrl).toString();

  console.log('Fetching from URL:', apiUrl);

  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    console.log('Fetch response status:', res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Response:', res.status, res.statusText, errorText);
      throw new Error(`Failed to fetch doctors: ${res.status} ${res.statusText}. ${errorText}`);
    }

    const data = await res.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw new Error('Failed to fetch doctors. Please try again later.');
  }
}



export async function getDoctorById(id: number): Promise<Doctor | null> {
  try {
    const doctors = await getDoctors();
    return doctors.find(doctor => doctor.id === String(id)) || null;
  } catch (error) {
    console.error(`Error fetching doctor with id ${id}:`, error);
    throw new Error(`Failed to fetch doctor with id ${id}. Please try again later.`);
  }
}