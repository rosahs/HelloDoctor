import { type DefaultSession } from "next-auth";
import { UserRole } from "./lib/userRole";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
