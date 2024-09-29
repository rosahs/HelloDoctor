import { UserRole } from "@/lib/userRole";
import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  profileImage: string | null;
  password: string | null;
  role: string;
  accounts: {
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
  }[];
  isTwoFactorEnabled: boolean;
  twoFactorConfirmation?: mongoose.Types.ObjectId;
}

// User Schema
const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    emailVerified: { type: Date, default: null },
    profileImage: String,
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(UserRole),
    },
    accounts: [
      {
        type: { type: String },
        provider: String,
        providerAccountId: String,
        refresh_token: String,
        access_token: String,
        expires_at: Number,
        token_type: String,
        scope: String,
        id_token: String,
        session_state: String,
      },
    ],
    isTwoFactorEnabled: { type: Boolean, default: false },
    twoFactorConfirmation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TwoFactorConfirmation",
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models?.User ||
  model<UserDocument>("User", UserSchema);

export default User;
