// lib/api.js
import axios from 'axios';

export async function fetchData(endpoint) {
  const response = await axios.get(endpoint);
  return response.data;
}