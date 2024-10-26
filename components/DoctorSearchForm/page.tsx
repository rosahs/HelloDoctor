"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Specialty-Modal/page';

const DoctorSearchForm = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Handle form submission and redirect to the new route structure
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (name) searchParams.append('name', name);
    if (location) searchParams.append('location', location);

    if (specialty) {
      // Route to `/doctors/[specialty]/[type]` path, where `[type]` is dynamically based on the specialty
      const formattedSpecialty = specialty.toLowerCase().replace(/ /g, '-'); // e.g., "Cardiology" => "cardiology"
      router.push(`/doctors/${formattedSpecialty}?${searchParams.toString()}`);
    } else {
      router.push(`/doctors/search?${searchParams.toString()}`);
    }
  };

  const handleSpecialtyClick = () => {
    setShowModal(true);
  };

  const handleSpecialtySelect = (selectedSpecialty: string) => {
    setSpecialty(selectedSpecialty);
    setShowModal(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {/* Form fields remain the same */}
    </form>
  );
};

export default DoctorSearchForm;