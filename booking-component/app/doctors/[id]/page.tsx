import { getDoctorById } from '@/lib/api/getDoctors';
import { Doctor } from '@/lib/types';
import { Suspense } from 'react';
import AppointmentBooking from '@/components/AppointmentBooking';

function DoctorDetails({ doctor }: { doctor: Doctor }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{doctor.name}</h1>
      <p>Specialty: {doctor.specialty}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Rating: {doctor.rating}</p>
      <AppointmentBooking doctorId={doctor.id} />
    </div>
  );
}

export default async function DoctorDetailsPage({ params }: { params: { id: string } }) {
  const doctor = await getDoctorById(params.id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DoctorDetails doctor={doctor} />
    </Suspense>
  );
}