// app/components/DoctorSearchForm/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Specialty-Modal/page";

const DoctorSearchForm = () => {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Handle form submission and redirect to the new route structure
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (name) searchParams.append("name", name);
    if (location) searchParams.append("location", location);

    if (specialty) {
      // Format the specialty and type into the desired route structure
      const formattedSpecialty = specialty.toLowerCase().replace(/ /g, "-"); // e.g., "Cardiology" => "cardiology"
      router.push(`/doctors/${formattedSpecialty}`);
      // router.push(`/doctors/${formattedSpecialty}/${formattedSpecialty}?${searchParams.toString()}`);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Doctor's name"
          className="w-full text-2xl px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black shadow-md shadow-gray-700"
        />

        <input
          type="text"
          value={specialty}
          onFocus={handleSpecialtyClick}
          readOnly
          placeholder="Select Specialty"
          className="w-full text-2xl px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer text-black shadow-md shadow-gray-700"
        />

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full text-2xl px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-black shadow-md shadow-gray-700"
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-gray-500 text-2xl text-white rounded-md hover:bg-custom-green focus:outline-none focus:ring-2 focus:ring-black shadow-lg shadow-black active:translate-y-0.5 active:shadow-md transition-all duration-150">
        Search
      </button>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelectSpecialty={handleSpecialtySelect}
      />
    </form>
  );
};

export default DoctorSearchForm;
