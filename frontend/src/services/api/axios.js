import axios from "axios";
import toast from "react-hot-toast";
import { TOKEN_KEY, USER_KEY } from "../../utils/constants";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Centralized response / error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error("Network error. Please check your connection.");
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const message = data?.message || "Something went wrong";

    if (status === 401) {
      // Token missing / invalid / expired — force re-auth
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      if (!window.location.pathname.startsWith("/login")) {
        toast.error(message || "Session expired. Please log in again.");
        window.location.href = "/login";
      }
    } else if (status === 403) {
      toast.error(message || "You don't have permission to do that.");
    } else if (status === 500) {
      toast.error(message || "Server error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default api;
