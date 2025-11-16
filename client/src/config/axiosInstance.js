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
  async (error) => {
    if (error.response?.status === 401) {

      console.log(error.response)

      console.log("Unauthorized access. Redirect to login or handle here.");


      const { store } = await import("../global/store");
      const { persistor } = await import("../global/store");
      const { logout } = await import("../global/authSlice");

      store.dispatch(logout())
      await persistor.purge()

      alert("Your login has ended. Please sign in again to access your account.")
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
