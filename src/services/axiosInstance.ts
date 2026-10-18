import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { errorInterceptor } from "@/services/interceptors/error.interceptor";
import { IErrorResponse } from "@/interfaces/error-response";
// Extend InternalAxiosRequestConfig to track whether a retry has been attempted
interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL || "/api",
  timeout: 30000, // 30 seconds timeout for large datasets
  withCredentials: true,
});

// Request interceptor for adding authorization headers
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const statusCode = error.response?.status;
    const isTokenExpired =
      statusCode === 401 &&
      error.response?.headers["x-token-expired"] === "true";

    if (isTokenExpired) {
      const originalRequest = error.config as RetryableRequestConfig;

      // Guard: if we already retried once, don't retry again — force logout
      if (originalRequest._retry) {
        localStorage.removeItem("authToken");
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // Import auth service dynamically to avoid circular dependency
        const authService = await import("./auth.service").then(
          (module) => module.default,
        );

        const { accessToken } = await authService.refreshToken();

        if (accessToken) {
          localStorage.setItem("authToken", accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          // Retry the original request with the new token
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token itself failed (expired or revoked) — force logout
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("authToken");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    // All other errors go through the error interceptor
    return errorInterceptor(error as AxiosError<IErrorResponse>);
  },
);

export default axiosInstance;
