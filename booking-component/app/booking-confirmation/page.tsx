import Link from 'next/link';

export default function BookingConfirmationPage({ searchParams }: { searchParams: { doctorId?: string, date?: string, time?: string } }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Congratulations!</h1>
          <p className="text-lg mb-6">Your appointment was booked successfully.</p>
          {searchParams.doctorId && (
            <p className="mb-2">Appointment booked with Doctor ID: {searchParams.doctorId}</p>
          )}
          {searchParams.date && searchParams.time && (
            <p className="mb-6">Scheduled for: {searchParams.date} at {searchParams.time}</p>
          )}
          <Link 
            href="/doctors" 
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Back to Doctors List
          </Link>
        </div>
      </div>
    );
}
