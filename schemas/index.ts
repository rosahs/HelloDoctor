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

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "Minimum of 8 characters required",
    }),
    passwordConfirm: z.string().min(8, {
      message: "Password confirmation is required",
    }),
  })
  .refine(
    (data) => data.password === data.passwordConfirm,
    {
      message: "Passwords don't match",
      path: ["passwordConfirm"],
    }
  );

export const emailChangeSchema = z.object({
  newEmail: z
    .string()
    .email({ message: "Invalid email address" }),
});

export const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine(
    (data) => data.newPassword === data.confirmNewPassword,
    {
      message: "Passwords don't match",
      path: ["confirmNewPassword"],
    }
  );

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum(
      Object.values(UserRole) as [string, ...string[]]
    ),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8)),
    passwordConfirm: z.optional(z.string().min(8)),
  })
  .refine(
    (data) => {
      // Ensure newPassword is present when password is provided
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      // Ensure password is present when newPassword is provided
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      // Ensure passwordConfirm matches newPassword if newPassword is provided
      if (
        data.newPassword &&
        data.passwordConfirm !== data.newPassword
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords don't match!",
      path: ["passwordConfirm"],
    }
  );
