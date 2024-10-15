import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react'; // Importing location icon
import DoctorSearchForm from '@/components/DoctorSearchForm/page';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/map2.jpg"
          alt="World Map"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-80"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10 z-1"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-white">
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl text-blue-800 font-extrabold text-center mb-8 leading-tight tracking-wide">
          Find Your Doctor <br /> Anywhere in the World
        </h1>
        <p className="text-xl text-black md:text-2xl text-center mb-8 max-w-3xl">
          Search and book appointments with top-rated doctors across the globe, wherever you are.
        </p>

        {/* Doctor Search Form */}
        <div className="w-full max-w-4xl mb-12">
          <DoctorSearchForm />
        </div>

        {/* Featured Doctors Section */}
        <div className="w-full max-w-6xl mt-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Featured Doctors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Doctor Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/placeholder-doctor-image.jpg" 
                alt="Doctor"
                width={250}
                height={250}
                className="mx-auto object-cover"
              />
              <h3 className="text-2xl font-bold text-center mt-4 text-gray-900">Dr. John Doe</h3>
              <p className="text-center text-gray-600">Cardiologist</p>
              
              {/* Location Section with Icon */}
              <div className="flex justify-center items-center mt-4 text-gray-600">
                <MapPin className="w-5 h-5 mr-2" /> {/* Location Icon */}
                <span>New York, USA</span> {/* Replace with dynamic location */}
              </div>

              <Link href="/doctors/[id]" as="/doctors/1">
                <button className="block mt-6 w-full text-center bg-green-700 hover:bg-green-600 text-white text-lg font-bold py-3 rounded-lg">
                  Book Now
                </button>
              </Link>
            </div>
            {/* Add more doctor cards similarly */}
          </div>
        </div>
      </div>
    </div>
  );
}