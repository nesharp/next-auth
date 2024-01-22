import * as z from "zod";

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

