'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, MessageSquare, User, Image as ImageIcon, MapPin, Star } from 'lucide-react';
import { Avatar } from "@/components/ui/avatar";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  about: string;
  specialties: string[];
  certifications: string[];
  experience: string[];
  languages: string[];
}

export default function DoctorProfilePage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
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
    return <div>Loading...</div>;
  }

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col w-full px-8 py-12">
      {/* Rest of your component JSX */}
      {/* Use doctor.imageUrl, doctor.name, doctor.specialty, etc. */}
    </div>
  );
}