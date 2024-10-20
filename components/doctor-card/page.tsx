import Link from 'next/link';
import { Doctor } from '@prisma/client';

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  return (
    <Link href={`/doctors/${doctor.id}`}>
      <div className="doctor-card">
        {/* Doctor's information */}
        {/* <img src={doctor.imageUrl} alt={doctor.name} />
        <h3>{doctor.name}</h3>
        <p>{doctor.specialty}</p> */}
        {/* Remove the location property as it doesn't exist in the Doctor type */}
        {/* <p>{doctor.location}</p> */}
        {/* Remove or modify the Book Now button */}
      </div>
    </Link>
  );
};

export default DoctorCard;