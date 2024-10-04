import React from 'react';

export default function AppointmentDetails() {
  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Your Appointment</h2>
      <div className="bg-white p-4 rounded-lg mb-4">
        <div className="flex items-center space-x-4">
          <img src="/api/placeholder/60/60" alt="Dr. Olivia Turner" className="w-16 h-16 rounded-full" />
          <div>
            <h3 className="font-bold">Dr. Olivia Turner, M.D.</h3>
            <p className="text-gray-600">Dermato-Endocrinology</p>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span>5</span>
              <span className="ml-4 mr-1">🕒</span>
              <span>60</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg mb-4">
        <p className="font-bold">Month 24, Year</p>
        <p>WED, 10:00 AM</p>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <h3 className="font-bold mb-2">Booking For</h3>
        <p className="font-bold">Another Person</p>
        <div className="grid grid-cols-2 gap-2">
          <p>Full Name</p>
          <p className="text-right">Jane Doe</p>
          <p>Age</p>
          <p className="text-right">30</p>
          <p>Gender</p>
          <p className="text-right">Female</p>
        </div>
        <h3 className="font-bold mt-4 mb-2">Problem</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
  );
}
