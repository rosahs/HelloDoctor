"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DoctorsList from "@/components/protected/doctor-list/DoctorList"; // Import Doctor and DoctorsListDisplay

const DoctorsListPage: React.FC = () => {
  const router = useRouter();
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]); // Use Doctor[] type for doctorsList
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch doctors based on search term
  const fetchDoctors = async (query: string = "") => {
    try {
      setLoading(true);
      const response = await fetch(`/api/doctors?query=${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      const data: Doctor[] = await response.json();
      setDoctorsList(data);
    } catch (error) {
      console.error("Failed to fetch doctors", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all doctors on initial page load
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle search submission
  const handleSearch = () => {
    fetchDoctors(searchTerm);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Search input and button */}
      <div>
        <input
          type="text"
          placeholder="Search doctors by name or specialization"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Doctor list */}
      <DoctorsList initialDoctors={doctorsList} />
    </div>
  );
};

export default DoctorsListPage;