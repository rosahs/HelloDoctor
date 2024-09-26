// models/Doctor.js
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  location: { type: String, required: true },
  contactInfo: { type: String, required: true },
  profilePage: { type: String, required: true },
  profilePicture: { type: String, required: true },
  availableSlots: [
    {
      date: { type: Date, required: true },
      times: [String],
    },
  ],
  ratings: [
    {
      patient: String,
      rating: Number,
      comment: String,
    },
  ],
});

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
export default Doctor;