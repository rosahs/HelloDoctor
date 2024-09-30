import BookingApp from '../components/BookingApp';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Doctor Booking</h1>
      <Link href="/doctors" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Doctors
      </Link>
    </main>
  );
}
