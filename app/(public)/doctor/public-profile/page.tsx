"use client";

import { useEffect, useState } from "react";
import MessageButton from "@/components/MessageButton";
import Link from "next/link";
import { getDoctors } from "@/actions/getDoctors";
import { User } from "next-auth";

interface Doctor {
  id: string;
  user: User | null;
  specialization: string;
}

const DoctorList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const fetchedDoctors = await getDoctors();
        setDoctors(fetchedDoctors);
      } catch {
        setError("Failed to fetch doctors");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  console.log(doctors);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Available Doctors
      </h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id} className="mb-4">
            <Link
              href={`/doctor/${doctor.id}`}
              className="text-blue-600 hover:underline"
            >
              <h3 className="text-lg font-semibold">
                {doctor?.user?.name}
              </h3>
            </Link>
            <p>{doctor.specialization}</p>
            <MessageButton doctorId={doctor?.user?.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
