import Image from 'next/image';
import { Bookmark, MessageSquare, User, Image as ImageIcon, MapPin, Star } from 'lucide-react'; // Icons
import Link from 'next/link';

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
    <div className="min-h-screen bg-white flex flex-col p-8">
      <div className="flex-grow max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center">
            <Image
              src={doctor.imageUrl || '/placeholder-doctor-image.jpg'}
              alt={doctor.name}
              width={150}
              height={150}
              className="rounded-full"
            />
            <div className="ml-8">
              <h2 className="text-4xl font-bold">{doctor.name}</h2>
              <p className="text-3xl font-bold text-gray-600">{doctor.specialty}</p>
            </div>
          </div>
          <Bookmark className="text-gray-800" size={48} />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mb-10">
          <button className="w-[48%] h-24 bg-black text-white text-2xl font-semibold rounded-md flex items-center justify-center transition-colors duration-300 hover:bg-green-600">
            <MessageSquare className="mr-3" size={40} /> Message
          </button>
          <Link href={`/appointments/doctor-list/${doctor.id}/reserve`} className="w-[48%]">
            <button className="w-full h-24 bg-black text-white text-2xl font-semibold rounded-md flex items-center justify-center transition-colors duration-300 hover:bg-green-600">
              <Star className="mr-3" size={40} /> Reserve
            </button>
          </Link>
        </div>

        {/* Icons Row */}
        <div className="flex justify-between mb-10 bg-gray-200 p-6 rounded-md">
          <User className="text-gray-800" size={48} />
          <ImageIcon className="text-gray-800" size={48} />
          <MapPin className="text-gray-800" size={48} />
          <Star className="text-gray-800" size={48} />
        </div>

        {/* About Section */}
        <div className="mb-10">
          <h3 className="font-bold text-3xl mb-4">About me</h3>
          <p className="text-2xl text-gray-600">{doctor.about || 'No information available.'}</p>
        </div>

        {/* Specialties */}
        <div className="mb-10">
          <h3 className="font-bold text-3xl mb-4">Specialties</h3>
          <ul className="list-disc ml-8 text-2xl text-gray-600">
            {specialtiesArray.length > 0 ? (
              specialtiesArray.map((specialty, index) => <li key={index}>{specialty}</li>)
            ) : (
              <li>Not specified</li>
            )}
          </ul>
        </div>

        {/* Certifications */}
        <div className="mb-10">
          <h3 className="font-bold text-3xl mb-4">Certifications</h3>
          <ul className="list-disc ml-8 text-2xl text-gray-600">
            {certificationsArray.length > 0 ? (
              certificationsArray.map((certification, index) => <li key={index}>{certification}</li>)
            ) : (
              <li>Not specified</li>
            )}
          </ul>
        </div>

        {/* Professional Experience */}
        <div className="mb-10">
          <h3 className="font-bold text-3xl mb-4">Professional Experience</h3>
          <ul className="list-disc ml-8 text-2xl text-gray-600">
            {experienceArray.length > 0 ? (
              experienceArray.map((exp, index) => <li key={index}>{exp}</li>)
            ) : (
              <li>Not specified</li>
            )}
          </ul>
        </div>

        {/* Languages */}
        <div className="mb-10">
          <h3 className="font-bold text-3xl mb-4">Languages</h3>
          <ul className="list-disc ml-8 text-2xl text-gray-600">
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