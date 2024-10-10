import mongoose, {
  Schema,
  Document,
  model,
} from "mongoose";

interface IDoctor extends Document {
  specialization: string;
  images?: string[];
  aboutMe?: string;
  specialties?: string[];
  certifications?: string[];
  professionalExperience?: string[];
  languages?: { language: string; fluency: string }[];
}

const DoctorSchema = new Schema<IDoctor>(
  {
    specialization: {
      type: String,
      required: true,
    },
    images: { type: [String] },
    aboutMe: { type: String },
    specialties: { type: [String] },
    certifications: { type: [String] },
    professionalExperience: { type: [String] },
    languages: [
      {
        language: { type: String },
        fluency: { type: String },
      },
    ],
  },

  { timestamps: true }
);

const Doctor =
  mongoose.models?.Doctor ||
  model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;
