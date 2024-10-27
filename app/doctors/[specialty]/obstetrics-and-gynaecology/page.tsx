"use client";

import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';
import Footer from '@/components/footer/page';

export default function ObstetricsGynoPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const obstetricsGynoSearchParams = { ...searchParams, specialty: 'obstetrics gynecology' };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="relative z-10 flex-grow overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-black">Find an Obstetrician-Gynecologist</h1>
          <DoctorSearchForm />

          {/* Doctor Cards and Images Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor Cards Section */}
            <div className="md:col-span-2">
              <DoctorSearchResults searchParams={obstetricsGynoSearchParams} />
            </div>

            {/* Image Section */}
            <div className="flex flex-col gap-6">
              <div className="relative h-[24rem] w-full md:w-[26rem] lg:w-[32rem] mx-auto"> 
                {/* Adjusted height and width for responsive design */}
                <Image
                  src="/images/obgyn.jpg" 
                  alt="Obstetrician-Gynecologist"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <section className="mt-12 mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-black">About Obstetrician-Gynecologists</h2>
            <p className="text-black text-xl mb-4">Obstetrician-Gynecologists (OB-GYNs) are medical doctors who specialize in women's health, particularly in reproductive health, pregnancy, and childbirth. They provide comprehensive care for women throughout their lives.</p>
            <p className="text-black text-xl mb-4">Our OB-GYNs offer a wide range of services, including:</p>
            <ul className="list-disc list-inside text-black text-xl mb-4">
              <li>Prenatal care and delivery</li>
              <li>Gynecological exams and screenings</li>
              <li>Family planning and contraception</li>
              <li>Menopause management</li>
              <li>Treatment of reproductive system disorders</li>
              <li>Gynecological surgeries</li>
            </ul>
            <p className="text-black text-xl">OB-GYNs play a crucial role in women's healthcare, providing expert care from adolescence through post-menopause. They are trained to handle both routine check-ups and complex medical conditions related to women's reproductive health. Schedule an appointment with one of our experienced OB-GYNs for comprehensive women's health care and personalized treatment plans.</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}