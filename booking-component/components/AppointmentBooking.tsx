'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AppointmentBooking({ doctorId }: { doctorId: string }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId, date, time }),
      });

      if (response.ok) {
        alert('Appointment booked successfully!');
        router.push('/appointments');
      } else {
        throw new Error('Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Book an Appointment</h2>
      <div className="mb-4">
        <label htmlFor="date" className="block mb-1">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block mb-1">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Book Appointment
      </button>
    </form>
  );
}       