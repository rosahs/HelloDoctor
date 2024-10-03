import { getDoctorById } from '@/lib/api/getDoctors';
import { Doctor } from '@/lib/types';
import Link from 'next/link';
import { Calendar, Phone, Video, MessageSquare, Star, Clock } from 'lucide-react';
import DoctorImage from './DoctorImage';
import DynamicDoctorProfile from '@/components/DynamicDoctorProfile';

function DoctorDetails({ doctor }: { doctor: Doctor }) {
  return (
    <div className="max-w-md mx-auto bg-blue-50 min-h-screen p-4">
      <header className="flex justify-between items-center mb-4">
        <Link href="/doctors" className="text-blue-600">
          <span className="text-2xl">&larr;</span>
        </Link>
        {/* <div className="flex space-x-2">
          <Calendar className="text-blue-600" size={24} />
          <Phone className="text-blue-600" size={24} />
          <Video className="text-blue-600" size={24} />
          <MessageSquare className="text-blue-600" size={24} />
        </div> */}
        <div className="flex space-x-2">
          <button className="text-blue-600">?</button>
          <button className="text-blue-600">♥</button>
        </div>
      </header>

      <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg">
        <div className="flex items-center mb-4">
          <DoctorImage
            src={doctor.imageUrl || '/default-doctor-image.jpg'}
            alt={doctor.name}
            fallbackSrc="/default-doctor-image.jpg"
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <h1 className="text-xl font-bold">{doctor.name}</h1>
            <p className="text-gray-600">{doctor.specialty}</p>
          </div>
        </div>

        <div className="bg-blue-100 rounded-2xl p-3 mb-4">
          <div className="flex items-center mb-2">
            <Clock className="text-blue-600 mr-2" size={16} />
            <p className="text-sm">{doctor.yearsOfExperience} years experience</p>
          </div>
          <p className="text-sm">Focus: {doctor.focusArea}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-1" size={16} />
            <span>{doctor.rating}</span>
          </div>
          <span>({doctor.reviewCount || 0} reviews)</span>
          <span>{doctor.availableDays || 'N/A'}</span>
          <span>{doctor.availableHours || 'N/A'}</span>
        </div>

        {/* Add the DynamicDoctorProfile component here */}
        <DynamicDoctorProfile initialDoctor={doctor} id={doctor.id.toString()} />
      </div>

      <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">About</h2>
        <p className="text-gray-700 mb-4">{doctor.about}</p>

        <h2 className="text-lg font-semibold mb-2">Specialties</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          {doctor.specialties && doctor.specialties.length > 0 ? (
            doctor.specialties.map((specialty, index) => (
              <li key={index}>{specialty}</li>
            ))
          ) : (
            <li>No specialties listed</li>
          )}
        </ul>

        <h2 className="text-lg font-semibold mb-2">Languages</h2>
        <ul className="list-disc list-inside text-gray-700">
          {doctor.languages && doctor.languages.length > 0 ? (
            doctor.languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))
          ) : (
            <li>No languages listed</li>
          )}
        </ul>
      </div>

      <div className="flex space-x-4 mb-6">
        <Link 
          href={`/doctors/${doctor.id}/message`} 
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-full text-center text-lg font-medium"
        >
          Message
        </Link>
        <Link 
          href={`/doctors/${doctor.id}/reserve`} 
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-full text-center text-lg font-medium"
        >
          Reserve
        </Link>
      </div>

      {/* <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-around">
        <button className="text-blue-600">🏠</button>
        <button className="text-blue-600">💬</button>
        <button className="text-blue-600">👤</button>
        <button className="text-blue-600">📅</button>
      </div> */}
    </div>
  );
}

export default async function DoctorDetailsPage({ params }: { params: { id: string } }) {
  const doctor = await getDoctorById(parseInt(params.id));
  if (!doctor) {
    return <div>Doctor not found</div>;
  }
  return <DynamicDoctorProfile initialDoctor={doctor} id={params.id} />;
}