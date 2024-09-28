export enum AuthRoutes {
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  ERROR = "/auth/error",
  RESET = "/auth/reset",
  CHANGE_PASSWORD = "/auth/change-password",
  TWO_FACTOR = "/auth/two-factor",
}
export enum PublicRoutes {
  HOME = "/",
  VERIFICATION = "/auth/verify",
}
export const publicRoutes = Object.values(PublicRoutes);
export const authRoutes = Object.values(AuthRoutes);
export const apiAuthPrefix = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/settings";
