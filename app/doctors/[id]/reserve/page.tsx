"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar } from "@/components/ui/calendar";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  imageUrl: string;
  aboutMe: string;
}

export default function DoctorReservePage() {
  const router = useRouter();
  const params = useParams();
  const doctorId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);

  console.log('Doctor ID:', doctorId);

  useEffect(() => {
    if (doctorId) {
      fetch(`/api/doctors/${doctorId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch');
          }
          return res.json();
        })
        .then((data) => {
          console.log('Fetched Doctor:', data); // Debugging step
          setDoctor(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch doctor:', error);
          setLoading(false);
        });
    }
  }, [doctorId]);

  const handleDateChange = (value: Date | Date[]) => {
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
      setDate(value[0]);
    } else {
      setDate(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor?.id) {
      console.error("Doctor ID is missing!");
      return;
    }

    try {
      const response = await fetch(`/api/doctors/[id]/reserve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: doctor.id,
          date: date?.toISOString(),
          time,
          reason,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      console.log('Booking appointment:', { doctorId: doctor.id, date: date?.toISOString(), time, reason });
      router.push(`/doctors/${doctor.id}/reserve/success`);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (!doctor) {
    return <p className="text-center text-red-500">Doctor not found!</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4 relative">
      <div className="absolute inset-0 z-0">
        {/* Background image if needed */}
      </div>
      <div className="w-full max-w-2xl relative z-10 bg-black rounded-lg shadow-xl overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white text-center pt-6">Reserve an Appointment</h2>
          <form onSubmit={handleSubmit} className="rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="text-center mb-6">
              <Image
                src={doctor.imageUrl || "/images/placeholder-doctor-image.jpg"}
                alt={doctor.name}
                width={150}
                height={150}
                className="mx-auto mb-2"
                unoptimized
                priority
              />
              <h3 className="text-2xl text-green-600 font-bold">{doctor.name}</h3>
              <p className="text-xl text-white">{doctor.specialization}</p>
              <p className="mt-2 text-md text-gray-500">{doctor.aboutMe}</p>
            </div>
            <div className="mb-4">
              <label className="block text-white text-xl font-bold mb-2">Select Date</label>
              <div className="bg-gray-200 rounded-md border p-3">
                <Calendar
                  value={date}
                  onChange={handleDateChange}
                  className="mx-auto"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-white text-xl font-bold mb-2">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="shadow appearance-none cursor-pointer border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-xl font-bold mb-2">Reason for Visit</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter the reason for your visit"
                rows={3}
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-green-600 hover:bg-blue-800 text-white text-xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}