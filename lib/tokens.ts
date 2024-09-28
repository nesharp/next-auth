import crypto from "crypto";
import { v4 as uuid } from "uuid";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const now = new Date().getTime();
  const expires = new Date(now + 3600 * 1000);
  const existingToken = await getTwoFactorTokenByEmail(email);
  console.log("existingToken", existingToken);
  if (existingToken) {
    await db.twoFactorToken.delete({ where: { id: existingToken.id } });
  }
  const newToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return newToken;
};
export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await db.verificationToken.findFirst({
    where: { email },
  });
  // const updatedToken = await db.verificationToken.upsert({
  //   where: { id: existingToken?.id },
  //   update: { token, expires },
  //   create: { token, expires, email },
  // });
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }
  const newToken = await db.verificationToken.create({
    data: { token, expires, email },
  });
  return newToken;
};
export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);

  // add checking if token was generated no so fast
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }
  const newToken = await db.passwordResetToken.create({
    data: { token, expires, email },
  });
  return newToken;
};
