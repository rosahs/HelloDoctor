"use client";

import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';
import Footer from '@/components/footer/page';

export default function CardiologyPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const cardiologySearchParams = { ...searchParams, specialty: 'cardiology' };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="relative z-10 flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-black">Find a Cardiology Specialist</h1>
          <DoctorSearchForm />

          {/* Doctor Cards and Images Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor Cards Section */}
            <div className="md:col-span-2">
              <DoctorSearchResults searchParams={cardiologySearchParams} />
            </div>

            {/* Image Section */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[24rem] w-full md:w-[26rem] lg:w-[32rem] mx-auto"> 
                {/* Adjusted height and width for responsive design */}
                <Image
                  src="/images/cardiology.png" 
                  alt="Cardiology Specialist"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section className="mt-12 mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">About Cardiology Specialists</h2>
            <p className="text-black text-xl mb-4">Cardiology specialists, also known as cardiologists, are medical doctors who diagnose and treat heart and blood vessel diseases. They are trained to provide expert care for patients dealing with various cardiovascular conditions.</p>
            <p className="text-black text-xl mb-4">These specialists can help with a wide range of issues, including but not limited to:</p>
            <ul className="list-disc list-inside text-black text-xl mb-4">
              <li>Heart disease</li>
              <li>Hypertension (high blood pressure)</li>
              <li>Heart failure</li>
              <li>Arrhythmias</li>
              <li>Heart attacks</li>
              <li>Preventive cardiology</li>
            </ul>
            <p className="text-black text-xl">If you're experiencing symptoms related to your heart or cardiovascular system, consulting with a cardiologist can help you get the appropriate diagnosis and treatment.</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}