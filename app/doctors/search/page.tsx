import Image from 'next/image';
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';

export default function DoctorSearchPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mapimage9.png"
          alt="World Map"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-80"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-80 z-1"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Find a Doctor</h1>
        <DoctorSearchForm />
        <DoctorSearchResults searchParams={searchParams} />
      </div>
    </div>
  );
}