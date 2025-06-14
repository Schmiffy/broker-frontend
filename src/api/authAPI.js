import axios from 'axios';

const API_BASE_URL = 'https://api.bro-ker.com/api'; // Replace with your actual API base URL

export const authAPI = {
  login: async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth`, { username, password });
    return response.data;
  },
  signup: async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/signup`, { username, password });
    return response.data;
  }
};