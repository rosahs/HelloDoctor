import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, MessageSquare, User, Image as ImageIcon, MapPin, Star } from 'lucide-react';
import { Avatar } from "@/components/ui/avatar";
import Footer from "@/components/footer/page"

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
    <div className="min-h-screen flex flex-col w-full px-8 py-12 relative">
      <div className="absolute inset-0 z-0">
        {/* <Image
          src="/images/mapimage9.png"
          alt="World Map"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-30"
        />

        {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-80 z-1"></div>  */}

      </div>
      <div className="w-full flex-grow space-y-12 relative z-10">
        
        {/* Header Section */}
        <div className="relative flex flex-col md:flex-row items-start justify-between mb-8 w-full p-12 rounded-md shadow-md overflow-hidden" style={{ minHeight: '300px' }}>
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/2.jpg"
              alt="Background Map"
              fill
              quality={100}
              style={{ objectFit: 'cover' }}
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
              <h2 className="text-4xl font-bold text-gray-800">{doctor.name}</h2>
              <p className="text-2xl font-semibold text-gray-600 mt-2">{doctor.specialty}</p>
              <p className="text-sm text-gray-400 mt-1">{doctor.experience} years of experience</p>
            </div>
          </div>
          <Bookmark className="text-gray-800 cursor-pointer relative z-10" size={40} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 w-full">
  <button className="w-full md:w-[48%] h-16 bg-black opacity-80 text-white text-lg md:text-2xl font-semibold rounded-lg shadow-lg hover:bg-custom-green transition-transform duration-300 hover:scale-105 flex items-center justify-center cursor-pointer">
    <MessageSquare className="mr-3" size={32} /> Message
  </button>
  <Link href={`/doctors/${doctor.id}/reserve`} className="w-full md:w-[48%]">
    <button className="w-full h-16 bg-black opacity-80 text-white text-lg md:text-2xl font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105 flex items-center justify-center cursor-pointer">
      <Star className="mr-3" size={32} /> Reserve
    </button>
  </Link>
</div>

<div className="flex justify-between mb-8 p-6 rounded-md bg-white shadow-md">
  <div className="flex flex-col items-center">
    <User className="text-gray-800 cursor-pointer" size={32} />
    <span className="text-sm text-gray-500 mt-2">Profile</span>
  </div>
  <div className="flex flex-col items-center">
    <ImageIcon className="text-gray-800 cursor-pointer" size={32} />
    <span className="text-sm text-gray-500 mt-2">Photos</span>
  </div>
  <div className="flex flex-col items-center">
    <MapPin className="text-gray-800 cursor-pointer" size={32} />
    <span className="text-sm text-gray-500 mt-2">Location</span>
  </div>
  <div className="flex flex-col items-center">
    <Star className="text-gray-800 cursor-pointer" size={32} />
    <span className="text-sm text-gray-500 mt-2">Reviews</span>
  </div>
</div>

<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
  <h3 className="font-bold text-2xl mb-4">About me</h3>
  <p className="text-lg text-gray-600">{doctor.about || 'No information available.'}</p>
</div>

<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
  <h3 className="font-bold text-2xl mb-4">Specialties</h3>
  <ul className="list-disc pl-5 text-lg text-gray-600">
    {specialtiesArray.length > 0 ? (
      specialtiesArray.map((specialty, index) => <li key={index}>{specialty}</li>)
    ) : (
      <li>Not specified</li>
    )}
  </ul>
</div>

<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
  <h3 className="font-bold text-2xl mb-4">Certifications</h3>
  <ul className="list-disc pl-5 text-lg text-gray-600">
    {certificationsArray.length > 0 ? (
      certificationsArray.map((certification, index) => <li key={index}>{certification}</li>)
    ) : (
      <li>Not specified</li>
    )}
  </ul>
</div>

<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
  <h3 className="font-bold text-2xl mb-4">Experience</h3>
  <ul className="list-disc pl-5 text-lg text-gray-600">
    {experienceArray.length > 0 ? (
      experienceArray.map((exp, index) => <li key={index}>{exp}</li>)
    ) : (
      <li>Not specified</li>
    )}
  </ul>
</div>

<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
  <h3 className="font-bold text-2xl mb-4">Languages</h3>
  <ul className="list-disc pl-5 text-lg text-gray-600">
    {languagesArray.length > 0 ? (
      languagesArray.map((language, index) => <li key={index}>{language}</li>)
    ) : (
      <li>Not specified</li>
    )}
  </ul>
</div>
<Footer /> 
      </div>
    </div>
  );
}