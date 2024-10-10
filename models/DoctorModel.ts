import mongoose, { Schema, Document, model } from 'mongoose';

interface IDoctor extends Document {
  name: string;
  specialization: string;
  image?: string; 
}

const DoctorSchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  image: { type: String },
}, { timestamps: true });

export const DoctorModel = mongoose.models.Doctor || model<IDoctor>('Doctor', DoctorSchema);