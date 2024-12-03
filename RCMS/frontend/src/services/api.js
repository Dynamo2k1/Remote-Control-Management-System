import axios from "axios";

// Create an Axios instance for API calls
const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
  timeout: 30000000000000,
});

// Add token to the request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to handle login
export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    if (response.data && response.data.access_token) {
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      return { success: true, message: response.data.message || "Login successful" };
    }
    return { success: false, message: "Unexpected response format from server" };
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data?.message || "Invalid username or password" };
    } else if (error.request) {
      return { success: false, message: "Server did not respond. Please try again." };
    } else {
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};

// Function to handle user registration
export const register = async (username, email, password) => {
  try {
    const response = await api.post("/auth/register", { username, email, password });
    return { success: true, message: response.data.message || "Registration successful" };
  } catch (error) {
    if (error.response) {
      return { success: false, message: error.response.data?.message || "Failed to register" };
    } else if (error.request) {
      return { success: false, message: "Server did not respond. Please try again." };
    } else {
      return { success: false, message: "An unexpected error occurred" };
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
              'Content-Type': 'multipart/form-data', // Ensure it's multipart form data
          },
      });

      return { success: true, data: response.data };
  } catch (error) {
      console.error("Error uploading file:", error);
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
