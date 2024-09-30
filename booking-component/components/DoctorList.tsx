import Link from 'next/link';
import { Doctor } from '@/lib/api/types';

interface DoctorListProps {
  doctors: Doctor[];
}

export default function DoctorList({ doctors }: DoctorListProps) {
  return (
    <ul>
      {doctors.map((doctor) => (
        <li key={doctor.id}>
          <Link href={`/doctor/${doctor.id}`}>
            <div>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}