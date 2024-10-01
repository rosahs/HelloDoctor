import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

// VerificationToken Interface
export interface VerificationTokenDocument
  extends Document {
  email: string;
  token: string;
  expires: Date;
}

// PasswordResetToken Interface
export interface PasswordResetTokenDocument
  extends Document {
  email: string;
  token: string;
  expires: Date;
}

// TwoFactorToken Interface
export interface TwoFactorTokenDocument extends Document {
  email: string;
  token: string;
  expires: Date;
}

// TwoFactorConfirmation Interface
export interface TwoFactorConfirmationDocument
  extends Document {
  userId: mongoose.Types.ObjectId;
}

// VerificationToken Schema
const VerificationTokenSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  expires: { type: Date, required: true },
});

// Compound unique index for email and token
VerificationTokenSchema.index(
  { email: 1, token: 1 },
  { unique: true }
);

// PasswordResetToken Schema
const PasswordResetTokenSchema: Schema = new Schema({
  email: String,
  token: { type: String, unique: true },
  expires: Date,
});

// Compound unique index for email and token
PasswordResetTokenSchema.index(
  { email: 1, token: 1 },
  { unique: true }
);

// TwoFactorToken Schema
const TwoFactorTokenSchema: Schema = new Schema({
  email: String,
  token: { type: String, unique: true },
  expires: Date,
});

// Compound unique index for email and token
TwoFactorTokenSchema.index(
  { email: 1, token: 1 },
  { unique: true }
);

// TwoFactorConfirmation Schema
const TwoFactorConfirmationSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
});

const VerificationToken: Model<VerificationTokenDocument> =
  mongoose.models?.VerificationToken ||
  mongoose.model<VerificationTokenDocument>(
    "VerificationToken",
    VerificationTokenSchema
  );

const PasswordResetToken: Model<PasswordResetTokenDocument> =
  mongoose.models?.PasswordResetToken ||
  mongoose.model<PasswordResetTokenDocument>(
    "PasswordResetToken",
    PasswordResetTokenSchema
  );

const TwoFactorToken: Model<TwoFactorTokenDocument> =
  mongoose.models?.TwoFactorToken ||
  mongoose.model<TwoFactorTokenDocument>(
    "TwoFactorToken",
    TwoFactorTokenSchema
  );

const TwoFactorConfirmation: Model<TwoFactorConfirmationDocument> =
  mongoose.models?.TwoFactorConfirmation ||
  mongoose.model<TwoFactorConfirmationDocument>(
    "TwoFactorConfirmation",
    TwoFactorConfirmationSchema
  );

// Exporting the models
export {
  VerificationToken,
  PasswordResetToken,
  TwoFactorToken,
  TwoFactorConfirmation,
};
