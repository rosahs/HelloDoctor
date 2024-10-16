import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, MessageSquare, User, Image as ImageIcon, MapPin, Star } from 'lucide-react';
import { Avatar } from "@/components/ui/avatar";

interface DoctorProfileDetailsProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    imageUrl: string;
    about: string;
    specialties: string | string[] | null;
    certifications: string | string[] | null;
    experience: string | string[] | null;
    languages: string | string[] | null;
  };
}

export default function DoctorProfilePage({ doctor }: DoctorProfileDetailsProps) {
  const specialtiesArray = Array.isArray(doctor.specialties) ? doctor.specialties : doctor.specialties?.split(',') || [];
  const certificationsArray = Array.isArray(doctor.certifications) ? doctor.certifications : doctor.certifications?.split(',') || [];
  const experienceArray = Array.isArray(doctor.experience) ? doctor.experience : doctor.experience?.split(',') || [];
  const languagesArray = Array.isArray(doctor.languages) ? doctor.languages : doctor.languages?.split(',') || [];

  return (
    <div className="min-h-screen bg-white flex flex-col w-full px-8 py-12">
      <div className="w-full flex-grow space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 w-full">
          <div className="flex items-start mb-6 md:mb-0">
            <Avatar className="w-32 h-32 mr-6">
              <Image
                src={doctor.imageUrl || "/profile.jpg"}
                alt={`${doctor.name}'s profile picture`}
                width={150}
                height={150}
              />
            </Avatar>
            <div className="ml-4 text-left">
              <h2 className="text-3xl md:text-4xl font-bold">{doctor.name}</h2>
              <p className="text-xl md:text-2xl font-semibold text-gray-600">{doctor.specialty}</p>
            </div>
          </div>
          <Bookmark className="text-gray-800 cursor-pointer" size={40} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 w-full">
          <button className="w-full md:w-full h-16 bg-black text-white text-lg md:text-2xl font-semibold rounded-md flex items-center justify-center transition-colors duration-300 hover:bg-green-600 cursor-pointer">
            <MessageSquare className="mr-3" size={32} /> Message
          </button>
          <Link href={`/doctors/${doctor.id}/reserve`} className="w-full md:w-full">
            <button className="w-full h-16 bg-black text-white text-lg md:text-2xl font-semibold rounded-md flex items-center justify-center transition-colors duration-300 hover:bg-green-600 cursor-pointer">
              <Star className="mr-3" size={32} /> Reserve
            </button>
          </Link>
        </div>

        {/* Icons Row - Spread across the screen */}
        <div className="flex justify-between mb-8 p-6 rounded-md bg-gray-100 w-full">
          <User className="text-gray-800 cursor-pointer" size={32} />
          <ImageIcon className="text-gray-800 cursor-pointer" size={32} />
          <MapPin className="text-gray-800 cursor-pointer" size={32} />
          <Star className="text-gray-800 cursor-pointer" size={32} />
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h3 className="font-bold text-2xl mb-4">About me</h3>
          <p className="text-lg text-gray-600">{doctor.about || 'No information available.'}</p>
        </div>

        {/* Specialties */}
        <div className="mb-8">
          <h3 className="font-bold text-2xl mb-4">Specialties</h3>
          <ul className="list-disc pl-5 text-lg text-gray-600">
            {specialtiesArray.length > 0 ? (
              specialtiesArray.map((specialty, index) => <li key={index}>{specialty}</li>)
            ) : (
              <li>Not specified</li>
            )}
          </ul>
        </div>

        {/* Certifications */}
        <div className="mb-8">
          <h3 className="font-bold text-2xl mb-4">Certifications</h3>
          <ul className="list-disc pl-5 text-lg text-gray-600">
            {certificationsArray.length > 0 ? (
              certificationsArray.map((certification, index) => <li key={index}>{certification}</li>)
            ) : (
              <li>Not specified</li>
            )}
          </ul>
        </div>

        {/* Professional Experience */}
        <div className="mb-8">
          <h3 className="font-bold text-2xl mb-4">Professional Experience</h3>
          <ul className="list-disc pl-5 text-lg text-gray-600">
            {experienceArray.length > 0 ? (
              experienceArray.map((exp, index) => <li key={index}>{exp}</li>)
            ) : (
              <li>Not specified</li>
            )}
          </ul>
        </div>

        {/* Languages */}
        <div className="mb-8">
          <h3 className="font-bold text-2xl mb-4">Languages</h3>
          <ul className="list-disc pl-5 text-lg text-gray-600">
            {languagesArray.length > 0 ? (
              languagesArray.map((language, index) => <li key={index}>{language}</li>)
            ) : (
              <li>Not specified</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}