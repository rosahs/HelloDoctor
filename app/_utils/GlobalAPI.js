// GlobalAPI.js
import axios from "axios";

// In Next.js, environment variables are automatically loaded, so we don't need dotenv
// Remove this line: import dotenv from "dotenv";

// Next.js uses NEXT_PUBLIC_ prefix for client-side environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:1337';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Create the axios instance with the base URL and headers
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getCategory = async () => {
  try {
    console.log('Attempting to fetch categories from:', `${API_BASE_URL}/api/categories?populate=*`);
    const response = await axiosClient.get('/api/categories?populate=*');
    console.log('Response received:', response);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};

export default { getCategory };
