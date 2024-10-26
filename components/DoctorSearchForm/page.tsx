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

  // Handle form submission and redirect to search results
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (name) searchParams.append('name', name);
    if (specialty) searchParams.append('specialty', specialty);
    if (location) searchParams.append('location', location);
    router.push(`/doctors/search?${searchParams.toString()}`);
  };

  // Show the specialty selection modal
  const handleSpecialtyClick = () => {
    setShowModal(true);
  };

  // Update the specialty input when a specialty is selected from the modal
  const handleSpecialtySelect = (selectedSpecialty: string) => {
    setSpecialty(selectedSpecialty);
    setShowModal(false); // Close the modal after selection
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Input for Doctor's Name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Doctor's name"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black shadow-md shadow-gray-700"
        />

        {/* Specialty Input */}
        <input
          type="text"
          value={specialty}
          onFocus={handleSpecialtyClick}
          readOnly
          placeholder="Select Specialty"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer text-black shadow-md shadow-gray-700"
        />

        {/* Input for Location */}
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black shadow-md shadow-gray-700"
        />
      </div>
      {/* Search Button */}
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-custom-green focus:outline-none focus:ring-2 focus:ring-black shadow-lg shadow-black active:translate-y-0.5 active:shadow-md transition-all duration-150"
      >
        Search
      </button>

      {/* Specialty Selection Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelectSpecialty={handleSpecialtySelect}
      />
    </form>
  );
};

export default DoctorSearchForm;