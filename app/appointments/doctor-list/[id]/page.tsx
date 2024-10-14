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
  const doctor = await getDoctorById(params.id); // Fetch doctor by ID

  return {
    props: {
      doctor,
    },
  };
}

export default DoctorProfilePage;



// "use client";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import { MessageSquare, Bookmark, User, Image as ImageIcon, MapPin, Star } from 'lucide-react';
// import Footer from "@/components/footer/page";
// import Link from "next/link";

// export default function DoctorReservePage() {
//   const params = useParams();
//   const router = useRouter();
//   const doctorId = params.id as string;

//   const doctor = {
//     id: 1,
//     name: "Dr. Razha",
//     specialty: "Cardiologist | Internal Medicine Specialist",
//     imageUrl: "/user2.jpg",
//     about: "Whether you're a patient looking for quality care or a doctor wanting to expand your reach, DocFinder has you covered.",
//     specialties: ["Cardiology", "Internal Medicine", "Heart Failure Management"],
//     certifications: [
//       "American Board of Internal Medicine (ABIM) - Certified in Cardiovascular Disease",
//       "Advanced Cardiovascular Life Support (ACLS)",
//       "Basic Life Support (BLS)"
//     ],
//     experience: ["Cardiology", "Internal Medicine", "Heart Failure Management"],
//     languages: ["English (Fluent)", "Kurdish (Conversational)"]
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="flex-grow p-6">
//         <div className="w-full max-w-6xl mx-auto">
//           {/* Back Button */}
//           <div className="mb-6">
//             <button onClick={() => router.back()} className="text-green-800 text-2xl">
//               ← Back
//             </button>
//           </div>

//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center">
//               <Image
//                 src={doctor.imageUrl}
//                 alt={doctor.name}
//                 width={100}
//                 height={100}
//                 className="rounded-full"
//               />
//               <div className="ml-6">
//                 <h2 className="font-bold text-2xl">{doctor.name}</h2>
//                 <p className="text-gray-600 text-xl">{doctor.specialty}</p>
//               </div>
//             </div>
//             <Bookmark className="text-gray-800" size={32} />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between mb-6">
//             <button className="w-1/2 h-16 bg-black text-white text-2xl p-3 rounded-md mr-4">
//               <MessageSquare className="inline-block mr-2" /> Message
//             </button>
//             <Link href={`/appointments/doctor-list/${doctorId}/reserve`} className="w-1/2">
//               <button className="w-full h-16 bg-black text-white text-2xl p-3 rounded-md">
//                 Reserve
//               </button>
//             </Link>
//           </div>

//           {/* Section Icons */}
//           <div className="flex justify-between mb-6">
//             <div className="flex overflow-x-auto">
//               <User className="text-gray-800 min-w-[32px] mr-4" size={32} />
//               <ImageIcon className="text-gray-800 min-w-[32px] mr-4" size={32} />
//               <MapPin className="text-gray-800 min-w-[32px] mr-4" size={32} />
//               <Star className="text-gray-800 min-w-[32px]" size={32} />
//             </div>
//           </div>

//           {/* About */}
//           <div className="mb-6">
//             <h3 className="font-bold text-2xl">About me</h3>
//             <p className="text-gray-600 text-xl">{doctor.about}</p>
//           </div>

//           {/* Specialties */}
//           <div className="mb-6">
//             <h3 className="font-bold text-2xl">Specialties</h3>
//             <ul className="list-disc ml-5 text-gray-600 text-xl">
//               {doctor.specialties.map((specialty, index) => (
//                 <li key={index}>{specialty}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Certifications */}
//           <div className="mb-6">
//             <h3 className="font-bold text-2xl">Certifications</h3>
//             <ul className="list-disc ml-5 text-gray-600 text-xl">
//               {doctor.certifications.map((certification, index) => (
//                 <li key={index}>{certification}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Professional Experience */}
//           <div className="mb-6">
//             <h3 className="font-bold text-2xl">Professional Experience</h3>
//             <ul className="list-disc ml-5 text-gray-600 text-xl">
//               {doctor.experience.map((exp, index) => (
//                 <li key={index}>{exp}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Languages */}
//           <div>
//             <h3 className="font-bold text-2xl">Languages</h3>
//             <ul className="list-disc ml-5 text-gray-600 text-xl">
//               {doctor.languages.map((language, index) => (
//                 <li key={index}>{language}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }