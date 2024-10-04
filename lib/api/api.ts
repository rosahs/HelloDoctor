import { Doctor, Appointment } from '@/lib/types';

// Utility function to construct API URLs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

async function fetchWithRetry(url: string, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error(`Failed to fetch after ${retries} attempts`);
}

export async function fetchAPI(endpoint: string) {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`Attempting to fetch from: ${url}`);
  
  try {
    return await fetchWithRetry(url);
  } catch (error) {
    console.error('API fetch error:', error);
    console.error('API_BASE_URL:', API_BASE_URL);
    console.error('Full URL:', url);
    throw error;
  }
}