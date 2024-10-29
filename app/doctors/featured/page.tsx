// app/doctors/featured/page.tsx
"use client";

import { useState, useEffect } from "react";
import DoctorCard from "@/components/doctor-card/page";
// import { Doctor } from '@/lib/doctors';

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  profileUrl: string;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  imageUrl: string;
  profileUrl: string;
  images?: string;
}

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState<DoctorCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/doctors/featured");
        if (response.ok) {
          const data: Doctor[] = await response.json();

          const doctorCards: DoctorCardProps[] = data.map((doctor) => ({
            id: doctor.id,
            name: doctor.name ?? "Unknown",
            specialty: doctor.specialization ?? "Not specified",
            imageUrl:
              doctor.images?.[0] || "/images/placeholder-doctor-image.jpg",
            profileUrl: `/doctors/profile/${doctor.id}`,
          }));

          setDoctors(doctorCards);
        } else {
          console.error("Failed to fetch featured doctors");
        }
      } catch (error) {
        console.error("Error fetching featured doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-8">
        Loading featured doctors...
      </p>
    );
  }

  if (doctors.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No featured doctors available at this time.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}
