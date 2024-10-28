// app/doctors/search/page.tsx

import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';
import Footer from '@/components/footer/page';

export default function DoctorSearchPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Top Half with Background Image */}
      <div className="w-full h-[50vh] relative">
        <Image
          src="/images/dr.avif"
          alt="World Map"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Bottom Half with Content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 backdrop-blur-sm shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-white">Find a Doctor</h1>
          <DoctorSearchForm />
          <DoctorSearchResults searchParams={searchParams} />
        </div>
        <Footer />
      </div>
    </div>
  );
}