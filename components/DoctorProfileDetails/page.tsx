import Image from "next/image";
import {
  Bookmark,
  MessageSquare,
  User,
  Image as ImageIcon,
  MapPin,
  Star,
} from "lucide-react"; // Icons
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  about: string;
  specialties: string[];
  certifications: string[];
  experience: string[];
  languages: string[];
}

export default function DoctorProfilePage({
  doctor,
}: DoctorProfileDetailsProps) {
  const specialtiesArray = Array.isArray(doctor.specialties)
    ? doctor.specialties
    : doctor.specialties?.split(",") || [];
  const certificationsArray = Array.isArray(
    doctor.certifications
  )
    ? doctor.certifications
    : doctor.certifications?.split(",") || [];
  const experienceArray = Array.isArray(doctor.experience)
    ? doctor.experience
    : doctor.experience?.split(",") || [];
  const languagesArray = Array.isArray(doctor.languages)
    ? doctor.languages
    : doctor.languages?.split(",") || [];

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 sm:px-8 md:px-12 lg:px-16 py-8">
      <div className="flex-grow max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <Avatar className="w-20 h-20 mr-3">
              <AvatarImage
                src={doctor.imageUrl || "/profile.jpg"}
              />
            </Avatar>
            <div className="ml-4 md:ml-8 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold">
                {doctor.name}
              </h2>
              <p className="text-xl md:text-2xl font-semibold text-gray-600">
                {doctor.specialty}
              </p>
            </div>
          </div>
          <Bookmark
            className="text-gray-800 cursor-pointer"
            size={40}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <button className="w-full md:w-[48%] h-16 bg-black text-white text-lg md:text-2xl font-semibold rounded-md flex items-center justify-center transition-colors duration-300 hover:bg-green-600 cursor-pointer">
            <MessageSquare className="mr-3" size={32} />{" "}
            Message
          </button>
          <Link
            href={`/doctors/${doctor.id}/reserve`}
            className="w-full md:w-[48%]"
          >
            <button className="w-full h-16 bg-black text-white text-lg md:text-2xl font-semibold rounded-md flex items-center justify-center transition-colors duration-300 hover:bg-green-600 cursor-pointer">
              <Star className="mr-3" size={32} /> Reserve
            </button>
          </Link>
        </div>

        {/* Icons Row */}
        <div className="flex justify-between mb-8 p-4 rounded-md bg-gray-100">
          <User
            className="text-gray-800 cursor-pointer"
            size={32}
          />
          <ImageIcon
            className="text-gray-800 cursor-pointer"
            size={32}
          />
          <MapPin
            className="text-gray-800 cursor-pointer"
            size={32}
          />
          <Star
            className="text-gray-800 cursor-pointer"
            size={32}
          />
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h3 className="font-bold text-2xl mb-4">
            About me
          </h3>
          <p className="text-lg text-gray-600">
            {doctor.about || "No information available."}
          </p>
        </div>

        {/* Specialties */}
        <div className="mb-8">
          <h3 className="font-bold text-2xl mb-4">
            Specialties
          </h3>
          <ul className="list-disc ml-8 text-lg text-gray-600">
            {specialtiesArray.length > 0 ? (
              specialtiesArray.map((specialty, index) => (
                <li key={index}>{specialty}</li>
              ))
            ) : (
              <li>Not specified</li>
            )}
          </ul>
        </div>

        {/* Certifications */}
        <div className="mb-8">
          <h3 className="font-bold text-2xl mb-4">
            Certifications
          </h3>
          <ul className="list-disc ml-8 text-lg text-gray-600">
            {certificationsArray.length > 0 ? (
              certificationsArray.map(
                (certification, index) => (
                  <li key={index}>{certification}</li>
                )
              )
            ) : (
              <li>Not specified</li>
            )}
          </ul>
        </div>

        {/* Professional Experience */}
        <div className="mb-8">
          <h3 className="font-bold text-2xl mb-4">
            Professional Experience
          </h3>
          <ul className="list-disc ml-8 text-lg text-gray-600">
            {experienceArray.length > 0 ? (
              experienceArray.map((exp, index) => (
                <li key={index}>{exp}</li>
              ))
            ) : (
              <li>Not specified</li>
            )}
          </ul>
        </div>

        {/* Languages */}
        <div className="mb-8">
          <h3 className="font-bold text-2xl mb-4">
            Languages
          </h3>
          <ul className="list-disc ml-8 text-lg text-gray-600">
            {languagesArray.length > 0 ? (
              languagesArray.map((language, index) => (
                <li key={index}>{language}</li>
              ))
            ) : (
              <li>Not specified</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
