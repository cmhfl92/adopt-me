import axios from 'axios';

const API_URL = 'https://frontend-take-home-service.fetch.com';
const HEADERS = { headers: { 'Content-Type': 'application/json' } };

// Fetch available breeds
export const fetchBreeds = async () => {
  const response = await axios.get(`${API_URL}/dogs/breeds`, HEADERS);
  return response.data; // Array of breed names
};

// Fetch dogs based on filters
export const fetchDogs = async filters => {
  const params = new URLSearchParams();

  if (filters.breeds.length) params.append('breeds', filters.breeds.join(','));
  if (filters.zipCodes.length)
    params.append('zipCodes', filters.zipCodes.join(','));
  if (filters.ageMin) params.append('ageMin', filters.ageMin.toString());
  if (filters.ageMax) params.append('ageMax', filters.ageMax.toString());
  if (filters.size) params.append('size', filters.size.toString());
  if (filters.from) params.append('from', filters.from);
  if (filters.sort) params.append('sort', filters.sort);

  const response = await axios.get(
    `${API_URL}/dogs/search?${params.toString()}`,
    HEADERS
  );
  return response.data; // Contains resultIds, total, next, prev
};
