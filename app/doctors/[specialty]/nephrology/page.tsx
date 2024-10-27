"use client";

import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';
import Footer from '@/components/footer/page';

export default function NephrologyPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const nephrologySearchParams = { ...searchParams, specialty: 'nephrology' };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="relative z-10 flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-black">Find a Nephrologist</h1>
          <DoctorSearchForm />

          {/* Doctor Cards and Images Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor Cards Section */}
            <div className="md:col-span-2">
              <DoctorSearchResults searchParams={nephrologySearchParams} />
            </div>

            {/* Image Section */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[24rem] w-full md:w-[26rem] lg:w-[32rem] mx-auto"> 
                {/* Adjusted height and width for responsive design */}
                <Image
                  src="/images/kidney.jpeg" 
                  alt="Nephrologist"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section className="mt-12 mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">About Nephrologists</h2>
            <p className="text-black text-xl mb-4">Nephrologists are medical doctors who specialize in diagnosing and treating diseases and disorders related to the kidneys. They play a crucial role in managing kidney health and related conditions.</p>
            <p className="text-black text-xl mb-4">Our nephrologists are experts in various areas, including:</p>
            <ul className="list-disc list-inside text-black text-xl mb-4">
              <li>Chronic kidney disease</li>
              <li>Acute kidney injury</li>
              <li>Hypertension (high blood pressure)</li>
              <li>Dialysis treatment</li>
              <li>Kidney transplantation</li>
              <li>Electrolyte disorders</li>
            </ul>
            <p className="text-black text-xl">Nephrologists work closely with other healthcare providers to ensure comprehensive care for patients with kidney-related conditions. Their expertise is essential in managing complex kidney diseases and preventing further complications. Schedule an appointment with one of our skilled nephrologists for expert care in kidney health and related concerns.</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}