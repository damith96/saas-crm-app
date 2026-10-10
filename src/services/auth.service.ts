import axiosInstance from "@/services/axiosInstance";
import type {
  ILoginRequest,
  IRegisterRequest,
  IForgotPasswordRequest,
  IResetPasswordRequest,
  IAuthResponse,
  IMessageResponse,
} from "@/interfaces/auth";

const authService = {
  /**
   * Authenticate an existing user and receive a JWT.
   */
  async login(data: ILoginRequest): Promise<IAuthResponse> {
    const res = await axiosInstance.post<IAuthResponse>("/auth/login", data);
    return res.data;
  },

  /**
   * Create a new user account.
   */
  async register(data: IRegisterRequest): Promise<IAuthResponse> {
    const res = await axiosInstance.post<IAuthResponse>("/auth/register", data);
    return res.data;
  },

  /**
   * Send a password-reset email to the given address.
   */
  async forgotPassword(
    data: IForgotPasswordRequest,
  ): Promise<IMessageResponse> {
    const res = await axiosInstance.post<IMessageResponse>(
      "/auth/forgot-password",
      data,
    );
    return res.data;
  },

  /**
   * Complete the password-reset flow using the token from the email link.
   */
  async resetPassword(data: IResetPasswordRequest): Promise<IMessageResponse> {
    const res = await axiosInstance.post<IMessageResponse>(
      "/auth/reset-password",
      data,
    );
    return res.data;
  },
};

export default authService;
