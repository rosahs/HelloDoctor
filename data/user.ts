import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";

export const getUserByEmail = async (email: string) => {
  try {
    await connectDB();
    const user = await User.findOne({ email }).exec();
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectDB();

    const user = await User.findById(id).exec();
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};