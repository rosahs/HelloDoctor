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
  specialities: string;
  certifications: string;
  aboutMe: string;
  imageUrl?: string;
  professionalExperience?: string;
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
    // <div className="p-4">
    //   <h1 className="text-2xl font-bold mb-2">{doctor.aboutMe}</h1>
    //   <p className="mb-2">Email: {doctor.certifications}</p>
    //   <p className="mb-2">Specialization: {doctor.specialization}</p>
    //   {/* Render other details as needed */}
    // </div>

    <div className="min-h-screen flex flex-col w-full px-8 py-12 relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/2.jpg"
          alt="Background Map"
          fill
          quality={100}
          style={{ objectFit: "cover" }}
          className="opacity-80"
        />
        <div className="absolute inset-0 bg-gray-100 bg-opacity-10"></div>
      </div>
      <div className="w-full flex-grow space-y-12 relative z-10">
        {/* Header Section */}
        <div
          className="relative flex flex-col md:flex-row items-start justify-between mb-8 w-full p-12 rounded-md shadow-md overflow-hidden"
          style={{ minHeight: "300px" }}>
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/2.jpg"
              alt="Background Map"
              fill
              quality={100}
              style={{ objectFit: "cover" }}
              className="opacity-80"
            />
            <div className="absolute inset-0 bg-gray-100 bg-opacity-10"></div>
          </div>
          <div className="flex items-start mb-6 md:mb-0 relative z-10">
            <Avatar className="w-40 h-40 mr-6 border-4 bg-gray-300 border-gray-800 shadow-lg">
              <Image
                src={doctor.imageUrl || "/profile.jpg"}
                alt={`${doctor.name}'s profile picture`}
                width={150}
                height={150}
              />
            </Avatar>
            <div className="ml-4 text-left">
              <h2 className="text-4xl font-bold text-gray-800">
                {doctor.name}
              </h2>
              <p className="text-2xl font-semibold text-gray-600 mt-2">
                {doctor.specialization}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {doctor.professionalExperience} years of experience
              </p>
            </div>
          </div>
          <Bookmark
            className="text-gray-800 cursor-pointer relative z-10"
            size={40}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 w-full">
          <button className="w-full md:w-[48%] h-16 bg-black opacity-80 text-white text-lg md:text-2xl font-semibold rounded-lg shadow-lg hover:bg-custom-green transition-transform duration-300 hover:scale-105 flex items-center justify-center cursor-pointer">
            <MessageSquare className="mr-3" size={32} /> Message
          </button>
          <Link
            href={`/doctors/${doctor.id}/reserve`}
            className="w-full md:w-[48%]">
            <button className="w-full h-16 bg-black opacity-80 text-white text-lg md:text-2xl font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105 flex items-center justify-center cursor-pointer">
              <Star className="mr-3" size={32} /> Reserve
            </button>
          </Link>
        </div>

        {/* Content Sections */}
        {/* About, Specialties, Certifications, Experience, Languages */}
        {/*... include content sections similarly ...*/}

        <Footer />
      </div>
    </div>
  );
}
