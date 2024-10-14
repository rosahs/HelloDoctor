'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar } from "@/components/ui/calendar"

export default function DoctorReservePage({ params }: { params: { doctorId: string } }) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mock appointment - replace with an actual API call)
    console.log('Booking appointment:', {
      doctorId: params.doctorId,
      date: date?.toISOString(),
      time,
      reason,
    });

    // Redirect to the success page after booking
    router.push(`/doctors/[id]/success?doctorId=${params.doctorId}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-3xl">
        <h2 className="text-5xl font-bold mb-8 text-center">Reserve an Appointment</h2>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-16 pt-12 pb-14 mb-8">
          
          {/* Doctor Information Section */}
          <div className="text-center mb-10">
            <Image
              src="/images/placeholder-doctor-image.jpg" // Replace with actual dynamic image URL
              alt="Doctor's Image"
              width={150}
              height={150}
              className="mx-auto mb-4"
            />
            <h3 className="text-3xl font-bold">Dr. John Doe</h3> {/* Replace with dynamic name */}
            <p className="text-2xl text-gray-600">Cardiologist</p> {/* Replace with dynamic specialty */}
            <p className="mt-4 text-lg text-gray-600">
              Dr. John Doe is an experienced cardiologist with over 20 years of expertise in treating heart diseases.
            </p>
          </div>

          {/* Calendar */}
          <div className="mb-8">
            <label className="block text-gray-700 text-3xl font-bold mb-4">Select Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>

          {/* Date Input */}
          <div className="mb-8">
            <label className="block text-gray-700 text-3xl font-bold mb-4">Date</label>
            <input
              type="date"
              value={date ? date.toISOString().split('T')[0] : ''}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="shadow appearance-none border rounded-lg w-full py-6 px-6 text-2xl text-gray-700 leading-tight 
                         focus:outline-none focus:shadow-outline cursor-pointer 
                         hover:bg-gray-100 focus:bg-white transition-colors duration-200"
              required
            />
          </div>

          {/* Time Input */}
          <div className="mb-8">
            <label className="block text-gray-700 text-3xl font-bold mb-4">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-6 px-6 text-2xl text-gray-700 leading-tight 
                         focus:outline-none focus:shadow-outline cursor-pointer 
                         hover:bg-gray-100 focus:bg-white transition-colors duration-200"
              required
            />
          </div>

          {/* Reason for Visit */}
          <div className="mb-8">
            <label className="block text-gray-700 text-3xl font-bold mb-4">Reason for Visit</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-6 px-6 text-2xl text-gray-700 leading-tight 
                         focus:outline-none focus:shadow-outline 
                         hover:bg-gray-100 focus:bg-white transition-colors duration-200"
              placeholder="Enter the reason for your visit"
              rows={5}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-700 text-white text-3xl font-bold py-5 px-12 rounded-lg 
                         focus:outline-none focus:shadow-outline transition duration-300"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}