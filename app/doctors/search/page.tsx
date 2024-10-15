import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import DoctorSearchResults from '@/components/DoctorSearchResults/page';

export default function DoctorSearchPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find a Doctor</h1>
      <DoctorSearchForm />
      <DoctorSearchResults searchParams={searchParams} />
    </div>
  );
}