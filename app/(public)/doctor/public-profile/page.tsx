"use client";

import MessageButton from "@/components/message/MessageButton";
import Link from "next/link";

const doctors = [
  {
    id: "670bf4b019ae2fa8cd2cca3d",
    name: "Raj Mahtaj",
  },
  {
    id: "6712038d835ebec7b2db7830",
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
