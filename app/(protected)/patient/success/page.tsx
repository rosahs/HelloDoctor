"use client";
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AppointmentSuccessPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const time = searchParams.get('time');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">
          Your appointment request has been successfully submitted!
        </h1>
        <p className="text-gray-400 mb-8">
          We'll be in touch shortly to confirm.
        </p>
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <h2 className="text-xl mb-4">Requested appointment details:</h2>
          <p><span className="font-bold">Date & Time:</span> {date} - {time}</p>
        </div>
        <Link href="/" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}