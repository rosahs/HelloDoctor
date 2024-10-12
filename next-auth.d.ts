import { type DefaultSession } from "next-auth";
import { UserRole } from "./lib/userRole";

export type Doctor = {
  id: string;
  specialization: string;
  images: string[];
  specialties: string[];
  certifications: string[];
  professionalExperience: string[];
  languages: string[];
  createdAt: string;
  updatedAt: string;
};

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  profileImage?: string;
  doctor: Doctor;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
