import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import Footer from '@/components/footer/page';
import FeaturedDoctors from '@/app/doctors/featured/page';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* <div className="fixed inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/surg.png')" }}></div> */}
      <div className="fixed inset-0 bg-white bg-opacity-70 z-1"></div>
      <div className="relative z-10 flex-grow flex flex-col items-center justify-start px-4 sm:px-6 text-[var(--primary-color)] overflow-y-auto">
        <div className="w-full max-w-6xl mt-16 sm:mt-24">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-center mb-4 sm:mb-8 leading-tight tracking-wide text-[var(--primary-color)]">
            Find Your <span className="text-[var(--primary-color)] weight-bold text-4xl sm:text-6xl md:text-7xl">Doctor</span> <br />
            Anywhere in the World
            {/* <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              W
              <span style={{ display: 'inline-block', width: 0 }} />
              <Image 
                src="/images/globenobg2.png" 
                alt="World" 
                width={150} 
                height={150} 
                className="inline-block align-middle w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28" // Responsive widths
                style={{ margin: '0 -10px' }} // Reducing the space between W and the globe
              />
              <span style={{ display: 'inline-block', width: 0 }} />
              rld
            </span> */}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-[#8a99c9] text-center mb-8 sm:mb-10 max-w-3xl mx-auto">
            Connect with trusted doctors worldwide, access affordable medical care, and find the right specialist wherever you are.
          </p>
          <div className="w-full max-w-4xl mb-12 sm:mb-36 mx-auto">
            <DoctorSearchForm />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-[var(--primary-color)]">
            Featured Doctors
          </h2>
          
          {/* Render FeaturedDoctors component */}
          <FeaturedDoctors />
        </div>
      </div>
      <div className="relative z-20 w-full opacity-60 mt-16">
        <Footer />
      </div>
    </div>
  );
}