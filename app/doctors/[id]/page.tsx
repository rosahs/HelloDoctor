'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
  location: string;
  imageUrl: string;
  about: string;
  certifications: string[];
}

export default function DoctorProfilePage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/doctors/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDoctor(data);
        } else {
          console.error('Failed to fetch doctor details');
        }
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!doctor) {
    return <p>Doctor not found.</p>;
  }

  return (
    <div>
      <h1>{doctor.name}</h1>
      <Image src={doctor.imageUrl} alt={doctor.name} width={200} height={200} />
      <p>{doctor.specialty}</p>
      <p>{doctor.about}</p>
      <p>{doctor.location}</p>
    </div>
  );
}