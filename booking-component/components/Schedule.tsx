'use client';

import React, { useState } from 'react';
import { Doctor, Appointment } from '@/lib/api/types';

export interface ScheduleProps {
  doctor: Doctor;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  availableAppointments: Appointment[];
}

export default function Schedule({ doctor, selectedDate, setSelectedDate, availableAppointments }: ScheduleProps) {
  const [selectedDateState, setSelectedDateState] = useState<number>(24);

  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Dr. Olivia Turner, M.D.</h2>
        <select className="bg-white rounded-md p-2">
          <option>Month</option>
        </select>
      </div>
      <div className="flex justify-between mb-4">
        {[22, 23, 24, 25, 26, 27].map((day) => (
          <button
            key={day}
            className={`w-10 h-10 rounded-full ${selectedDateState === day ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => setSelectedDateState(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <h3 className="font-bold mb-2">Available Time</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {['9:00 AM', '10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '3:00 PM'].map((time) => (
          <button key={time} className="bg-white rounded-md p-2 text-sm">
            {time}
          </button>
        ))}
      </div>
      <h3 className="font-bold mb-2">Patient Details</h3>
      <div className="space-y-2">
        <div className="flex space-x-2">
          <button className="bg-white rounded-md p-2 flex-grow">Yourself</button>
          <button className="bg-blue-500 text-white rounded-md p-2 flex-grow">Another Person</button>
        </div>
        <input className="w-full p-2 rounded-md" placeholder="Full Name" defaultValue="Jane Doe" />
        <input className="w-full p-2 rounded-md" placeholder="Age" defaultValue="30" />
        <div className="flex space-x-2">
          <button className="bg-white rounded-md p-2 flex-grow">Male</button>
          <button className="bg-blue-500 text-white rounded-md p-2 flex-grow">Female</button>
          <button className="bg-white rounded-md p-2 flex-grow">Other</button>
        </div>
        <textarea className="w-full p-2 rounded-md" placeholder="Describe your problem" />
      </div>
    </div>
  );
}