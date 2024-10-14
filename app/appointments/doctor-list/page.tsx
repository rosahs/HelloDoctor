'use client';

import DoctorsList from "@/components/protected/doctor-list/DoctorList";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface Doctor {
  id: string;
  specialization: string;
  images: string[];
  aboutMe?: string;
  specialties?: string;
  certifications?: string;
  professionalExperience?: string;
  languages?: string;
}

// Renaming the component to avoid conflict
const DoctorsDisplay: React.FC<{ initialDoctors: Doctor[] }> = ({ initialDoctors = [] }) => {
  return (
    <div>
      {initialDoctors.length > 0 ? (
        initialDoctors.map((doctor) => (
          <div key={doctor.id}>
            <h2>{doctor.specialization}</h2>
            <p>{doctor.aboutMe}</p>
          </div>
        ))
      ) : (
        <p>No doctors found.</p> // Handle empty state
      )}
    </div>
  );
};

export default DoctorsDisplay;

// 'use client';

// import DoctorsList from "@/app/appointments/components/doctor-list";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// // Type definition for Doctor (this should match your Prisma schema or API structure)
// interface Doctor {
//   id: string;
//   name: string;
//   specialty: string;
//   experience: number;
//   rating: number;
//   imageUrl: string;
//   about: string;
//   specialties: string[];
//   certifications: string[];
//   professionalExperience: string[];
//   languages: string[];
// }

// const DoctorsListPage: React.FC = () => {
//   const router = useRouter();
//   const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null); // Error state

//   // Fetch doctors from API
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await fetch("/api/doctors"); // Assuming the backend API is set up correctly
//         if (!response.ok) {
//           throw new Error("Failed to fetch doctors.");
//         }
//         const data = await response.json();
//         setDoctorsList(data); // Set the fetched doctors
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   // Handle doctor selection and redirect
//   const handleDoctorSelect = (doctorId: string) => {
//     router.push(`/appointments/doctor-list/${doctorId}`);
//   };

//   // Show a loading indicator while fetching data
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Display an error message if fetching fails
//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   // Render the DoctorsList component with the fetched doctors
//   return <DoctorsList initialDoctors={doctorsList} />;
// };

// export default DoctorsListPage;