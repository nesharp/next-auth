import { db } from "@/lib/db";
import { VerificationToken } from "@prisma/client";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const token = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return token;
  } catch {
    return null;
  }
};
export const getVerficationTokenByToken = async (
  token: string
): Promise<VerificationToken | null> => {
  try {
    const verficationToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return verficationToken;
  } catch {
    return null;
  }
};
