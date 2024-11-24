import * as z from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, {
      message: "User Name should have at-least 2 characters",
    })
    .max(50, {
      message: "User Name shouldn't exceed more than 50 characters",
    }),
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(5, {
      message: "Password should have at-least 5 characters",
    })
    .max(50, {
      message: "Password shouldn't exceed more than 50 characters",
    }),
});

export type signUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z
    .string()
    .trim()
    .min(5, {
      message: "Password should have at-least 5 characters",
    })
    .max(50, {
      message: "Password shouldn't exceed more than 50 characters",
    }),
});

export type loginSchema = z.infer<typeof loginSchema>;
