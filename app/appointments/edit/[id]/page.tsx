// app/appointments/edit/[id]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Appointment {
  id: string;
  doctorName: string;
  date: string;
  time: string;
}

export default function EditAppointmentPage() {
  const router = useRouter();
  const { id } = useParams();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    // Fetch the appointment data by ID
    fetch(`/api/appointments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAppointment(data);
        setDoctorName(data.doctorName);
        setDate(data.date);
        setTime(data.time);
      })
      .catch((error) => console.error("Failed to load appointment", error));
  }, [id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctorName, date, time }),
      });

      if (response.ok) {
        router.push("/appointments");
      } else {
        console.error("Failed to update appointment");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  if (!appointment) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative min-h-screen">
      <div className="relative container mx-auto px-4 py-8">
        <div className="bg-[var(--secondary-color)] rounded-lg p-8 backdrop-blur-sm">
          <h1 className="text-3xl font-bold mb-6 text-[var(--primary-color)]">Edit Appointment</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="mb-4">
              <label className="block text-xl font-bold text-[var(--primary-color)]">
                Doctor&#39;s Name
              </label>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-lg py-3 px-4 text-2xl h-12"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl font-bold text-[var(--primary-color)]">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-lg py-3 px-4 text-2xl h-12"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl font-bold text-[var(--primary-color)]">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-lg py-3 px-4 text-2xl h-12"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-[var(--primary-color)] hover:bg-custom-green text-white px-6 py-3 rounded text-2xl transition-colors"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}