import { fetchAPI } from './api';
import { Doctor } from '@/lib/types';

export async function getDoctors(): Promise<Doctor[]> {
  console.log('Fetching doctors...');
  try {
    const data = await fetchAPI('/doctors');
    console.log('Fetched doctors:', data);
    return data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw new Error('Failed to fetch doctors. Please try again later.');
  }
}

export async function getDoctorById(id: number): Promise<Doctor | null> {
  try {
    const response = await fetch(`http://localhost:3001/api/doctors/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch doctor');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return null;
  }
}