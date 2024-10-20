'use server'

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { doctorId, date, time, reason } = await request.json();

        if (!doctorId || !date || !time) {
            return NextResponse.json(
                { error: 'Missing required fields: doctorId, date, and time are required.' },
                { status: 400 }
            );
        }

        // Create the appointment in the database
        const appointment = await prisma.appointment.create({
            data: {
                doctorId,
                date: new Date(date),
                time,
                reason,
            },
        });

        return NextResponse.json(
            { message: 'Appointment successfully booked!', appointment },
            { status: 201 }
        );
    } catch (error) {
        console.error('Failed to create appointment:', error);
        return NextResponse.json(
            { error: 'Failed to create appointment' },
            { status: 500 }
        );
    }
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Calendar from 'react-calendar'; 
// import 'react-calendar/dist/Calendar.css'; 

// export default function DoctorReservePage() {
//   const router = useRouter();
//   const params = useParams();
//   const [doctorId, setDoctorId] = useState<string | undefined>(undefined);
//   const [date, setDate] = useState<Date | null>(null); // Update the type to handle react-calendar's value
//   const [time, setTime] = useState('');
//   const [reason, setReason] = useState('');

//   // Example doctor data
// const [doctorInfo] = useState({
//     name: 'Dr. John Doe',
//     specialty: 'Cardiologist',
//     experience: '20+ years in treating heart diseases',
//     imageUrl: '/images/placeholder-doctor-image.jpg',
//   });

//   // Fetch doctor data dynamically if needed
//   useEffect(() => {
//     const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
//     setDoctorId(id || '');

//     // Example of how you might fetch doctor data based on the ID
//     if (id) {
//       // Replace with actual API call to fetch doctor data
//       console.log(`Fetching doctor info for doctor ID: ${id}`);
//       // Example API fetch:
//       // fetch(`/api/doctors/${id}`)
//       //   .then((response) => response.json())
//       //   .then((data) => setDoctorInfo(data));
//     }
//   }, [params?.id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!doctorId) {
//       console.error('Doctor ID is missing!');
//       return;
//     }

//     console.log('Booking appointment:', { doctorId, date: date?.toISOString(), time, reason });
//     router.push(`/doctors/${doctorId}/reserve/success`);
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center p-4">
//       <div className="w-full max-w-2xl">
//         <h2 className="text-4xl font-bold mb-6 text-center">Reserve an Appointment</h2>
//         <form onSubmit={handleSubmit} className="rounded-lg px-8 pt-6 pb-8 mb-4">
//           <div className="text-center mb-6">
//             <Image src={doctorInfo.imageUrl} alt="Doctor's Image" width={100} height={100} className="mx-auto mb-2" />
//             <h3 className="text-2xl font-bold">{doctorInfo.name}</h3>
//             <p className="text-xl text-gray-600">{doctorInfo.specialty}</p>
//             <p className="mt-2 text-sm text-gray-600">{doctorInfo.experience}</p>
//           </div>
//           {/* Date Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-xl font-bold mb-2">Select Date</label>
//             <Calendar
//               onChange={(value) => {
//                 if (value instanceof Date) {
//                   setDate(value);
//                 } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
//                   setDate(value[0]);
//                 }
//               }}
//               value={date}
//               className="w-full border rounded-md p-2"
//             />
//           </div>
//           {/* Time Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-xl font-bold mb-2">Time</label>
//             <input
//               type="time"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//               className="shadow appearance-none cursor-pointer border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           {/* Reason for Visit */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-xl font-bold mb-2">Reason for Visit</label>
//             <textarea
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Enter the reason for your visit"
//               rows={3}
//               required
//             />
//           </div>
//           {/* Submit Button */}
//           <div className="flex items-center justify-center">
//             <button
//               type="submit"
//               className="bg-green-700 hover:bg-green-600 text-white text-xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Book Appointment
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }