// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import DoctorsList from '@/components/DoctorList';
// import { getDoctors } from '@/lib/api/getDoctors';
// import { Doctor } from '@/lib/types'; 

// export default function DoctorProfile({ params }: { params: { id: string } }) {
//   const [doctor, setDoctor] = useState<Doctor | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     getDoctors()
//       .then(data => {
//         if (Array.isArray(data)) {
//           const foundDoctor = data.find(d => d.id.toString() === params.id);
//           if (foundDoctor) {
//             setDoctor(foundDoctor);
//           } else {
//             throw new Error('Doctor not found');
//           }
//         } else {
//           throw new Error('Invalid data format received');
//         }
//         setLoading(false);
//       })
//       .catch(err => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, [params.id]);

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold text-center mb-12">Doctor Profile</h1>
//         <p className="text-center">Loading doctor profile...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold text-center mb-12">Doctor Profile</h1>
//         <p className="text-center text-red-500">Error: {error}</p>
//       </div>
//     );
//   }

//   if (!doctor) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold text-center mb-12">Doctor Profile</h1>
//         <p className="text-center">Doctor not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold text-center mb-12">Doctor Profile</h1>
//       {/* DoctorProfilePage component */}
//       <div>
//         <h2>{doctor.name}</h2>
//         <p>{doctor.specialty}</p>
//         {/* Add more doctor details here */}
//       </div>
//       <div className="mt-12 text-center">
//         <Link href="/doctors" className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-gray-600 transition duration-300">
//           Back to Doctors List
//         </Link>
//       </div>
//     </div>
//   );
// }