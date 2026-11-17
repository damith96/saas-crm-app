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

// Plain axios instance used exclusively for the refresh-token call.
// It intentionally has NO interceptors so that a failed refresh cannot
// trigger another refresh attempt (which would cause an infinite loop).
const axiosRefresh = axios.create({
  baseURL: process.env.BACKEND_URL || "/api",
  timeout: 10000,
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
        // PREVIOUS APPROACH (caused infinite loop):
        // authService.refreshToken() uses axiosInstance, which has this same
        // interceptor. When the expired JWT is sent with the refresh request,
        // ASP.NET's auth middleware fires OnAuthenticationFailed and sets
        // X-Token-Expired: true on the refresh response — which re-triggers
        // this interceptor, causing an unlimited refresh loop.
        //
        // const authService = await import("./auth.service").then(
        //   (module) => module.default,
        // );
        // const { accessToken } = await authService.refreshToken();

        // Use axiosRefresh (no interceptors) to avoid re-triggering this
        // interceptor on the refresh call itself, which would cause an
        // infinite loop when the server sets X-Token-Expired on any request
        // that carries an expired JWT — including the refresh endpoint.
        const refreshResponse = await axiosRefresh.post<{
          data: { accessToken: string };
        }>("/auth/refresh-token");

        const accessToken = refreshResponse.data?.data?.accessToken;

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
