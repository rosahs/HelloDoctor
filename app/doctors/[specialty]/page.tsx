// app/doctors/[specialty]/page.tsx
import { useRouter } from 'next/router';
import { getDoctors } from '@/lib/doctors';
import DoctorCard from '@/components/doctor-card/page';

export default async function SpecialtyPage({ params }: { params: { specialty: string } }) {
  const { specialty } = params;

  const doctors = await getDoctors({ specialization: specialty });

  if (doctors.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No doctors found for {specialty}.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={{
            id: doctor.id,
            name: doctor.user?.name || 'Unknown',
            specialty: doctor.specialization || 'Not specified',
            imageUrl: doctor.images?.[0] || '/images/placeholder-doctor-image.jpg',
            profileUrl: `/doctors/profile/${doctor.id}`,
          }}
        />
      ))}
    </div>
  );
}