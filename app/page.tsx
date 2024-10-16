import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react'; // Importing location icon
import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import './HomePage.css'; // Ensure you have this CSS for flag background styles

export default function HomePage() {
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
      <div className="absolute inset-0 bg-black bg-opacity-30 z-1"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-white">
        {/* Heading with Flag Background Letters */}
        <h1 className="text-5xl pt-10 md:text-7xl font-extrabold text-center mb-8 leading-tight tracking-wide">
          Find Your Doctor <br />
          Anywhere in the W🌍rld
        </h1>
        <p className="text-2xl md:text-3xl text-white text-center mb-8 max-w-3xl">
          Search and book appointments with top-rated doctors across the globe, wherever you are.
        </p>

        {/* Doctor Search Form */}
        <div className="w-full max-w-4xl mb-12">
          <Link href="/doctors/search">
            <DoctorSearchForm />
          </Link>
        </div>

        {/* Featured Doctors Section */}
        <div className="w-full max-w-6xl mt-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Featured Doctors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Doctor Card */}
            <div className="rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/placeholder-doctor-image.jpg" 
                alt="Doctor"
                width={250}
                height={250}
                className="mx-auto object-cover"
              />
              <h3 className="text-2xl font-bold text-white text-center mt-4">Dr. John Doe</h3>
              <p className="text-center text-white">Cardiologist</p>
              
              {/* Location Section with Icon */}
              <div className="flex justify-center text-white items-center mt-4">
                <MapPin className="w-5 h-5 text-white mr-2" /> {/* Location Icon */}
                <span>New York, USA</span> {/* Replace with dynamic location */}
              </div>

              <Link href="/doctors/1/reserve">
                <button className="block mt-6 w-full text-center bg-blue-600 hover:bg-green-600 text-white text-lg font-bold py-3 rounded-lg">
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