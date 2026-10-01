import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { errorInterceptor } from "@/services/interceptors/error.interceptor";
import { IErrorResponse } from "@/interfaces/error-response";

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
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: AxiosError) => {
//     // Check if error is due to token expiration (401 Unauthorized)
//     if (error.response?.status === 401) {
//       const refreshToken = localStorage.getItem("refreshToken");

//       // If we have a refresh token, try to get a new access token
//       if (refreshToken) {
//         try {
//           // Import auth service dynamically to avoid circular dependency
//           const authService = await import("./auth.service").then(
//             (module) => module.default,
//           );

//           // Try to refresh the token
//           const refreshResult =
//             await authService.checkHealthAndRefreshToken(refreshToken);

//           if (refreshResult) {
//             // Token refreshed successfully, retry the original request
//             const originalRequest = error.config as InternalAxiosRequestConfig;
//             if (originalRequest.headers) {
//               originalRequest.headers.Authorization = `Bearer ${refreshResult.token}`;
//             }
//             return axiosInstance(originalRequest);
//           }
//         } catch (refreshError) {
//           console.error("Token refresh failed:", refreshError);
//           // If refresh fails, redirect to login
//           window.location.href = "/auth/login";
//           return Promise.reject(error);
//         }
//       }
//     }

//     // For other errors, use the error interceptor
//     errorInterceptor(error as AxiosError<IErrorResponse>);
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
