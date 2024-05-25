import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUp = async (userData) => {
  try {
    const response = await api.post('/users/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server Error');
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post('/users/login', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Login failed');
  }
};

export const saveMember = async (memberData) => { 
  try {
    const response = await api.post('/members/saveMember', memberData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Server Error');
  }
};

export const fetchTrainers = async () => {
  try {
    const response = await api.get('/trainers/getAllTrainers');
    return Array.isArray(response.data) ? response.data : []; // Ensure response is an array
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Server Error');
  }
};

export const saveTrainer = async (trainerData) => {
  try {
    const response = await api.post('/trainers/saveTrainer', trainerData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Server Error');
  }
};

export const fetchMemberByEmail = async (email) => {
  try {
    const response = await api.get(`/members/email/${email}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Server Error');
  }
};

export const updateMember = async (memberData, trainerName) => {
  try {
    const requestData = {
      member: memberData,
      trainerName: trainerName
    };
    const response = await api.put('/members/updateMember', requestData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Server Error');
  }
};

export default api; 
