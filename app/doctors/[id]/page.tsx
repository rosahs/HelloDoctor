import DoctorProfileDetails from '@/components/DoctorProfileDetails/page';
import { getDoctorById } from '@/data/doctor';

export default async function DoctorProfilePage({ params }: { params: { id: string } }) {
  try {
    const doctor = await getDoctorById(params.id);

    if (!doctor) {
      return <p className="text-center text-red-500">Doctor not found.</p>; 
    }

    // Ensure the doctor object matches the expected props of DoctorProfileDetails
    return (
      <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
        <DoctorProfileDetails 
          doctor={{
            id: doctor.id,
            name: doctor.id || 'Unknown', // Changed from doctor.name to doctor.id
            specialty: doctor.specialization || 'Not specified',
            imageUrl: doctor.images[0] || '/default-doctor-image.jpg',
            about: doctor.aboutMe || 'No information available.',
            specialties: doctor.specialties ? doctor.specialties.split(',').map(s => s.trim()) : [],
            certifications: doctor.certifications ? doctor.certifications.split(',').map(c => c.trim()) : [],
            experience: doctor.professionalExperience || 'No experience data',
            languages: doctor.languages ? doctor.languages.split(',').map(l => l.trim()) : [],
          }} 
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <p className="text-red-500 text-lg font-semibold">Error loading doctor profile.</p>
      </div>
    );
  }
}