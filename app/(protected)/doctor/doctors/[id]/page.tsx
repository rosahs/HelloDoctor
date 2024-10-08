"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { MessageSquare, Bookmark, User, Image as ImageIcon, MapPin, Star } from 'lucide-react';
import Footer from "@/components/footer/page";
import Link from "next/link";

export default function DoctorReservePage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id as string;

  const doctor = {
    id: 1,
    name: "Dr. Razha",
    specialty: "Cardiologist | Internal Medicine Specialist",
    imageUrl: "/user2.jpg",
    about: "Whether you're a patient looking for quality care or a doctor wanting to expand your reach, DocFinder has you covered.",
    specialties: ["Cardiology", "Internal Medicine", "Heart Failure Management"],
    certifications: [
      "American Board of Internal Medicine (ABIM) - Certified in Cardiovascular Disease",
      "Advanced Cardiovascular Life Support (ACLS)",
      "Basic Life Support (BLS)"
    ],
    experience: ["Cardiology", "Internal Medicine", "Heart Failure Management"],
    languages: ["English (Fluent)", "Kurdish (Conversational)"]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 overflow-y-auto">
      {/* Logo at the Top */}
      <div className="w-full max-w-lg mx-auto py-4">
        <h1 className="text-3xl font-bold text-center text-green-800">HelloDoctor</h1>
      </div>

      <div className="flex-grow p-4">
        <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image
                src={doctor.imageUrl}
                alt={doctor.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-4">
                <h2 className="font-bold text-lg">{doctor.name}</h2>
                <p className="text-gray-600">{doctor.specialty}</p>
              </div>
            </div>
            <Bookmark className="text-gray-800" />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mb-4">
            <button className="w-1/2 bg-black text-white p-2 rounded-md mr-2">
              <MessageSquare className="inline-block mr-2" /> Message
            </button>
            <Link href={`/doctor/doctors/${doctorId}/reserve`} className="w-1/2">
              <button className="w-full bg-black text-white p-2 rounded-md">
                Reserve
              </button>
            </Link>
          </div>

          {/* Section Icons */}
          <div className="flex justify-between mb-4">
            <div className="flex overflow-x-auto">
              <User className="text-gray-800 min-w-[24px] mr-4" size={24} />
              <ImageIcon className="text-gray-800 min-w-[24px] mr-4" size={24} />
              <MapPin className="text-gray-800 min-w-[24px] mr-4" size={24} />
              <Star className="text-gray-800 min-w-[24px]" size={24} />
            </div>
          </div>

          {/* About */}
          <div className="mb-4">
            <h3 className="font-bold text-lg">About me</h3>
            <p className="text-gray-600">{doctor.about}</p>
          </div>

          {/* Specialties */}
          <div className="mb-4">
            <h3 className="font-bold text-lg">Specialties</h3>
            <ul className="list-disc ml-5 text-gray-600">
              {doctor.specialties.map((specialty, index) => (
                <li key={index}>{specialty}</li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div className="mb-4">
            <h3 className="font-bold text-lg">Certifications</h3>
            <ul className="list-disc ml-5 text-gray-600">
              {doctor.certifications.map((certification, index) => (
                <li key={index}>{certification}</li>
              ))}
            </ul>
          </div>

          {/* Professional Experience */}
          <div className="mb-4">
            <h3 className="font-bold text-lg">Professional Experience</h3>
            <ul className="list-disc ml-5 text-gray-600">
              {doctor.experience.map((exp, index) => (
                <li key={index}>{exp}</li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="font-bold text-lg">Languages</h3>
            <ul className="list-disc ml-5 text-gray-600">
              {doctor.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-lg mx-auto mt-8">
        <Footer />
      </div>
    </div>
  );
}