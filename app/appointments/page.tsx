"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Calendar, Clock, User } from 'lucide-react';

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
        <div className="bg-[var(--secondary-color)] rounded-lg p-8 shadow-xl">
          <h1 className="text-3xl text-[var(--primary-color)] font-bold mb-8">My Appointments</h1>
          {appointments.length === 0 ? (
            <p className="text-gray-600 text-center text-xl">No appointments found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-6 h-6 text-[var(--primary-color)]" />
                      <span className="text-lg font-semibold text-[var(--primary-color)]">
                        {appointment.doctorName || "Unknown Doctor"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-6 h-6 text-gray-600" />
                      <span className="text-gray-700">{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-6 h-6 text-gray-600" />
                      <span className="text-gray-700">{appointment.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-6">
                    <Link href={`/appointments/edit/${appointment.id}`}>
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
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