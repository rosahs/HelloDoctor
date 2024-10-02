import { getDoctorById } from '@/lib/api/getDoctors';
import { Doctor } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { FiCamera, FiMapPin, FiStar, FiBookmark, FiMenu } from 'react-icons/fi';
import { FaUserMd, FaCamera, FaMapMarkerAlt, FaStar, FaBookmark, FaBars } from 'react-icons/fa';
import { FaSuitcaseMedical } from "react-icons/fa6";

function DoctorDetails({ doctor }: { doctor: Doctor }) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center mb-8">
        <FaSuitcaseMedical size={40} className="text-green-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Hello Doctor</h1>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Image
              src={doctor.imageUrl || '/Dr_Razha.jpg'}
              alt={doctor.name}
              width={60}
              height={60}
              className="mr-4"
            />
            <div>
              <h1 className="text-xl font-bold">{doctor.name}</h1>
              <p className="text-gray-600">{doctor.specialty} | Internal Medicine Specialist</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-200 rounded-full">
              <FaBookmark size={20} />
            </button>
            <button className="p-2 bg-gray-200 rounded-full">
              <FaBars size={20} />
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-8 mb-8">
          <Link 
            href={`/doctors/${doctor.id}/message`} 
            className="w-80 bg-gray-800 text-white py-5 px-4 rounded text-center text-lg font-medium"
          >
            Message
          </Link>
          <Link 
            href={`/doctors/${doctor.id}/reserve`} 
            className="w-80 bg-gray-800 text-white py-5 px-4 rounded text-center text-lg font-medium"
          >
            Reserve
          </Link>
        </div>

        <div className="flex justify-between mb-4">
          <div className="p-2 bg-gray-100 rounded">
            <FaUserMd size={24} className="text-green-600" />
          </div>
          <div className="p-2 bg-gray-100 rounded">
            <FaCamera size={24} />
          </div>
          <div className="p-2 bg-gray-100 rounded">
            <FaMapMarkerAlt size={24} />
          </div>
          <div className="p-2 bg-gray-100 rounded">
            <FaStar size={24} />
          </div>
        </div>

        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">About me</h2>
          <p className="text-gray-700">{doctor.about}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Specialties</h2>
          <ul className="list-disc list-inside text-gray-700">
            {doctor.specialties.map((specialty, index) => (
              <li key={index}>{specialty}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Certifications</h2>
          <ul className="list-disc list-inside text-gray-700">
            {doctor.certifications.map((certification, index) => (
              <li key={index}>{certification}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Professional Experience</h2>
          <ul className="list-disc list-inside text-gray-700">
            {doctor.professionalExperience.map((experience, index) => (
              <li key={index}>{experience}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Languages</h2>
          <ul className="list-disc list-inside text-gray-700">
            {doctor.languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default async function DoctorDetailsPage({ params }: { params: { id: string } }) {
  const doctor = await getDoctorById(parseInt(params.id));
  if (!doctor) {
    return <div>Doctor not found</div>;
  }
  return <DoctorDetails doctor={doctor} />;
}