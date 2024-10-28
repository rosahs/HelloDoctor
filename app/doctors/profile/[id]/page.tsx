"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/footer/page";
import MessageButton from "@/components/MessageButton";
import { User } from "next-auth";

interface Doctor {
  id: string;
  user: User;
  name: string;
  specialization: string;
  imageUrl: string;
  about: string;
  specialties: string;
  certifications: string[];
  experience: string[];
  languages: string[];
}

export default function DoctorProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the doctor's details based on the ID from the URL
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/doctors/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("doctor cards", data);

          setDoctor(data);
        } else {
          console.error("Failed to fetch doctor details");
          setDoctor(null); // Set doctor to null on error
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        setDoctor(null); // Set doctor to null on error
      }
    };

    fetchDoctor();
  }, [params.id]);

  if (!doctor) {
    return (
      <p className="text-center text-red-500">Loading doctor details...</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-300 text-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div
          className="flex flex-col md:flex-row items-center mb-8 p-8 rounded-lg bg-cover bg-center h-80 shadow-lg"
          style={{
            backgroundImage: "url('/images/h1.png')",
          }}>
          <Image
            src={doctor.user?.image || "/images/placeholder-doctor-image.jpg"}
            alt={doctor.name}
            width={200}
            height={200}
            className="mb-4 md:mb-0 md:mr-8"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{doctor.name}</h1>
            <p className="text-xl text-gray-800">{doctor.specialization}</p>
          </div>
        </div>

        <div className="flex space-x-4 mb-8 shadow-md">
  <button
    className="flex-1 bg-black px-3 text-white h-16 rounded-md font-semibold text-2xl hover:bg-custom-green transition-colors duration-300 active:translate-y-0.5 active:shadow-inner"
    onClick={() => {
      // Handle message functionality
      console.log(`Messaging doctor with ID: ${doctor.id}`);
            // add your message functionality or route navigation here
          }}
        >
          Message
        </button>

        <button
          className="flex-1 bg-black px-3 text-white h-16 rounded-md font-semibold text-2xl hover:bg-custom-green transition-colors duration-300 active:translate-y-0.5 active:shadow-inner"
          onClick={() => router.push(`/doctors/profile/${doctor.id}/reserve`)}
        >
          Reserve
        </button>
      </div>

        <div className="mb-8 p-6 border rounded-lg bg-gray-50 shadow-md">
          <h2 className="text-2xl font-bold mb-4">About me</h2>
          <p className="text-gray-700">
            {doctor.about || "No information available"}
          </p>
        </div>

        <div className="mb-8 p-6 border rounded-lg bg-gray-50 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Specialties</h2>
          <p className="text-gray-700">
            {doctor.specialties || "No specialties available<"}
          </p>
          {/* <ul className="list-disc list-inside text-gray-700">
              {doctor.specialties && doctor.specialties.length > 0 ? (
                doctor.specialties.map((specialty, index) => (
                  <li key={index}>{specialty}</li>
                ))
              ) : (
                <p>No specialties available</p>
              )}
            </ul> */}
        </div>

        <div className="mb-8 p-6 border rounded-lg bg-gray-50 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Certifications</h2>
          <ul className="list-disc list-inside text-gray-700">
            {doctor.certifications.length > 0 ? (
              doctor.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))
            ) : (
              <p>No certifications available</p>
            )}
          </ul>
        </div>

        <div className="mb-8 p-6 border rounded-lg bg-gray-50 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Professional Experience</h2>
          <ul className="list-disc list-inside text-gray-700">
            {doctor.experience.length > 0 ? (
              doctor.experience.map((exp, index) => <li key={index}>{exp}</li>)
            ) : (
              <p>No experience available</p>
            )}
          </ul>
        </div>

        <div className="mb-8 p-6 border rounded-lg bg-gray-50 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Languages</h2>
          <p className="text-gray-700">
            {doctor.languages.length > 0
              ? doctor.languages.join(", ")
              : "No languages available"}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
