import DoctorProfileDetails from '@/components/DoctorProfileDetails/page';
import { getDoctorById } from '@/data/doctor';

export default async function DoctorProfilePage({ params }: { params: { id: string } }) {
  try {
    const doctor = await getDoctorById(params.id);

    if (!doctor) {
      return <p className="text-center text-red-500">Doctor not found.</p>; // Improve user feedback
    }

    // Ensure doctor object contains all the required fields for DoctorProfileDetails
    return (
      <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50">
        <DoctorProfileDetails 
          doctor={{
            ...doctor, 
            experience: doctor.experience ? doctor.experience.toString() : null, 
            certifications: doctor.certifications || null,
            specialties: doctor.specialties || null,
            languages: doctor.languages || null,
          }} 
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching doctor data:', error);

    // Provide clear feedback on the page
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <p className="text-red-500 text-lg font-semibold">Error loading doctor profile.</p>
      </div>
    );
  }
}