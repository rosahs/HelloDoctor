// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Doctor from './models/Doctors.js';
import Appointment from './models/Appointments.js';
import patient from './models/Patients.js';


// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// CORS setup 
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], 
  credentials: true
}));

// MongoDB URI (from environment variables)
const mongoUri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoUri) 
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const newDoctor = new Doctor({
  name: 'Dr. John Doe',
  specialization: 'Cardiologist',
  location: '1234 Main St, Anytown, USA',
  contactInfo: 'john.doe@example.com',
  profilePage: 'https://www.johndoe.com',
  profilePicture: 'https://www.johndoe.com/profile.jpg',
  availableSlots: [],
});

const newAppointment = new Appointment({
  doctorId: newDoctor._id,
  patientName: 'Jane Doe',
  patientEmail: 'jane.doe@example.com',
  patientPhone: '555-1234',
  appointmentDate: new Date('2024-01-01'),
  appointmentTime: '10:00 AM',
});

const newpatient = new patient({
  patientname: 'johndoe',
  password: 'password123',
  appointments: [newAppointment._id],
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});