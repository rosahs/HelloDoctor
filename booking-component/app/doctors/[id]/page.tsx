import { getDoctorById } from '@/lib/api/getDoctors';

export default async function DoctorDetailsPage({ params }: { params: { id: string } }) {
  try {
    const doctor = await getDoctorById(params.id);
    
    if (!doctor) {
      return <div>Doctor not found</div>;
    }

    return (
      <div>
        <h1>{doctor.name}</h1>
        <p>Specialty: {doctor.specialty}</p>
        <p>Experience: {doctor.experience} years</p>
        <p>Rating: {doctor.rating}</p>
        {/* Add more doctor details as needed */}
      </div>
    );
  } catch (error) {
    console.error('Error in DoctorDetailsPage:', error);
    return <div>Error loading doctor details. Please try again later.</div>;
  }
}