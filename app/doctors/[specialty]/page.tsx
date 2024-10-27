// app/doctors/[specialty]/page.tsx
import { getDoctors } from "@/lib/doctors";
import DoctorCard from "@/components/doctor-card/page";
import Image from "next/image";
import DoctorSearchForm from "@/components/DoctorSearchForm/page";
import { aboutSpecializations } from "@/lib/specilizationsAbout";

export default async function SpecialtyPage({
  params,
}: {
  params: { specialty: string };
}) {
  const { specialty } = params;
  const about = aboutSpecializations.find(
    (item) => item.specialization.toLowerCase() === specialty.toLowerCase()
  );


  const doctors = await getDoctors({ specialization: specialty });

  if (doctors.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No doctors found for {specialty}.
      </p>
    );
  }

  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="relative z-10 flex-grow overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-black">
              Find a {specialty} Specialist
            </h1>
            <DoctorSearchForm />

            {/* Doctor Cards and Images Layout */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Doctor Cards Section */}
              {/* <div className="md:col-span-2">
              <DoctorSearchResults searchParams={cardiologySearchParams} />
            </div> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={{
                    id: doctor.id,
                    name: doctor.user?.name || "Unknown",
                    specialty: doctor.specialization || "Not specified",
                    imageUrl:
                      doctor.images?.[0] ||
                      "/images/placeholder-doctor-image.jpg",
                    // imageUrl: `/doctors/profile/${doctor.id}`,
                  }}
                />
              ))}
            </div>

            {/* Image Section */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[24rem] w-full md:w-[26rem] lg:w-[32rem] mx-auto">
                {/* Adjusted height and width for responsive design */}
                <Image
                  src={about!.image}
                  alt="Cardiology Specialist"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section className="mt-12 mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">
              About {about?.specialization} Specialists
            </h2>
            <p className="text-black text-xl mb-4">{about?.description}</p>
            <p className="text-black text-xl mb-4">
              These specialists can help with a wide range of issues, including
              but not limited to:
            </p>
            <ul className="list-disc list-inside text-black text-xl mb-4">
              {about?.treatments.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div>
              {about?.otherInfo.map((item, i) => (
                <p className="text-black text-xl" key={i}>
                  {item}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
