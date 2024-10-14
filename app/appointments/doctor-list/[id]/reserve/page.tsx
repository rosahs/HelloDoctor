'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DoctorReservePage({ params }: { params: { doctorId: string } }) {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking appointment:', {
      doctorId: params.doctorId,
      date,
      time,
      reason,
    });
    router.push(`/doctors/${params.doctorId}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-3xl">
        <h2 className="text-5xl font-bold mb-8">Reserve an Appointment</h2> {/* Updated text size */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-16 pt-12 pb-14 mb-8">
          <div className="mb-8">
            <label className="block text-gray-700 text-3xl font-bold mb-4">Date</label> {/* Updated text size */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-6 px-6 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-3xl font-bold mb-4">Time</label> {/* Updated text size */}
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-6 px-6 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-3xl font-bold mb-4">Reason for Visit</label> {/* Updated text size */}
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-6 px-6 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter the reason for your visit"
              rows={5}
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white text-3xl font-bold py-5 px-12 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}