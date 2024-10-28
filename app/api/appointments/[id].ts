// pages/api/appointments/[id].ts

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db"; // or wherever you import Prisma

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { date, time } = req.body;
    const appointmentId = Array.isArray(req.query.id)
      ? req.query.id[0]
      : req.query.id;

    if (!appointmentId) {
      return res
        .status(400)
        .json({ error: "Appointment ID is required" });
    }
    const appointmentExists =
      await db.appointment.findUnique({
        where: { id: appointmentId },
      });

    if (!appointmentExists) {
      res
        .status(404)
        .json({ error: "Appointment not found" });
      return;
    }

    try {
      const updatedAppointment =
        await db.appointment.update({
          where: { id: appointmentId },
          data: {
            date: new Date(date),
            time,
          },
        });
      res.status(200).json(updatedAppointment);
    } catch {
      res
        .status(500)
        .json({ error: "Failed to update appointment" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
