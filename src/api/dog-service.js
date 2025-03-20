import axios from 'axios';

const API_URL = 'https://frontend-take-home-service.fetch.com';
const HEADERS = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};
//auth api to hit the endpoint for login.
export const loginUser = async (name, email) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { name, email },
      HEADERS
    );
    return response.status === 200;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login Failed');
  }
};

//checking auth status.
export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/status`, HEADERS);
    return response.data;
  } catch (error) {
    return null;
  }
};

//logout user.
export const logoutUser = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`, {}, HEADERS);
};

// fetch available breeds.
export const fetchBreeds = async () => {
  const response = await axios.get(`${API_URL}/dogs/breeds`, HEADERS);
  return response.data;
};

// fetch dogs based on filters.
export const fetchDogs = async filters => {
  console.log('filters', filters);
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
  return response.data;
};

//fetching dog details
export const fetchDogDetails = async dogIds => {
  if (!dogIds || dogIds.length === 0) return [];
  const response = await axios.post(`${API_URL}/dogs`, dogIds, HEADERS);
  return response.data;
};

//fetch favorites match
export const fetchMatch = async favoriteDogIds => {
  if (!favoriteDogIds.length) throw new Error('No favorite dogs selected!');

  const response = await axios.post(
    `${API_URL}/dogs/match`,
    favoriteDogIds,
    HEADERS
  );
  return response.data;
};
