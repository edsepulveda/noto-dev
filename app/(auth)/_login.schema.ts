import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Invalid password" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
