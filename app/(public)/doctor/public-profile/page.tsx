"use client";

import MessageButton from "@/components/message/MessageButton";
import Link from "next/link";

const doctors = [
  {
    id: "6712c513e2343a63bdd3a330",
    name: "Rosa Hadi",
  },
];

const DoctorList = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Available Doctors
      </h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id} className="mb-4">
            <Link
              href={`/doctor/${doctor.id}`}
              className="text-blue-600 hover:underline"
            >
              <h3 className="text-lg font-semibold">
                {doctor.name}
              </h3>
            </Link>
            <MessageButton doctorId={doctor.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
