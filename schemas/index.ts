import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address", 
  }),
  password: z.string(),
});

// export const RegisterSchema = z.object({

// });
