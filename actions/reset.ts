"use server";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/user";
import * as z from "zod";
interface ResetResponse {
  success?: string;
  error?: string;
}
export const reset = async (
  values: z.infer<typeof ResetSchema>
): Promise<ResetResponse> => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "User not found!" };
  }
  
  const { token } = await generatePasswordResetToken(email);
  if (!token) {
    return { error: "Something went wrong!" };
  }
  await sendPasswordResetEmail(email, token);

  return { success: "Reset email sent!" };
};
