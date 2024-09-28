import * as z from "zod";
export const ChangePasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Invalid password",
  }),
});

export const RegisterSchema = z.object({
  fullName: z.string().min(1, {
    message: "Invalid username",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Invalid password",
  }),
});
export const ResetSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});
