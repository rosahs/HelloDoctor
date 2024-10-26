// app/components/DoctorSearchResults/page.tsx

"use client";

import { useEffect, useState } from 'react';
import DoctorCard from '@/components/doctor-card/page';
import { Doctor } from '@/lib/doctors';

interface DoctorSearchResultsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  profileUrl: string;
}

export default function DoctorSearchResults({ searchParams }: DoctorSearchResultsProps) {
  const [doctors, setDoctors] = useState<DoctorCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const queryParams = new URLSearchParams(searchParams as Record<string, string>);
        const response = await fetch(`/api/doctors/search?${queryParams.toString()}`);

        if (response.ok) {
          const data = await response.json();
          const doctorCards: DoctorCardProps[] = data.map((doctor: Doctor) => ({
            id: doctor.id,
            name: doctor.user?.name ?? "Unknown",
            specialty: doctor.specialization ?? "Not specified",
            imageUrl: doctor.images?.[0] || '/images/placeholder-doctor-image.jpg',
            profileUrl: `/doctors/profile/${doctor.id}`,
          }));
          setDoctors(doctorCards);
        } else {
          console.error("Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [searchParams]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Loading doctors...</p>;
  }

  if (doctors.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No doctors found matching your search criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={{
            id: doctor.id,
            name: doctor.name,
            specialty: doctor.specialty,
            imageUrl: doctor.imageUrl,
            profileUrl: doctor.profileUrl,
          }}
        />
      ))}
    </div>
  )};