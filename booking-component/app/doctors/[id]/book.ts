import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AppointmentBooking from '@/components/AppointmentBooking';
import { getDoctor } from '@/lib/api/getDoctor';

export default function BookAppointmentPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      getDoctor(id)
        .then((data) => {
          setDoctor(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!doctor) return <div>Doctor not found</div>;

  return (
    <AppointmentBooking
      doctorId={doctor.id}
      doctorName={doctor.name}
      doctorSpecialty={doctor.specialty}
      doctorExperience={`${doctor.yearsOfExperience} years`}
      doctorFocus={doctor.focusArea}
    />
  );
}