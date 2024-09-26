import mongoose from "mongoose";
import Specialization from '../models/Specializations.js';
import dotenv from "dotenv";

dotenv.config();

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env file in the project root
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const MONGO_URI=process.env.MONGO_URI;

if (!MONGO_URI) {
    console.log("MONGO_URI is not defined");
    process.exit(1);
}

mongoose.connect(MONGO_URI).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);
})

const seedSpecializations = [
    {
        name:"Cardiologist",
        icon:"https://cdn-icons-png.flaticon.com/512/1006/1006581.png"
    },
    {
        name:"Dermatologist",
        icon:"https://cdn-icons-png.flaticon.com/512/1006/1006581.png"
    },
    {
        name:"Pediatrician",
        icon:"https://cdn-icons-png.flaticon.com/512/1006/1006581.png"
    },
    {
        name:"Dentist",
        icon:"https://cdn-icons-png.flaticon.com/512/1006/1006581.png"
    },
];

// Function to seed the database
const seedDB = async () => {
    try {
      console.log('Deleting existing specializations...');
      const deleteResult = await Specialization.deleteMany({});
      console.log(`Deleted ${deleteResult.deletedCount} specializations`);
  
      console.log('Inserting new specializations...');
      const insertResult = await Specialization.insertMany(seedSpecializations);
      console.log(`Inserted ${insertResult.length} specializations`);
  
      // Verify the insertion
      const count = await Specialization.countDocuments();
      console.log(`Total specializations in database: ${count}`);
  
    } catch (error) {
      console.error('Error seeding specializations:', error);
    } finally {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  };

  seedDB();