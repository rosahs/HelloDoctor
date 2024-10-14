'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar } from "@/components/ui/calendar";

export default function DoctorReservePage() {
  const router = useRouter();
  const params = useParams();
  const [doctorId, setDoctorId] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  // Check if params contain a valid doctorId
  useEffect(() => {
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
    console.log('Doctor ID:', id);
    setDoctorId(id || '');
  }, [params?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorId) {
      console.error("Doctor ID is missing!");
      return;
    }

    console.log('Booking appointment:', { doctorId, date: date?.toISOString(), time, reason });
    router.push(`/doctors/${doctorId}/reserve/success`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl font-bold mb-6 text-center">Reserve an Appointment</h2>
        <form onSubmit={handleSubmit} className="rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="text-center mb-6">
            <Image src="/images/placeholder-doctor-image.jpg" alt="Doctor's Image" width={100} height={100} className="mx-auto mb-2" />
            <h3 className="text-2xl font-bold">Dr. John Doe</h3>
            <p className="text-xl text-gray-600">Cardiologist</p>
            <p className="mt-2 text-sm text-gray-600">Experienced cardiologist with 20+ years in treating heart diseases.</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-bold mb-2">Select Date</label>
            <Calendar mode="single" selected={date} onSelect={setDate} className="bg-white rounded-md border" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-bold mb-2">Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
              className="shadow appearance-none cursor-pointer border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-xl font-bold mb-2">Reason for Visit</label>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter the reason for your visit" rows={3} required />
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-green-700 hover:bg-green-600 text-white text-xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}