import { type DefaultSession } from "next-auth";
import { UserRole } from "./lib/userRole";

export type Doctor = {
  id: string;
  specialization: string;
  aboutMe?: string;
  images?: string;
  specialties?: string;
  certifications?: string;
  professionalExperience?: string;
  languages?: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  user?: [];
};

export type Patient = {
  id: string;
  country: string | null;
  city: string | null;
  savedDoctors: string[];
  userId?: string;
  user?: [];
};

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  doctorId?: string;
  patientId?: string;
  doctor?: Doctor;
  patient?: Patient;
  conversationIds: string[];
  seenMessageIds: string[];
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
