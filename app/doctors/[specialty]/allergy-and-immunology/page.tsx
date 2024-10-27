"use client";

import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';
import Footer from '@/components/footer/page';

export default function AllergyPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Ensure that the specialty is set to 'allergy' in the search params
  const allergySearchParams = { ...searchParams, specialty: 'allergy' };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background and Overlay */}
      {/* <div className="fixed inset-0 z-0">
        <Image
          src="/images/sneeze2.jpg"
          alt="Allergy Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          className="opacity-80"
          priority
        />
      </div> */}
      <div className="fixed inset-0 bottom-auto z-1" style={{ height: '100%' }}></div>

      {/* Main Content */}
      <div className="relative z-10 flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-black">Find an Allergy Specialist</h1>
          <DoctorSearchForm />

          {/* Doctor Cards and Images Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Doctor Cards Section */}
            <div className="md:col-span-2">
              <DoctorSearchResults searchParams={allergySearchParams} />
            </div>

            {/* Image Section */}
            <div className="flex flex-col">
              <div className="relative h-96 w-full md:w-[30rem] mx-auto">
                <Image
                  src="/images/sneeze2.jpg"
                  alt="Allergy Specialist 1"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-black">About Allergy Specialists</h2>
            <p className="text-black mb-4">Allergy specialists, also known as allergists, are medical doctors who specialize in diagnosing and treating allergies, asthma, and other immune system disorders. They undergo extensive training to provide expert care for patients suffering from various allergic conditions.</p>
            <p className="text-black mb-4">These specialists can help with a wide range of issues, including but not limited to:</p>
            <ul className="list-disc list-inside text-black mb-4">
              <li>Seasonal allergies</li>
              <li>Food allergies</li>
              <li>Drug allergies</li>
              <li>Asthma</li>
              <li>Eczema</li>
              <li>Anaphylaxis</li>
            </ul>
            <p className="text-black">If you're experiencing persistent allergy symptoms or have concerns about potential allergies, consulting with an allergy specialist can help you find the right diagnosis and treatment plan.</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}