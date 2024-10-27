"use client";

import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';
import Footer from '@/components/footer/page';

export default function HematologyPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const hematologySearchParams = { ...searchParams, specialty: 'hematology' };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="relative z-10 flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-black">Find a Hematologist</h1>
          <DoctorSearchForm />

          {/* Doctor Cards and Images Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor Cards Section */}
            <div className="md:col-span-2">
              <DoctorSearchResults searchParams={hematologySearchParams} />
            </div>

            {/* Image Section */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[24rem] w-full md:w-[26rem] lg:w-[32rem] mx-auto"> 
                {/* Adjusted height and width for responsive design */}
                <Image
                  src="/images/hemo.webp" 
                  alt="Hematologist"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section className="mt-12 mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">About Hematologists</h2>
            <p className="text-black text-xl mb-4">Hematologists are medical doctors who specialize in the diagnosis, treatment, and prevention of blood disorders and diseases. They play a crucial role in managing conditions affecting blood cells, blood-forming organs, and blood clotting.</p>
            <p className="text-black text-xl mb-4">Our hematologists are experts in various areas, including:</p>
            <ul className="list-disc list-inside text-black text-xl mb-4">
              <li>Anemia</li>
              <li>Leukemia and lymphoma</li>
              <li>Blood clotting disorders</li>
              <li>Sickle cell disease</li>
              <li>Hemophilia</li>
              <li>Bone marrow disorders</li>
            </ul>
            <p className="text-black text-xl">Hematologists work closely with other healthcare providers to ensure comprehensive care for patients with blood-related conditions. Their expertise is essential in diagnosing and treating a wide range of disorders, from common anemias to complex blood cancers. Schedule an appointment with one of our skilled hematologists for expert care in blood health and related concerns.</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}