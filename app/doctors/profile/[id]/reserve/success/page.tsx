"use client";
import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AppointmentSuccessPage() {
  const searchParams = useSearchParams();
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [formattedTime, setFormattedTime] = useState<string | null>(null);

  useEffect(() => {
    const rawDate = searchParams.get('date');
    const time = searchParams.get('time');

    if (rawDate) {
      const dateObject = new Date(rawDate);
      const formattedDateString = dateObject.toLocaleDateString(undefined, {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      const formattedTimeString = time ? time : dateObject.toLocaleTimeString(undefined, {
        hour: '2-digit', minute: '2-digit'
      });

      setFormattedDate(formattedDateString);
      setFormattedTime(formattedTimeString);
    }

    console.log('Date:', rawDate);
    console.log('Time:', time);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-4 pt-0">
      <div className="max-w-md w-full text-center bg-[var(--secondary-color)] p-6 rounded-lg">
        <div className="mb-6">
          <CheckCircle2 className="mx-auto h-16 w-16 text-custom-green" />
        </div>
        <h1 className="text-3xl font-bold mb-2">
          Your appointment request has been successfully submitted!
        </h1>
        <p className="text-[var(--primary-color)] mb-6">
          We&apos;ll be in touch shortly to confirm.
        </p>
        <div className="bg-white rounded-lg p-4 mb-6">
          <h2 className="text-xl mb-4">Requested appointment details:</h2>
          <p><span className="font-bold">Date & Time:</span> {formattedDate} - {formattedTime}</p>
        </div>
        <Link href="/" className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}