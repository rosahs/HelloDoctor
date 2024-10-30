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
    return <p className="text-center text-white">Loading...</p>;
  }

  if (!doctor) {
    return <p className="text-center text-red-500">Doctor not found!</p>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Doctor info overlay */}
      <div className="relative z-10 h-[40vh] flex flex-col items-center justify-center px-4 sm:px-0">
        <div className="text-center">
          <div className="inline-block border-2 border-white overflow-hidden rounded-full">
            <Image
              src={doctor.imageUrl || "/images/placeholder-doctor-image.jpg"}
              alt={doctor.name}
              width={150}
              height={150}
              className="mx-auto rounded-full sm:w-48 sm:h-48"
              unoptimized
              priority
            />
          </div>
          <h3 className="text-2xl sm:text-3xl text-[var(--primary-color)] font-bold mt-4">{doctor.name}</h3>
          <p className="text-xl sm:text-2xl mb-4 text-black">{doctor.specialization}</p>
          <p className="mt-2 text-sm sm:text-md mb-20 text-black px-2">{doctor.aboutMe}</p>
        </div>
      </div>
      {/* Reservation form overlay */}
      <div className="relative z-10 -mt-10 sm:-mt-20 px-4 sm:px-8 pb-8">
        <div className="max-w-2xl mx-auto bg-[var(--secondary-color)] p-6 sm:p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-black text-center">Reserve an Appointment</h2>
          <form onSubmit={handleSubmit} className="rounded-lg">
            <div className="mb-4">
              <label className="block text-black text-lg sm:text-xl font-bold mb-2">Select Date</label>
              <div className="bg-gray-300 rounded-md border p-3 mt-4">
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  className="mx-auto"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-black text-lg sm:text-xl font-bold mb-2">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="shadow appearance-none cursor-pointer border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-black text-lg sm:text-xl font-bold mb-2">Reason for Visit</label>
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
                className="bg-[var(--primary-color)] text-white hover:bg-blue-800 text-lg sm:text-2xl font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 active:translate-y-0.5 active:shadow-inner"
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