import { UserRole } from "@/lib/userRole";
import mongoose, {
  Schema,
  model,
  Document,
} from "mongoose";

export interface Account {
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  emailVerified: Date | null;
  profileImage: string | null;
  password: string | null;
  role: string | null;
  accounts: Account[];
  isTwoFactorEnabled: boolean;
  twoFactorConfirmation?: mongoose.Types.ObjectId;
  authProviderId?: string;
  doctor?: mongoose.Types.ObjectId;
}

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
      required: function (this: UserDocument) {
        return this.authProviderId === undefined;
      },
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: null,
    },
    isTwoFactorEnabled: { type: Boolean, default: false },
    twoFactorConfirmation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TwoFactorConfirmation",
    },
    authProviderId: { type: String },
    accounts: [{ type: Object }],
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  },
  { timestamps: true }
);

// Middleware to delete TwoFactorConfirmation when User is deleted
UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const user = this as UserDocument;
    await mongoose
      .model("TwoFactorConfirmation")
      .deleteOne({ userId: user._id });
    next();
  }
);

const User =
  mongoose.models?.User ||
  model<UserDocument>("User", UserSchema);

export default User;
