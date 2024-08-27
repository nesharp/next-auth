"use server";

import { getVerficationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/user";
interface VerificationResponse {
  success?: string;
  error?: string;
}
export const verifyEmail = async (
  token: string
): Promise<VerificationResponse> => {
  const existingToken = await getVerficationTokenByToken(token);
  if (!existingToken) {
    return {
      error: "Invalid token!",
    };
  }
  const hasExpired = new Date() > new Date(existingToken.expires);
  if (hasExpired) {
    return {
      error: "Token has expired!",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return {
      error: "User not found!",
    };
  }
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });
  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Email verified!" };
};
