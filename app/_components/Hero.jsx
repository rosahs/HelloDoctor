import React from 'react'
import { Button } from "@/components/ui/button"
const Hero = () => {
  return (
    <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <img
          alt=""
          src="./drs4.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="lg:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">Find & Book <span className='text-primary'>Appointments</span> with Certified<span className='text-primary'> Doctors</span> Worldwide</h2>

        <p className="mt-4 text-gray-600">
        Plan your medical experience with ease and confidence, knowing you’re in good hands every step of the way. 
        HelloDoctor will guide you through a comprehensive list of doctors and help you choose the one that best meets your needs. 
        Chat with doctors in real time and book appointments with just one click. Start your journey toward better health today!
        </p>
        <div className='flex justify-center'></div>
        <Button className='mt-4'>Explore Now</Button>
      </div>
    </div>
  </div>
</section>

  )
}


export default Hero