"use client";

import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';
import Footer from '@/components/footer/page';

export default function DermatologyPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const dermatologySearchParams = { ...searchParams, specialty: 'dermatology' };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="relative z-10 flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-black">Find a Dermatologist</h1>
          <DoctorSearchForm />

          {/* Doctor Cards and Images Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor Cards Section */}
            <div className="md:col-span-2">
              <DoctorSearchResults searchParams={dermatologySearchParams} />
            </div>

            {/* Image Section */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[24rem] w-full md:w-[26rem] lg:w-[32rem] mx-auto"> 
                {/* Adjusted height and width for responsive design */}
                <Image
                  src="/images/derma.jpg" 
                  alt="Dermatologist"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section className="mt-12 mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">About Dermatologists</h2>
            <p className="text-black text-xl mb-4">Dermatologists are medical doctors who specialize in conditions that affect the skin, hair, and nails. They diagnose and treat a wide variety of skin-related issues, from common problems to rare and complex conditions.</p>
            <p className="text-black text-xl mb-4">Our dermatologists can help with a wide range of issues, including:</p>
            <ul className="list-disc list-inside text-black text-xl mb-4">
              <li>Acne and other skin conditions</li>
              <li>Skin cancer screenings and treatment</li>
              <li>Eczema and psoriasis management</li>
              <li>Cosmetic procedures</li>
              <li>Hair loss treatments</li>
              <li>Nail disorders</li>
            </ul>
            <p className="text-black text-xl">Regular check-ups with a dermatologist are important for maintaining healthy skin and detecting potential issues early. Our experienced dermatologists are here to help you achieve and maintain healthy, beautiful skin. Schedule an appointment today!</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}