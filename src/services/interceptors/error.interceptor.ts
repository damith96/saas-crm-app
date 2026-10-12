import { AxiosError } from "axios";
import { ApiError, IErrorResponse } from "@/interfaces/error-response";
// import { toast } from "sonner";

/**
 * Handles API errors by logging the error message and status code.
 * If the status code is 401 (Unauthorized), it redirects the user to the login page
 * with the current URL as a redirect query parameter.
 * @param error - The Axios error object.
 * @returns A rejected promise with a typed ApiError instance.
 */
export function errorInterceptor(error: AxiosError<IErrorResponse>) {
  const statusCode = error.response?.status;
  const errorMessage = error.response?.data?.message || error.message;

  // Log the error message and status code
  console.info(`API Error: ${errorMessage} (Status Code: ${statusCode})`);
  // toast.error(`Error: ${errorMessage}`);

  // Handle specific error conditions
  // if (statusCode === 401) {
  //   // Get the current URL
  //   const currentUrl = window.location.pathname + window.location.search;

  //   // Redirect to the login page with the current URL as a redirect query parameter
  //   console.warn("Unauthorized: Redirecting to login...");
  //   window.location.href = `/auth/login?redirect=${encodeURIComponent(
  //     currentUrl,
  //   )}`;
  // }

  if (statusCode === 403) {
    console.warn(
      "Forbidden action: User doesn't have enough permission to perform this action",
    );
    // window.location.href = "/auth/forbidden-error";
  }

  // Reject with a proper Error instance so catch blocks can use error.message directly
  return Promise.reject(new ApiError(errorMessage, statusCode));
}
