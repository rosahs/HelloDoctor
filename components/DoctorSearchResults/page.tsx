import Image from 'next/image';
import Link from 'next/link';
import { Doctor, getDoctors } from '@/lib/doctors';

export default async function DoctorSearchResults({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Dynamically construct search criteria based on provided searchParams
  const searchCriteria: { [key: string]: string | undefined } = {};

  // Loop through searchParams to build searchCriteria dynamically
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === 'string' && value.trim() !== '') {
      searchCriteria[key] = value;
    }
  });

  try {
    const doctors = (await getDoctors(searchCriteria)).map((doctor: any) => ({
      id: doctor.id,
      name: doctor.name || 'Unknown Doctor',
      specialty: doctor.specialization,
      experience: doctor.experience || 0,
      rating: doctor.rating || 0,
      imageUrl: doctor.images[0] || '/placeholder-doctor-image.jpg',
      about: doctor.aboutMe || 'No information available.',
      specialties: doctor.specialties || [],
      certifications: doctor.certifications || [],
      professionalExperience: doctor.professionalExperience || [],
      languages: doctor.languages || [],
    }));

    if (doctors.length === 0) {
      return <p className="text-center text-gray-500 mt-8">No doctors found matching your search criteria.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor: Doctor) => (
          <Link key={doctor.id} href={`/doctors/${doctor.id}`} passHref>
            <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <Image
                src={doctor.imageUrl}
                alt={`Doctor specializing in ${doctor.specialty}`}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
                <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                <p className="text-gray-500 text-sm mb-2 line-clamp-3">{doctor.about}</p>
                <p className="text-gray-500 text-sm mb-2">Rating: {doctor.rating} / 5</p>
                <p className="text-gray-500 text-sm mb-2">Experience: {doctor.experience} years</p>
                {doctor.languages && (
                  <p className="text-gray-500 text-sm">
                    Languages: {Array.isArray(doctor.languages) ? doctor.languages.join(', ') : 'Not specified'}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return <p className="text-center text-red-500 mt-8">An error occurred while fetching doctors.</p>;
  }
}