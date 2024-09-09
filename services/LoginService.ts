"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

type LoginResponse = {
  success?: string;
  error?: string;
};
class LoginService {
  async login(values: z.infer<typeof LoginSchema>): Promise<LoginResponse> {
    const validatedField = LoginSchema.safeParse(values);
    if (!validatedField.success) {
      return { error: "Invalid input" };
    }
    const { email, password } = validatedField.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "User does not exist" };
    }
    if (!existingUser.emailVerified) {
      const { token } = await generateVerificationToken(email);
      await sendVerificationEmail(email, token);
      return { success: "Confirmation email sent" };
    }
    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
      return { success: "Logged in successfully" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials" };
          default:
            return { error: "Something went wrong!" };
        }
      }
    }

    return { success: "Logged in successfully" };
  }
}
export default new LoginService();
