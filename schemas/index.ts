import { UserRole } from "@/lib/userRole";
import * as z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.string().email({
      message: "email is required",
    }),
    password: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
    passwordConfirm: z.string().min(8, {
      message: "Password confirmation is required",
    }),
    role: z.enum(
      Object.values(UserRole) as [string, ...string[]]
    ),
  })
  .refine(
    (data) => data.password === data.passwordConfirm,
    {
      message: "Passwords don't match",
      path: ["passwordConfirm"],
    }
  );

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});
