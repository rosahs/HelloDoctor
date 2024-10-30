"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar } from "@/components/ui/calendar";
import 'react-calendar/dist/Calendar.css';
import { useSession } from "next-auth/react";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  imageUrl: string;
  aboutMe: string;
}

type CalendarValue = Date | [Date | null, Date | null] | null;

export default function DoctorReservePage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const doctorId = typeof params?.id === 'string' ? params.id : undefined;
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState<CalendarValue>(null);
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (doctorId) {
      fetch(`/api/doctors/${doctorId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch');
          }
          return res.json();
        })
        .then((data: Doctor) => {
          setDoctor(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch doctor:', error);
          setLoading(false);
        });
    }
  }, [doctorId]);

  const handleDateChange = (value: CalendarValue) => {
    setDate(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const userId = session?.user?.id; 
    if (!doctor?.id || !date || !(date instanceof Date) || !userId) {
      console.error("Doctor ID, valid date, or user ID is missing!");
      return;
    }
  
    try {
      const response = await fetch(`/api/doctors/${doctor.id}/reserve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: doctor.id,
          userId, 
          date: date.toISOString(),
          time,
          reason,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to book appointment:', errorData);
        throw new Error('Failed to book appointment');
      }
  
      router.push(`/doctors/profile/${doctor.id}/reserve/success?date=${encodeURIComponent(date.toISOString())}&time=${encodeURIComponent(time)}`);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  if (loading) {
    return <p className="text-center text-black">Loading...</p>;
  }

  if (!doctor) {
    return <p className="text-center text-red-500">Doctor not found!</p>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
      {/* Doctor Info */}
      <div className="relative flex flex-col items-center text-center mb-8 sm:mb-12 lg:mb-16 w-full max-w-lg">
        <div className="border-2 border-gray-300 rounded-full overflow-hidden mb-4 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
          <Image
            src={doctor.imageUrl || "/images/placeholder-doctor-image.jpg"}
            alt={doctor.name}
            width={150}
            height={150}
            className="object-cover"
            unoptimized
            priority
          />
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--primary-color)]">{doctor.name}</h3>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700">{doctor.specialization}</p>
        <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-600 max-w-md px-2 sm:px-0">
          {doctor.aboutMe || 'No additional information available.'}
        </p>
      </div>

      {/* Reservation Form */}
      <div className="w-full max-w-lg bg-[var(--secondary-color)] p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-black text-center">Reserve an Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg sm:text-xl font-semibold text-black mb-2">Select Date</label>
            <div className="bg-gray-300 rounded-md border p-3">
              <Calendar
                onChange={handleDateChange}
                value={date}
                className="mx-auto"
              />
            </div>
          </div>
          <div>
            <label className="block text-lg sm:text-xl font-semibold text-black mb-2">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-[var(--primary-color)]"
              required
            />
          </div>
          <div>
            <label className="block text-lg sm:text-xl font-semibold text-black mb-2">Reason for Visit</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-[var(--primary-color)]"
              placeholder="Enter the reason for your visit"
              rows={3}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-[var(--primary-color)] text-white hover:bg-blue-800 text-lg sm:text-xl lg:text-2xl font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 active:translate-y-0.5"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}