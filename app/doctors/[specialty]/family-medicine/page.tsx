"use client";

import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';
import Footer from '@/components/footer/page';

export default function FamilyMedicinePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const familyMedicineSearchParams = { ...searchParams, specialty: 'family medicine' };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="relative z-10 flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-black">Find a Family Medicine Practitioner</h1>
          <DoctorSearchForm />

          {/* Doctor Cards and Images Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor Cards Section */}
            <div className="md:col-span-2">
              <DoctorSearchResults searchParams={familyMedicineSearchParams} />
            </div>

            {/* Image Section */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[24rem] w-full md:w-[26rem] lg:w-[32rem] mx-auto"> 
                {/* Adjusted height and width for responsive design */}
                <Image
                  src="/images/familydoc.webp" 
                  alt="Family Medicine Practitioner"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section className="mt-12 mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">About Family Medicine Practitioners</h2>
            <p className="text-black text-xl mb-4">Family medicine practitioners, also known as family doctors or general practitioners, are medical professionals who provide comprehensive primary care for patients of all ages. They are trained to diagnose and treat a wide range of health conditions and focus on preventive care.</p>
            <p className="text-black text-xl mb-4">Our family medicine practitioners offer a variety of services, including:</p>
            <ul className="list-disc list-inside text-black text-xl mb-4">
              <li>Routine check-ups and physical exams</li>
              <li>Preventive care and vaccinations</li>
              <li>Diagnosis and treatment of acute illnesses</li>
              <li>Management of chronic conditions</li>
              <li>Health education and counseling</li>
              <li>Referrals to specialists when needed</li>
            </ul>
            <p className="text-black text-xl">Family medicine practitioners serve as your first point of contact for healthcare needs and coordinate your overall medical care. They build long-term relationships with patients and their families, providing personalized care throughout all stages of life. Schedule an appointment with one of our experienced family medicine practitioners for comprehensive and continuous healthcare for you and your family.</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}