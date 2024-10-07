import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";

import { Profile } from "next-auth";
import { Account } from "next-auth";

export const saveOAuthUser = async (
  profile: Profile,
  account: Account
) => {
  try {
    await connectDB();

    const { name, email, picture } = profile;
    const { providerAccountId } = account;
    // Check if the user already exists
    let user = await User.findOne({ email }).exec();

    if (!user) {
      // If the user doesn't exist, create a new one
      user = await User.create({
        name,
        email,
        profileImage: picture,
        authProviderId: providerAccountId,
        accounts: [account],
      });
    } else {
      // Check if the user signed up with email/password
      if (user.password) {
        // User exists with email/password => prevent OAuth sign-in
        return {
          error:
            "This email is already registered with a password. Please log in with your password.",
        };
      }

      // If the user exists, update their information
      user.name = name;
      user.profileImage = picture;
      user.authProviderId = providerAccountId;

      // Add the new account if it doesn't exist
      const accountExists = user.accounts.some(
        (acc: Account) =>
          acc.provider === account.provider &&
          acc.providerAccountId ===
            account.providerAccountId
      );
      if (!accountExists) {
        user.accounts.push(account);
      }

      await user.save();
    }

    return user;
  } catch (error) {
    throw error;
  }
};
