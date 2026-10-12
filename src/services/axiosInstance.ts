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
    const originalRequest = error.config as RetryableRequestConfig;
    const statusCode = error.response?.status;

    // Only attempt token refresh when ALL conditions are true:
    // 1. Status is 401
    // 2. This is not already a retry (prevents infinite loop)
    // 3. The failing request is NOT the login endpoint itself
    //    (a wrong password also returns 401, but there's nothing to refresh)
    const isAuthEndpoint = originalRequest?.url?.includes("/auth/");
    const hasRefreshToken = !!localStorage.getItem("refreshToken");

    if (statusCode === 401 && !originalRequest._retry && !isAuthEndpoint && hasRefreshToken) {
      originalRequest._retry = true;

      try {
        // Import auth service dynamically to avoid circular dependency
        const authService = await import("./auth.service").then(
          (module) => module.default,
        );

        const refreshToken = localStorage.getItem("refreshToken");
        const refreshResult = await authService.refreshToken(refreshToken!);

        if (refreshResult?.accessToken) {
          localStorage.setItem("authToken", refreshResult.accessToken);
          originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`;
          // Retry the original request with the new token
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token itself failed (expired or revoked) — force logout
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    // All other errors go through the error interceptor
    return errorInterceptor(error as AxiosError<IErrorResponse>);
  },
);

export default axiosInstance;
