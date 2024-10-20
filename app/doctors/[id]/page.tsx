"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  MessageSquare,
  User,
  Image as ImageIcon,
  MapPin,
  Star,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import Footer from "@/components/footer/page";

interface Doctor {
  id: string;
  user?: {
    name: string;
    email: string;
  };
  specialization: string;
  specialities: string[];
  certifications: string[];
  aboutMe: string;
  imageUrl?: string;
  professionalExperience?: string;
  languages?: string[];
  name?: string;
}

export default function DoctorProfilePage() {
  const params = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const doctorId = params.id as string;

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!doctorId) {
        setError("Doctor ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/doctors/${doctorId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          setDoctor(data);
        } else {
          if (response.status === 404) {
            setError("Doctor not found");
          } else {
            setError(
              `Failed to fetch doctor details. Status: ${response.status}`
            );
          }
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
        setError("An unexpected error occurred while fetching doctor details");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!doctor) {
    return (
      <p className="text-center text-red-500">
        Doctor information is unavailable
      </p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full px-4 md:px-8 py-12 relative bg-gray-50">
      <div className="w-full flex-grow space-y-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-row items-center bg-white rounded-lg p-6 shadow-lg">
          <div className="mr-6">
            <Avatar className="w-32 h-32 border-4 bg-gray-200 border-gray-100 shadow-md">
              <Image
                src={doctor.imageUrl || "/profile.jpg"}
                alt={`${doctor.name}'s profile picture`}
                width={128}
                height={128}
                className="rounded-full"
              />
            </Avatar>
          </div>
          <div className="flex-grow">
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {doctor.name}
              </h2>
              <p className="text-lg font-medium text-gray-600 mt-1">
                {doctor.specialization}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {doctor.professionalExperience}
              </p>
            </div>
          </div>
          <Bookmark
            className="text-gray-600 cursor-pointer ml-4"
            size={24}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="w-full md:w-2/3 bg-black text-white py-3 rounded-lg shadow-md hover:bg-gray-800 transition duration-200 flex items-center justify-center">
            <MessageSquare className="mr-2" size={20} /> Message
          </button>
          <Link href={`/doctors/${doctor.id}/reserve`} className="w-full md:w-2/3">
            <button className="w-full bg-black text-white py-3 rounded-lg shadow-md hover:bg-blue-800 transition duration-200 flex items-center justify-center">
              <Star className="mr-2" size={20} /> Reserve
            </button>
          </Link>
        </div>

        {/* Icon Navigation */}
        <div className="flex justify-center gap-8 py-4 border-t border-b border-gray-200">
          <User className="text-gray-600" size={24} />
          <ImageIcon className="text-gray-600" size={24} />
          <MapPin className="text-gray-600" size={24} />
          <Star className="text-gray-600" size={24} />
        </div>

        {/* Information Sections */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">About me</h3>
          <p className="text-gray-700">{doctor.aboutMe}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Specialties</h3>
          <ul className="text-gray-700">
            {doctor.specialities?.map((specialty, index) => (
              <li key={index}>{specialty}</li>
            )) || <li>No specialties listed</li>}
          </ul>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Certifications</h3>
          <ul className="text-gray-700">
            {Array.isArray(doctor.certifications) && doctor.certifications.length > 0 ? (
              doctor.certifications.map((certification, index) => (
                <li key={index}>{certification}</li>
              ))
            ) : (
              <li>No certifications listed</li>
            )}
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Professional Experience</h3>
          <ul className="text-gray-700">
            {doctor.professionalExperience ? (
              <li>{doctor.professionalExperience}</li>
            ) : (
              <li>No experience listed</li>
            )}
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Languages</h3>
          <ul className="text-gray-700">
            {doctor.languages ? (
              <li>{doctor.languages}</li>
            ) : (
              <li>No languages listed</li>
            )}
          </ul>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}