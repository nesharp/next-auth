"use server";
import { getPasswordResetToken } from "@/data/password-reset-token";
import { db } from "@/lib/db";
import { ChangePasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/user";
import bcrypt from "bcryptjs";
import * as z from "zod";
interface ReturnType {
  error?: string;
  success?: string;
}
export const changePassword = async (
  values: z.infer<typeof ChangePasswordSchema>,
  token?: string | null
): Promise<ReturnType> => {
  if (!token) {
    return { error: "Invalid token" };
  }
  const validatedFields = ChangePasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: validatedFields.error.message };
  }
  const { password } = validatedFields.data;
  console.log(token)
  const existingToken = await getPasswordResetToken(token);
  console.log(existingToken)
  if (!existingToken) {
    return { error: "Invalid token" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }
  const user = await getUserByEmail(existingToken.email);
  if (!user) {
    return { error: "User not found" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });
  await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  return { success: "Password changed successfully" };
};
