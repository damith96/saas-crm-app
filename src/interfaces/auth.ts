// ─── Request types ────────────────────────────────────────────────────────────

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordRequest {
  /** One-time token received in the password-reset email link. */
  token: string;
  password: string;
}

// ─── Response types ───────────────────────────────────────────────────────────

export interface IAuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IAuthResponse {
  token: string;
  refreshToken?: string;
  user: IAuthUser;
}

export interface IMessageResponse {
  message: string;
}
