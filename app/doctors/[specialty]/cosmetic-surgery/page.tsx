"use client";

import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';
import Footer from '@/components/footer/page';

export default function CosmeticSurgeryPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const cosmeticSurgerySearchParams = { ...searchParams, specialty: 'cosmetic surgery' };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="relative z-10 flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-black">Find a Cosmetic Surgeon</h1>
          <DoctorSearchForm />

          {/* Doctor Cards and Images Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor Cards Section */}
            <div className="md:col-span-2">
              <DoctorSearchResults searchParams={cosmeticSurgerySearchParams} />
            </div>

            {/* Image Section */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[24rem] w-full md:w-[26rem] lg:w-[32rem] mx-auto"> 
                {/* Adjusted height and width for responsive design */}
                <Image
                  src="/images/cosmetic-surgery.png" 
                  alt="Cosmetic Surgeon"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section className="mt-12 mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">About Cosmetic Surgeons</h2>
            <p className="text-black text-xl mb-4">Cosmetic surgeons are medical doctors who specialize in enhancing appearance through surgical and medical techniques. They play a crucial role in helping patients achieve their aesthetic goals and improve their self-confidence.</p>
            <p className="text-black text-xl mb-4">Our cosmetic surgeons are experts in various procedures, including:</p>
            <ul className="list-disc list-inside text-black text-xl mb-4">
              <li>Facial rejuvenation (facelifts, eyelid surgery)</li>
              <li>Breast augmentation and reduction</li>
              <li>Body contouring (liposuction, tummy tucks)</li>
              <li>Rhinoplasty (nose reshaping)</li>
              <li>Non-surgical treatments (Botox, fillers)</li>
              <li>Reconstructive procedures</li>
            </ul>
            <p className="text-black text-xl">Cosmetic surgeons work closely with patients to understand their desires and develop personalized treatment plans. Their expertise is essential in achieving natural-looking results while prioritizing patient safety. Schedule a consultation with one of our skilled cosmetic surgeons to discuss your aesthetic goals and explore your options for enhancing your appearance.</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}