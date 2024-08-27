"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/user";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterResponse } from "./types";
import { sendVerificationEmail } from "@/lib/mail";
export const register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<RegisterResponse> => {
  const validatedField = RegisterSchema.safeParse(values);
  if (!validatedField.success) {
    return {
      error: "Invalid input",
    };
  }
  const { email, fullName, password } = validatedField.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      error: "Email already exists!",
    };
  }
  const user = await db.user.create({
    data: {
      email,
      name: fullName,
      password: hashedPassword,
    },
  });
  console.log("User created");
  console.log(user);
  const verification = await generateVerificationToken(email);
  await sendVerificationEmail(email, verification.token);
  return {
    success: "Email sent",
  };
};
