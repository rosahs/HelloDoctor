// 'use client';

// import DoctorsList from "@/components/protected/doctor-list/DoctorList";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// export interface Doctor {
//   id: string;
//   specialization: string;
//   images: string[];
//   aboutMe?: string;
//   specialties?: string;
//   certifications?: string;
//   professionalExperience?: string;
//   languages?: string;
// }

// const DoctorsDisplay: React.FC<{ initialDoctors: Doctor[] }> = ({ initialDoctors = [] }) => {
//   return (
//     <div>
//       {initialDoctors.length > 0 ? (
//         initialDoctors.map((doctor) => (
//           <div key={doctor.id}>
//             <h2>{doctor.specialization}</h2>
//             <p>{doctor.aboutMe}</p>
//           </div>
//         ))
//       ) : (
//         <p>No doctors found.</p> // Handle empty state
//       )}
//     </div>
//   );
// };

// export default DoctorsDisplay;
