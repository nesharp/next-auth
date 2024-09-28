"use server";

import { getTwoFactorTokenByToken } from "@/data/two-factor-token";
import { Response2FA } from "./types";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Verify2FA = async (token: string): Promise<Response2FA> => {
  try {
    const confirmation = await getTwoFactorTokenByToken(token);
    if (!confirmation) {
      return { error: "2FA not verified" };
    }
    const now = new Date();
    if (new Date(confirmation.expires) < now) {
      return { error: "2FA expired" };
    }
    if (confirmation.token !== token) {
      return { error: "2FA not verified" };
    }
    await signIn("credentials", {
      email: confirmation.email,
      password: confirmation,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "2FA verified" };
  } catch {
    return { error: "2FA not verified" };
  }
};
