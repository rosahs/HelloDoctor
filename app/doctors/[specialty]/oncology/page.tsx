"use client";

import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';
import Footer from '@/components/footer/page';

export default function OncologyPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Ensure that the specialty is set to 'oncology' in the search params
  const oncologySearchParams = { ...searchParams, specialty: 'oncology' };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background and Overlay */}
      {/* <div className="fixed inset-0 z-0">
        <Image
          src="/images/cancer-pat.webp" 
          alt="Oncology Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          className="opacity-100"
          priority
        />
      </div> */}
      <div className="fixed inset-0 bottom-auto z-1" style={{ height: '100%' }}></div>

      {/* Main Content */}
      <div className="relative z-10 flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-black">Find an Oncology Specialist</h1>
          <DoctorSearchForm />

          {/* Doctor Cards and Images Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor Cards Section */}
            <div className="md:col-span-2">
              <DoctorSearchResults searchParams={oncologySearchParams} />
            </div>

            {/* Image Section */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[24rem] w-full md:w-[30rem] mx-auto"> {/* Wider width with a 30rem width */}
                <Image
                  src="/images/cancerdr2.jpg" 
                  alt="Oncology Specialist"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section className="mt-12 mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">About Oncology Specialists</h2>
            <p className="text-black text-xl mb-4">Oncology specialists, or oncologists, are medical doctors who specialize in diagnosing and treating various types of cancer. They work with patients to develop personalized treatment plans, which may include surgery, chemotherapy, radiation therapy, and other innovative treatments.</p>
            <p className="text-black text-xl mb-4">Oncologists often specialize in treating specific types of cancer, such as:</p>
            <ul className="list-disc list-inside text-black text-xl mb-4">
              <li>Breast cancer</li>
              <li>Lung cancer</li>
              <li>Prostate cancer</li>
              <li>Blood cancers (like leukemia and lymphoma)</li>
              <li>Skin cancer</li>
              <li>Gynecologic cancers</li>
            </ul>
            <p className="text-black text-xl">If you're dealing with a cancer diagnosis or seeking information on cancer treatments, consulting with an oncologist can provide guidance and specialized care tailored to your needs.</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}