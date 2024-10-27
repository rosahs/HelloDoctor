"use client";

import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';
import Footer from '@/components/footer/page';

export default function GastroenterologyPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const gastroenterologySearchParams = { ...searchParams, specialty: 'gastroenterology' };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="relative z-10 flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-black">Find a Gastroenterologist</h1>
          <DoctorSearchForm />

          {/* Doctor Cards and Images Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor Cards Section */}
            <div className="md:col-span-2">
              <DoctorSearchResults searchParams={gastroenterologySearchParams} />
            </div>

            {/* Image Section */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[24rem] w-full md:w-[26rem] lg:w-[32rem] mx-auto"> 
                {/* Adjusted height and width for responsive design */}
                <Image
                  src="/images/gastro.jpg" 
                  alt="Gastroenterologist"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section className="mt-12 mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">About Gastroenterologists</h2>
            <p className="text-black text-xl mb-4">Gastroenterologists are medical doctors who specialize in diagnosing and treating disorders of the digestive system. They play a crucial role in patient care by managing conditions affecting the gastrointestinal tract and associated organs.</p>
            <p className="text-black text-xl mb-4">Our gastroenterologists are experts in various areas, including:</p>
            <ul className="list-disc list-inside text-black text-xl mb-4">
              <li>Esophageal disorders</li>
              <li>Stomach and intestinal issues</li>
              <li>Liver diseases</li>
              <li>Pancreatic disorders</li>
              <li>Colorectal health</li>
              <li>Inflammatory bowel diseases</li>
            </ul>
            <p className="text-black text-xl">Gastroenterologists work closely with other healthcare providers to ensure comprehensive care for digestive health. Their expertise is essential in diagnosing and treating a wide range of conditions, from acid reflux to colon cancer. Schedule an appointment with one of our skilled gastroenterologists for expert care in digestive health and related concerns.</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}