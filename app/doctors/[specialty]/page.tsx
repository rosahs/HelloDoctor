// app/doctors/[specialty]/page.tsx
import { getDoctors } from "@/lib/doctors";
import DoctorCard from "@/components/doctor-card/page";
import Image from "next/image";
import DoctorSearchForm from "@/components/DoctorSearchForm/page";
import { aboutSpecializations } from "@/lib/specilizationsAbout";

// Helper function to determine the article ("a" or "an") based on the specialty
const getArticle = (specialty: string) => {
  const vowels = ["a", "e", "i", "o", "u"];
  return vowels.includes(specialty[0].toLowerCase()) ? "an" : "a";
};

// Helper function to format specialty string
const formatSpecialty = (specialty: string): string => {
  return specialty.toLowerCase().replace(/-/g, ' ');
};

export default async function SpecialtyPage({
  params,
}: {
  params: { specialty: string };
}) {
  const { specialty } = params;
  const formattedSpecialty = formatSpecialty(specialty);

  const about = aboutSpecializations.find(
    (item) => item.specialization.toLowerCase() === formattedSpecialty.toLowerCase()
  );

  const doctors = await getDoctors({ specialization: specialty });

  if (doctors.length === 0) {
    return (
      <p className="text-center text-[var(--primary-color)] mt-8">
        No doctors found for {formattedSpecialty}.
      </p>
    );
  }

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      {/* Hero Image Section */}
      <div className="relative w-full h-[50vh]">
        {about?.image ? (
          <Image
            src={about.image}
            alt={`${specialty} Specialist`}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-[var(--secondary-color)]">
            <p className="text-[var(--primary-color)]">Image not available</p>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="absolute bottom-10 left-10 text-4xl font-bold text-white">
          Find {getArticle(specialty)} {specialty} Specialist
        </h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <DoctorSearchForm />

        {/* About Section */}
        <section className="mt-12 mb-12 bg-[var(--secondary-color)] p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-4 text-[var(--primary-color)]">
            About <span className="text-[var(--primary-color)] text-4xl">{about?.specialization}</span> Specialists
          </h2>
          <p className="text-black text-2xl mb-4">{about?.description}</p>
          <p className="text-black text-2xl mb-4">
            These specialists can help with a wide range of issues, including
            but not limited to:
          </p>
          <ul className="list-disc list-inside text-[var(--primary-color)] text-2xl mb-4">
            {about?.treatments.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <div>
            {about?.otherInfo.map((item, i) => (
              <p className="text-black text-2xl" key={i}>
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* Doctor Cards Grid */}
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
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}