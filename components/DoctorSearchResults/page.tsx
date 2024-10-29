'use client';

import { useEffect, useState } from 'react';
import DoctorCard from '@/components/Doctor-card/page';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
}

interface DoctorSearchResultsProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function DoctorSearchResults({ searchParams }: DoctorSearchResultsProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    // Check if any search parameters are provided
    const hasSearchParams = Object.values(searchParams).some(param => param && param.length > 0);

    if (!hasSearchParams) {
      // If no search parameters, skip the search
      return;
    }

    const fetchDoctors = async () => {
      setLoading(true);
      setSearched(true);
      try {
        // Convert searchParams to a URL-friendly format for the API request
        const params = new URLSearchParams(
          Object.entries(searchParams).reduce((acc, [key, value]) => {
            if (typeof value === 'string') {
              acc[key] = value;
            } else if (Array.isArray(value)) {
              acc[key] = value.join(',');
            }
            return acc;
          }, {} as Record<string, string>)
        );

        // Make the API call
        const response = await fetch(`/api/doctors?${params.toString()}`);
        const data: Doctor[] = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [searchParams]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={{
                id: doctor.id,
                name: doctor.name || 'Unknown',
                specialty: doctor.specialty || 'Not specified',
                imageUrl: doctor.imageUrl || '/images/placeholder-doctor-image.jpg',
              }}
            />
          ))}
        </div>
      ) : searched ? (
        <div className="text-center text-gray-500 mt-8">
          No doctors found matching your search criteria.
        </div>
      ) : (
        <div className="text-center text-black mt-8">
          {/* Please use the search form to find a doctor. */}
        </div>
      )}
    </div>
  );
}