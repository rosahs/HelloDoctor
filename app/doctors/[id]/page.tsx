// app/doctors/[id]/page.tsx
import DoctorProfileDetails from '@/components/DoctorProfileDetails/page'; // Import your new component
import { getDoctorById } from '@/data/doctor'; // Replace with actual data fetching logic

export default async function DoctorProfilePage({ params }: { params: { id: string } }) {
  try {
    const doctor = await getDoctorById(params.id);

    if (!doctor) {
      return <p>Doctor not found.</p>;
    }

    return (
      <div className="min-h-screen flex flex-col items-centerp-8">
        {/* Use the modular component here */}
        <DoctorProfileDetails doctor={{
          ...doctor,
          experience: doctor.experience ? doctor.experience.toString() : null
        }} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return <p>Error occurred while fetching doctor data.</p>;
  }
}