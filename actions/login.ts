"use server";
import { signIn } from "@/auth";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/user";
import { AuthError } from "next-auth";
import * as z from "zod";
import { LoginResponse } from "./types";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";

export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<LoginResponse> => {
  const validatedField = LoginSchema.safeParse(values);
  if (!validatedField.success) {
    return {
      error: "Invalid input",
    };
  }
  const { email, password } = validatedField.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: "User does not exist",
    };
  }
  if (!existingUser.emailVerified) {
    const { token } = await generateVerificationToken(email);
    await sendVerificationEmail(email, token);

    return {
      success: "Confirmation email sent",
    };
  }
  // if (existingUser.isTwoFactorEnabled && existingUser.email) {
  //   const token2f = await generateTwoFactorToken(existingUser.email);
  //   await sendTwoFactorTokenEmail(existingUser.email, token2f.token);
  //   return {
  //     success: "You have two-factor authentication. Check your email.",
  //   };
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return {
      success: "Logged in successfully",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }
    throw error;
  }
};
