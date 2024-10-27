"use client";

import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';
import Footer from '@/components/footer/page';

export default function DiagnosticRadiologyPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const radiologySearchParams = { ...searchParams, specialty: 'diagnostic radiology' };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="relative z-10 flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-black">Find a Diagnostic Radiologist</h1>
          <DoctorSearchForm />

          {/* Doctor Cards and Images Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor Cards Section */}
            <div className="md:col-span-2">
              <DoctorSearchResults searchParams={radiologySearchParams} />
            </div>

            {/* Image Section */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[24rem] w-full md:w-[26rem] lg:w-[32rem] mx-auto"> 
                {/* Adjusted height and width for responsive design */}
                <Image
                  src="/images/radiology.jpg" 
                  alt="Diagnostic Radiologist"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section className="mt-12 mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">About Diagnostic Radiologists</h2>
            <p className="text-black text-xl mb-4">Diagnostic radiologists are medical doctors who specialize in diagnosing and treating diseases and injuries using medical imaging techniques. They play a crucial role in patient care by interpreting various types of medical images.</p>
            <p className="text-black text-xl mb-4">Our diagnostic radiologists are experts in various imaging modalities, including:</p>
            <ul className="list-disc list-inside text-black text-xl mb-4">
              <li>X-rays</li>
              <li>Computed Tomography (CT) scans</li>
              <li>Magnetic Resonance Imaging (MRI)</li>
              <li>Ultrasound</li>
              <li>Nuclear medicine</li>
              <li>Positron Emission Tomography (PET) scans</li>
            </ul>
            <p className="text-black text-xl">Diagnostic radiologists work closely with other healthcare providers to ensure accurate diagnoses and effective treatment plans. Their expertise is essential in detecting and monitoring a wide range of medical conditions, from fractures to cancer. Schedule an appointment with one of our skilled diagnostic radiologists for comprehensive imaging services and expert interpretations.</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}