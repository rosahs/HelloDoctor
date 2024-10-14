'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for the app router

export default function DoctorReservePage({ params }: { params: { doctorId: string } }) {
  const router = useRouter(); // Use next/navigation's useRouter
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here, add logic to handle booking the appointment, e.g., call an API.
    console.log('Booking appointment:', {
      doctorId: params.doctorId,
      date,
      time,
      reason,
    });

    // After booking, you can navigate to a success page or back to the doctor's profile
    router.push(`/doctors/${params.doctorId}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Reserve an Appointment</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Reason for Visit</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter the reason for your visit"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}