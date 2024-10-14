import { useRouter } from 'next/router';
import { getDoctorById } from '@/data/doctor';
import { Doctor } from '@/lib/doctors'
import Image from 'next/image';

interface DoctorProfilePageProps {
  doctor: Doctor; // Add the Doctor interface as the type
}

const DoctorProfilePage = ({ doctor }: DoctorProfilePageProps) => {
  const router = useRouter();

  // Loading while fetching data or if the router isn't ready
  if (router.isFallback || !doctor) {
    return <p>Loading...</p>;
  }
  // Show loading while fetching data or if router isn't ready
  if (router.isFallback || !doctor) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{doctor.name}</h1>
      <Image src={doctor.imageUrl} alt={doctor.name} width={200} height={200} />
      <p>Specialty: {doctor.specialty}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>About: {doctor.about}</p>
      {/* Add more details */}
    </div>
  );
};

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const doctor = await getDoctorById(params.id); 

  return {
    props: {
      doctor,
    },
  };
}

export default DoctorProfilePage;

