'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Specialty-Modal/page'; 

const DoctorSearchForm = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (name) searchParams.append('name', name);
    if (specialty) searchParams.append('specialty', specialty);
    if (location) searchParams.append('location', location);
    router.push(`/doctors/search?${searchParams.toString()}`);
  };

  const handleSpecialtyClick = () => {
    setShowModal(true); // Show the modal when the specialty input is clicked
  };

  const handleSpecialtySelect = (selectedSpecialty: string) => {
    setSpecialty(selectedSpecialty); // Update the specialty input with the selected value
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Doctor's name"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Specialty Input (Read-Only) */}
        <input
          type="text"
          value={specialty}
          onClick={handleSpecialtyClick}
          readOnly
          placeholder="Select Specialty"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>

      {/* Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelectSpecialty={handleSpecialtySelect}
      />
    </form>
  );
};

export default DoctorSearchForm;