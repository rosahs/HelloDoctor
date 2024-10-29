"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Specialty-Modal/page";

const DoctorSearchForm = () => {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const specialtyRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSpecialtyClick = () => {
    setShowModal(true);
  };

  const handleSpecialtySelect = (selectedSpecialty: string) => {
    setSpecialty(selectedSpecialty);
    setShowModal(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();

    // Only add parameters that have values
    if (name) searchParams.append("name", name);
    if (location) searchParams.append("location", location);
    if (specialty) {
      const formattedSpecialty = specialty.toLowerCase().replace(/ /g, "-");
      searchParams.append("specialty", formattedSpecialty);
    }

    // If only the name is provided, use just that in the search
    if (searchParams.has("name") && !searchParams.has("specialty") && !searchParams.has("location")) {
      router.push(`/doctors/search?${searchParams.toString()}`);
    } else if (specialty) {
      // If specialty is provided, navigate to the specialty page with additional params
      router.push(`/doctors/${specialty.toLowerCase().replace(/ /g, "-")}?${searchParams.toString()}`);
    } else {
      // Default to the general search page with all available params
      router.push(`/doctors/search?${searchParams.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Doctor's name"
          className="w-full text-2xl px-4 py-2 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 bg-[var(--secondary-color)] focus:ring-black shadow-inner"
        />

        {/* Container with relative positioning */}
        <div className="relative">
          <input
            type="text"
            value={specialty}
            ref={specialtyRef}
            onFocus={handleSpecialtyClick}
            readOnly
            placeholder="Select Specialty"
            className="w-full text-2xl px-4 py-2 rounded-md border border-gray-300 bg-[var(--secondary-color)] focus:outline-none focus:ring-2 focus:ring-black cursor-pointer text-blue-500 shadow-inner"
          />

          {/* Modal positioned absolutely within this container */}
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSelectSpecialty={handleSpecialtySelect}
          />
        </div>

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full text-2xl px-4 py-2 rounded-lg border bg-[var(--secondary-color)] border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-blue-500 shadow-inner"
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-600 text-2xl text-white rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-black shadow-inner active:translate-y-0.5 active:shadow-md transition-all duration-150">
        Search
      </button>
    </form>
  );
};

export default DoctorSearchForm;