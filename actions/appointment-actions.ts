"use server";

import { revalidatePath } from "next/cache";
import mongoose, { Schema, Document, model } from "mongoose";
import { formatDateTime, parseStringify } from "@/lib/utils";

// Define the schema for appointments
export const appointmentSchema = new Schema({
  userId: { type: String, required: true },
  status: { type: String, enum: ["scheduled", "pending", "cancelled"], required: true },
  schedule: { type: Date },
  primaryPhysician: { type: String, required: false },
  cancellationReason: { type: String, required: false },
}, { timestamps: true });

// Function to get an appointment by ID
export async function getAppointmentById(appointmentId: string) {
  try {
    const appointment = await AppointmentModel.findById(appointmentId);
    return parseStringify(appointment);
  } catch (error) {
    console.error("An error occurred while fetching the appointment:", error);
    return null;
  }
}

// Create the model for appointments
const AppointmentModel = mongoose.models.Appointment || model("Appointment", appointmentSchema);

// CREATE APPOINTMENT
export const createAppointment = async (appointmentData: Partial<Document & { userId: string; status: string; schedule: Date; primaryPhysician: string; cancellationReason?: string }>) => {
  try {
    const newAppointment = await AppointmentModel.create(appointmentData);

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};

// GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await AppointmentModel.find().sort({ createdAt: -1 });

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = appointments.reduce((acc, appointment) => {
      switch (appointment.status) {
        case "scheduled":
          acc.scheduledCount++;
          break;
        case "pending":
          acc.pendingCount++;
          break;
        case "cancelled":
          acc.cancelledCount++;
          break;
      }
      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.length,
      ...counts,
      documents: appointments,
    };

    return parseStringify(data);
  } catch (error) {
    console.error("An error occurred while retrieving the recent appointments:", error);
  }
};

// UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: {
  appointmentId: string;
  userId: string;
  timeZone: string;
  appointment: Partial<Document & { schedule?: Date; primaryPhysician?: string; cancellationReason?: string }>;
  type: "schedule" | "cancel";
}) => {
  try {
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      appointmentId,
      appointment,
      { new: true }
    );

    if (!updatedAppointment) throw new Error("Appointment not found");

    const smsMessage = `Greetings from CarePulse. ${
      type === "schedule"
        ? `Your appointment is confirmed for ${formatDateTime(
            appointment.schedule!,
            timeZone
          ).dateTime} with Dr. ${appointment.primaryPhysician}`
        : `We regret to inform that your appointment for ${formatDateTime(
            appointment.schedule!,
            timeZone
          ).dateTime} is cancelled. Reason: ${appointment.cancellationReason}`
    }.`;

    // await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
  }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await AppointmentModel.findById(appointmentId);
    return parseStringify(appointment);
  } catch (error) {
    console.error("An error occurred while retrieving the existing patient:", error);
  }
};

// SEND SMS NOTIFICATION
// This part would depend on which SMS service you're using with Node.js. For example, Twilio:
// import twilio from 'twilio';

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// export const sendSMSNotification = async (userId: string, content: string) => {
//   try {
//     const message = await client.messages.create({
//       body: content,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: userId, // Ensure userId is the phone number in the correct format
//     });

//     return parseStringify(message);
//   } catch (error) {
//     console.error("An error occurred while sending sms:", error);
//   }
// };

// SEND SMS NOTIFICATION
// This part would depend on which SMS service you're using with Node.js. For example, Twilio:
// import twilio from 'twilio';

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// export const sendSMSNotification = async (userId: string, content: string) => {
//   try {
//     const message = await client.messages.create({
//       body: content,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: userId, // Ensure userId is the phone number in the correct format
//     });

//     return parseStringify(message);
//   } catch (error) {
//     console.error("An error occurred while sending sms:", error);
//   }
// };