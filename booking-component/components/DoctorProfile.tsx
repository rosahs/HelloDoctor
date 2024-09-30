import React from 'react';
import { Doctor } from '@/lib/api/types';

export interface DoctorProfileProps {
  doctor: Doctor;
}

export default function DoctorProfile({ doctor }: DoctorProfileProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm mx-auto">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-500">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">Schedule</button>
      </div>

      {/* Doctor Info */}
      <div className="flex flex-col items-center">
        {/* <img
          src={doctor?.photoUrl || "/api/placeholder/100/100"}
          alt={`Dr. ${doctor?.name}`}
          className="w-28 h-28 rounded-full shadow-lg mb-4"
        /> */}
        <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm mb-2">20 years experience</div>
        <div className="bg-blue-200 text-blue-800 p-3 rounded-lg text-sm w-full text-center">
          Focus: The impact of hormonal imbalances on skin conditions, specializing in acne, hirsutism, and other skin disorders.
        </div>
      </div>

      {/* Doctor Name and Specialization */}
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">Dr. Olivia Turner, M.D.</h2>
        <p className="text-gray-600">Dermato-Endocrinology</p>
      </div>

      {/* Rating and Time */}
      <div className="flex justify-center items-center space-x-2 mt-2">
        <span className="flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-sm">4.5</span>
        </span>
        <span className="border-l-2 border-gray-300 mx-2 h-6"></span>
        <span className="flex items-center">
          <i className="fas fa-clock text-gray-500 mr-1"></i>
          <span className="text-sm">Mon - Sat / 9 AM - 4 PM</span>
        </span>
      </div>

      {/* Profile Description */}
      <p className="text-sm mt-4 text-center px-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      {/* Calendar Section */}
      <div className="bg-blue-100 mt-6 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <button className="text-blue-500">
            <i className="fas fa-chevron-left"></i>
          </button>
          <span className="text-blue-800 font-semibold">Month</span>
          <button className="text-blue-500">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {/* Calendar Days */}
          <div className="text-blue-800">Mon</div>
          <div className="text-blue-800">Tue</div>
          <div className="text-blue-800">Wed</div>
          <div className="text-blue-800">Thu</div>
          <div className="text-blue-800">Fri</div>
          <div className="text-blue-800">Sat</div>
          <div className="text-blue-800">Sun</div>
          {/* Calendar Dates */}
          {[...Array(30)].map((_, i) => (
            <div key={i} className={`p-2 ${i + 1 === 24 ? 'bg-blue-500 text-white rounded-full' : 'text-gray-600'}`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-around mt-6">
        <button className="text-blue-500">
          <i className="fas fa-home"></i>
        </button>
        <button className="text-blue-500">
          <i className="fas fa-user"></i>
        </button>
        <button className="text-blue-500">
          <i className="fas fa-calendar"></i>
        </button>
      </div>
    </div>
  );
}