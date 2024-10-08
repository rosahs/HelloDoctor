"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AppointmentBooking from "@/components/protected/doctor-list/AppointmentBooking";

export default function DoctorProfilePage() {
  const params = useParams();
  const doctorId = params.id as string;
  //   const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function fetchDoctorInfo() {
//       try {
//         const response = await fetch(`/api/doctors/${doctorId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch doctor info");
//         }
//         const data = await response.json();
//         setDoctor(data);
//       } catch (error) {
//         console.error("Error fetching doctor info:", error);
//         setDoctor(null);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDoctorInfo();
//   }, [doctorId]);

  const doctor = {
    id: 1,
    name: "Dr. Emily Chen",
    specialty: "Cardiology",
    imageUrl: "/doctor1.jpg",
    experience: 15,
    rating: 4.8,
    about:
      "Dr. Chen is a board-certified cardiologist with over 15 years of experience in treating complex heart conditions. She specializes in interventional cardiology and has performed over 1000 successful procedures.",
    education: [
      "MD from Harvard Medical School",
      "Residency in Internal Medicine at Massachusetts General Hospital",
      "Fellowship in Cardiology at Johns Hopkins Hospital",
    ],
    languages: ["English", "Mandarin"],
    availableDays: ["Monday", "Wednesday", "Friday"],
    consultationFee: "$200",
    specialties: ["surgery"],
  };
  if (loading) {
    return <p>Loading doctor information...</p>;
  }

  if (!doctor) {
    return <p>Error loading doctor information. Please try again later.</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-blue-50 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">
        Book Appointment with {doctor.name}
      </h1>
      <AppointmentBooking
        doctorId={doctor.id.toString()}
        doctorName={doctor.name}
        doctorSpecialty={doctor.specialty}
        doctorExperience={`${doctor.experience} years`}
        doctorFocus={doctor.specialty}
      />
    </div>
  );
}
