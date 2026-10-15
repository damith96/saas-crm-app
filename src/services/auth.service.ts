import axiosInstance from "@/services/axiosInstance";
import type {
  ILoginRequest,
  IRegisterRequest,
  IForgotPasswordRequest,
  IResetPasswordRequest,
  IAuthResponse,
  IMessageResponse,
} from "@/interfaces/auth";
import type { ICommonResponse } from "@/interfaces/common-response";

const authService = {
  /**
   * Authenticate an existing user and receive a JWT.
   */
  async login(data: ILoginRequest): Promise<ICommonResponse<IAuthResponse>> {
    const res = await axiosInstance.post<ICommonResponse<IAuthResponse>>(
      "/auth/login",
      data,
    );
    return res.data;
  },

  /**
   * Create a new user account.
   */
  async register(
    data: IRegisterRequest,
  ): Promise<ICommonResponse<IAuthResponse>> {
    const res = await axiosInstance.post<ICommonResponse<IAuthResponse>>(
      "/auth/register",
      data,
    );
    return res.data;
  },

  /**
   * Exchange a refresh token for a new access token.
   * Called automatically by the axios interceptor when a 401 is received
   * on a non-auth endpoint.
   */
  async refreshToken(): Promise<Pick<IAuthResponse, "accessToken">> {
    const res = await axiosInstance.post<
      ICommonResponse<Pick<IAuthResponse, "accessToken">>
    >("/auth/refresh-token");
    return res.data.data;
  },

  /**
   * Send a password-reset email to the given address.
   */
  async forgotPassword(
    data: IForgotPasswordRequest,
  ): Promise<ICommonResponse<IMessageResponse>> {
    const res = await axiosInstance.post<ICommonResponse<IMessageResponse>>(
      "/auth/forgot-password",
      data,
    );
    return res.data;
  },

  /**
   * Complete the password-reset flow using the token from the email link.
   */
  async resetPassword(
    data: IResetPasswordRequest,
  ): Promise<ICommonResponse<IMessageResponse>> {
    const res = await axiosInstance.post<ICommonResponse<IMessageResponse>>(
      "/auth/reset-password",
      data,
    );
    return res.data;
  },
};

export default authService;
