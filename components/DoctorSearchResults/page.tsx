import Image from 'next/image';
import Link from 'next/link';
import { getDoctors } from '@/lib/doctors';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  imageUrl: string;
  about: string;
}

export default async function DoctorSearchResults({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Fetch and map the doctors data
  const doctors: Doctor[] = (await getDoctors(searchParams)).map((doctor: any) => ({
    id: doctor.id,
    name: doctor.name || 'Unknown Doctor',
    specialty: doctor.specialization || doctor.specialty,
    experience: doctor.experience || 0,
    rating: doctor.rating || 0,
    imageUrl: doctor.images?.[0] || '/images/placeholder-doctor-image.jpg',
    about: doctor.aboutMe || 'No information available.',
  }));

  // Return a message if no doctors are found
  if (doctors.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No doctors found matching your search criteria.</p>;
  }

  // Render the list of doctors
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <Link key={doctor.id} href={`/doctors/${doctor.id}`} passHref>
          <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
            <Image
              src={doctor.imageUrl}
              alt={`Doctor specializing in ${doctor.specialty}`}
              width={300}
              height={200}
              priority
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
              <p className="text-gray-600 mb-2">{doctor.specialty}</p>
              <p className="text-gray-500 text-sm mb-2 line-clamp-3">{doctor.about}</p>
              <p className="text-gray-500 text-sm mb-2">Rating: {doctor.rating} / 5</p>
              <p className="text-gray-500 text-sm mb-2">Experience: {doctor.experience} years</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}