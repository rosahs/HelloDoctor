import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";

export const getUserByEmail = async (email: string) => {
  try {
    await connectDB();
    let user = await User.findOne({ email });

    if (user.role === "DOCTOR")
      user = await user.populate("doctor");

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectDB();

    let user = await User.findById(id);

    if (user.role === "DOCTOR")
      user = await user.populate("doctor");

    return user;
  } catch {
    return null;
  }
};
