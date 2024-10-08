import mongoose, { Schema, Document, model } from 'mongoose';

interface IAppointment extends Document {
  doctorId: mongoose.Schema.Types.ObjectId; 
  userId: string; 
  date: Date;
  time: string;
  status: "scheduled" | "pending" | "cancelled";
  reason?: string;
  note?: string;
  cancellationReason?: string;
}

const AppointmentSchema = new Schema<IAppointment>({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ["scheduled", "pending", "cancelled"], required: true },
  reason: { type: String },
  note: { type: String },
  cancellationReason: { type: String },
}, { timestamps: true });

export const AppointmentModel = mongoose.models.Appointment || model<IAppointment>('Appointment', AppointmentSchema);