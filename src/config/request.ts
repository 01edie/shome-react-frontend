import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { notifyError } from "../utils/notifications";
import { authUserKey } from "../context/auth-context";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw Error("VITE_API_BASE_URL not defined");
}

// Create an instance of axios
const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// Response interceptor for handling errors globally
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log("interceptor", response);

    return response;
  },
  (error) => {
    // Handle specific status codes
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          console.error("Unauthorized! You may need to log in again.");
          if (!window.location.href.includes("/login")) {
            localStorage.removeItem(authUserKey);
            window.location.href = "/login";
          }

          break;
        case 403:
          console.error(
            "Forbidden! You do not have permission to access this resource."
          );
          break;
        case 404:
          console.error("Resource not found!");
          break;
        case 500:
          console.error("Server error. Please try again later.");
          break;
        default:
          console.error(data?.message || "An error occurred.");
      }
    } else {
      notifyError("Network error or server is unreachable.");
      console.error("Network error or server is unreachable.");
    }
    return Promise.reject(error);
  }
);

// Generic function for API requests
const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.request<T>(config);
    // console.log("original request function", response);
    return response.data;
  } catch (error) {
    // Optionally re-throw the error to handle it in the calling function
    throw error;
  }
};

export default request;
