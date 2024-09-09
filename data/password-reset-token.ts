import { db } from "@/lib/db";

export const getPasswordResetToken = async (token: string) => {
  try {
    const passwordToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    if (!passwordToken) return null;
    return passwordToken;
  } catch {
    return null;
  }
};
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    if (!passwordToken) return null;
    return passwordToken;
  } catch {
    return null;
  }
};
