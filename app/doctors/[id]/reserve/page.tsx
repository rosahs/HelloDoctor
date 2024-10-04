// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import AppointmentBooking from '@/components/AppointmentBooking';

// interface Doctor {
//     id: string;
//     name: string;
//     title: string;
//     specialty: string;
//     yearsOfExperience: number;
//     focusArea: string;
// }

// export default function DoctorReservePage() {
//   const params = useParams();
//   const doctorId = params.id as string;
//   const [doctor, setDoctor] = useState<Doctor | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchDoctorInfo() {
//       try {
//         const response = await fetch(`/api/doctors/${doctorId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch doctor info');
//         }
//         const data = await response.json();
//         setDoctor(data);
//       } catch (error) {
//         console.error('Error fetching doctor info:', error);
//         setDoctor(null);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDoctorInfo();
//   }, [doctorId]);

//   if (loading) {
//     return <p>Loading doctor information...</p>;
//   }

//   if (!doctor) {
//     return <p>Error loading doctor information. Please try again later.</p>;
//   }

//   return (
//     <div className="max-w-md mx-auto bg-blue-50 min-h-screen p-4">
//       <h1 className="text-2xl font-bold mb-4">Book Appointment with {doctor.name}</h1>
//       <AppointmentBooking 
//         doctorId={doctor.id.toString()}
//         doctorName={doctor.name}
//         doctorSpecialty={doctor.specialty}
//         doctorExperience={`${doctor.yearsOfExperience} years`}
//         doctorFocus={doctor.focusArea}
//       />
//     </div>
//   );
// }