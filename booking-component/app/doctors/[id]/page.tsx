import { getDoctorById } from '@/lib/api/getDoctors';
import { Doctor } from '@/lib/types'
import { Suspense } from 'react';

function DoctorDetails({ doctor }: { doctor: Doctor }) {
  return (
    <div>
      <h1>{doctor.name}</h1>
      <p>Specialty: {doctor.specialty}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Rating: {doctor.rating}</p>
      {/* Add more doctor details as needed */}
    </div>
  );
}

export default async function DoctorDetailsPage({ params }: { params: { id: string } }) {
  try {
    const doctor = await getDoctorById(parseInt(params.id));
    
    if (!doctor) {
      return <div>Doctor not found</div>;
    }

    return (
      <Suspense fallback={<div>Loading doctor details...</div>}>
        <DoctorDetails doctor={doctor} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error in DoctorDetailsPage:', error);
    return <div>Error loading doctor details. Please try again later.</div>;
  }
}