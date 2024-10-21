import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getDoctorById } from "@/data/doctor";
import { getPatientById } from "@/data/patient";
import { getAccountByUserId } from "@/data/account";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request: Request) {
  try {
    const { userId } = await request.json();

    // Check if the user is authenticated
    const user = await currentUser();

    if (!user || user.id !== userId) {
      return NextResponse.json(
        { error: "User not authenticated or wrong userId" },
        { status: 401 }
      );
    }

    const userRecord = await db.user.findUnique({
      where: { id: userId },
    });

    if (!userRecord) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Delete user image from Cloudinary if exists
    if (userRecord.image) {
      const publicId = userRecord.image
        .split("/")
        .pop()
        ?.split(".")[0];
      console.log("Deleting user image:", publicId);
      if (publicId) {
        const result = await cloudinary.uploader.destroy(
          `hello-doctor/${publicId}`
        );
        console.log("Cloudinary delete result:", result);
      }
    }

    // Delete doctor or patient data as applicable
    if (userRecord.doctorId) {
      const doctor = await getDoctorById(
        userRecord.doctorId
      );
      if (doctor && doctor.images) {
        for (const image of doctor.images) {
          const publicId = image
            .split("/")
            .pop()
            ?.split(".")[0];
          console.log("Deleting doctor image:", publicId);
          if (publicId) {
            const result =
              await cloudinary.uploader.destroy(
                `hello-doctor/${publicId}`
              );
            console.log(
              "Cloudinary delete result:",
              result
            );
          }
        }
        await db.doctor.delete({
          where: { id: userRecord.doctorId },
        });
      }
    } else if (userRecord.patientId) {
      const patient = await getPatientById(
        userRecord.patientId
      );
      if (patient) {
        await db.patient.delete({
          where: { id: userRecord.patientId },
        });
      }
    }

    // Delete associated account and the user record
    const account = await getAccountByUserId(userId);
    if (account) {
      await db.account.delete({
        where: { id: account.id },
      });
    }

    // Delete user
    await db.user.delete({ where: { id: userId } });

    revalidatePath("/");

    return NextResponse.json({
      success: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
