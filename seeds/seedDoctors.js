import mongoose from 'mongoose';
import Doctor from '../models/Doctors.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env file in the project root
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

console.log('MONGO_URI:', process.env.MONGO_URI);

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI environment variable is not set');
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


const seedDoctors = [
  {
    name: 'Dr. John Doe',
    specialization: 'Cardiology',
    location: 'New York, NY',
    contactInfo: 'john.doe@example.com',
    profilePage: 'https://example.com/dr-john-doe',
    profilePicture: 'https://example.com/images/john-doe.jpg',
    availableSlots: [
      {
        date: new Date('2023-05-01'),
        times: ['09:00', '10:00', '11:00'],
      },
      {
        date: new Date('2023-05-02'),
        times: ['14:00', '15:00', '16:00'],
      },
    ],
    ratings: [
      {
        patient: 'Patient1',
        rating: 5,
        comment: 'Excellent doctor!',
      },
    ],
  },
  // Add more doctor objects as needed
];

const seedDB = async () => {
  try {
    console.log('Deleting existing doctors...');
    const deleteResult = await Doctor.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} doctors`);

    console.log('Inserting new doctors...');
    const insertResult = await Doctor.insertMany(seedDoctors);
    console.log(`Inserted ${insertResult.length} doctors`);

    // Verify the insertion
    const count = await Doctor.countDocuments();
    console.log(`Total doctors in database: ${count}`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

seedDB();