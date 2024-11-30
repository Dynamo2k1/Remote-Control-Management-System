import axios from 'axios';

// Create an Axios instance for API calls
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 30000,
});

// Add token to the request headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to handle login
export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    if (response && response.data && response.data.access_token) {
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      return { success: true };
    } else {
      return { success: false, message: 'Unexpected response format from server' };
    }
  } catch (error) {
    if (error.response) {
      const message = error.response.data?.error || 'Invalid username or password';
      return { success: false, message };
    } else if (error.request) {
      return { success: false, message: 'Server did not respond. Please try again.' };
    } else {
      return { success: false, message: 'An unexpected error occurred' };
    }
  }
};

// Function to upload and execute YAML commands
export const executeDevices = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/devices/execute', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    if (error.response) {
      const message = error.response.data?.error || 'Failed to execute commands';
      return { success: false, message };
    } else if (error.request) {
      return { success: false, message: 'Server did not respond. Please try again.' };
    } else {
      return { success: false, message: 'An unexpected error occurred' };
    }
  }
};
