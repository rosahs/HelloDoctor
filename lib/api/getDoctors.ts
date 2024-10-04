import { fetchAPI } from './api';
import { Doctor } from '@/lib/types';

export async function getDoctors(): Promise<Doctor[]> {
  try {
    return await fetchAPI('/doctors');
  } catch (error) {
    console.error('Error in getDoctors:', error);
    throw error;
  }
}

export async function getDoctorById(id: number): Promise<Doctor | null> {
  try {
    return await fetchAPI(`/doctors/${id}`);
  } catch (error) {
    console.error('Error in getDoctorById:', error);
    return null;
  }
}