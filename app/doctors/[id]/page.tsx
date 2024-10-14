import DoctorProfileDetails from '@/components/DoctorProfileDetails/page';
import { getDoctorById } from '@/data/doctor';

export default async function DoctorProfilePage({ params }: { params: { id: string } }) {
  try {
    const doctor = await getDoctorById(params.id);
    if (!doctor) return <p>Doctor not found.</p>;
    return (
      <div className="min-h-screen flex flex-col items-center p-2">
        <DoctorProfileDetails doctor={{...doctor, experience: doctor.experience?.toString() || null}} />
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return <p>Error fetching data.</p>;
  }
}