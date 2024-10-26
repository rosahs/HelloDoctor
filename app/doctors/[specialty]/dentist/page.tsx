"use client";

import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';
import Footer from '@/components/footer/page';

export default function DentistPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const dentistSearchParams = { ...searchParams, specialty: 'dentist' };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="relative z-10 flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-black">Find a Dentist</h1>
          <DoctorSearchForm />

          {/* Doctor Cards and Images Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor Cards Section */}
            <div className="md:col-span-2">
              <DoctorSearchResults searchParams={dentistSearchParams} />
            </div>

            {/* Image Section */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[24rem] w-full md:w-[26rem] lg:w-[32rem] mx-auto"> 
                {/* Adjusted height and width for responsive design */}
                <Image
                  src="/images/teeth.jpg" 
                  alt="Dentist"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section className="mt-12 mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">About Dentists</h2>
            <p className="text-black text-xl mb-4">Dentists are healthcare professionals who specialize in oral health. They diagnose, treat, and prevent problems related to teeth, gums, and other parts of the mouth.</p>
            <p className="text-black text-xl mb-4">Our dentists can help with a wide range of issues, including:</p>
            <ul className="list-disc list-inside text-black text-xl mb-4">
              <li>Regular check-ups and cleanings</li>
              <li>Cavity fillings</li>
              <li>Teeth whitening</li>
              <li>Orthodontic consultations</li>
              <li>Gum care</li>
              <li>Pediatric dentistry</li>
            </ul>
            <p className="text-black text-xl">Regular dental check-ups are essential for maintaining a healthy smile. Our friendly dentists are here to ensure your teeth stay strong and your smile stays bright. Book an appointment today!</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}