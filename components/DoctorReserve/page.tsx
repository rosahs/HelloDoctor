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
        <h2 className="text-5xl font-bold mb-10">Reserve an Appointment</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-14 pt-12 pb-14 mb-10">
          <div className="mb-10">
            <label className="block text-gray-700 text-2xl font-bold mb-6">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-6 px-6 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-2xl font-bold mb-6">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-6 px-6 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-2xl font-bold mb-6">Reason for Visit</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-6 px-6 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter the reason for your visit"
              rows={6}
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-800 text-white text-3xl font-bold py-6 px-10 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}