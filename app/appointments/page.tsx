"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Appointment {
  id: string;
  doctorName: string;
  date: string;
  time: string;
}

export default function AppointmentsPage() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (session) {
      // Fetch appointments for the current user
      fetch(`/api/appointments?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => setAppointments(data))
        .catch((error) => console.error("Failed to load appointments", error));
    }
  }, [session]);

  // Function to handle deleting an appointment
  const handleDelete = async (id: string) => {
    const confirmation = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmation) return;

    try {
      const response = await fetch(`/api/appointments?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove the deleted appointment from the list
        setAppointments((prev: Appointment[]) => 
          prev.filter((appt: Appointment) => appt.id !== id)
        );
      } else {
        console.error("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  if (!session) {
    return <p>Please log in to view your appointments.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-gray-200 rounded-lg p-8 backdrop-blur-sm shadow-2xl">
          <h1 className="text-3xl text-black font-bold mb-6">My Appointments</h1>
          {appointments.length === 0 ? (
            <p className="text-white">No appointments found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="aspect-square p-6 text-xl border rounded-lg bg-white shadow-lg flex flex-col justify-between">
                  <div>
                    <p>Doctor: {appointment.doctorName || "Unknown Doctor"}</p>
                    <p>Date: {appointment.date}</p>
                    <p>Time: {appointment.time}</p>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <Link href={`/appointments/edit/${appointment.id}`}>
                      <button className="bg-gray-700 text-xl text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-custom-green text-white text-xl px-4 py-2 rounded hover:bg-green-600 transition-colors"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}