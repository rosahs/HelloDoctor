import { Doctor } from '@/lib/api/types';

// Fetch all doctors
export async function getDoctors(): Promise<Doctor[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'; 
  const apiUrl = `${baseUrl}/api/doctors`; 

  console.log('Fetching doctors from:', apiUrl);

  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error fetching doctors:', res.status, res.statusText, errorText);
      throw new Error(`Failed to fetch doctors: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Fetched doctors:', data);
    return data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw new Error('Failed to fetch doctors. Please try again later.');
  }
}

// Fetch a doctor by ID
export async function getDoctorById(id: string): Promise<Doctor | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch doctor');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return null;
  }
}