import axios from "axios";

// Create a reusable Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // base URL from environment variable
  withCredentials: true,                   // send cookies with requests
  headers: {
    "Content-Type": "application/json",   // default JSON content type
  },
});

// Optional: Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access. Redirect to login or handle here.");
      // Example: window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
