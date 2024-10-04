'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BookAppointmentPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientCondition, setPatientCondition] = useState('');

  const resetForm = () => {
    setDate('');
    setTime('');
    setPatientName('');
    setPatientAge('');
    setPatientGender('');
    setPatientCondition('');
  };

  useEffect(() => {
    resetForm();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add appointment data to backend here
    router.push(`/booking-confirmation?doctorId=${params.id}&date=${date}&time=${time}`);
  };

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      <div className="bg-white rounded-3xl shadow-lg p-6 max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Image
            src='/default-doctor-image.jpg'
            alt="Dr. Razha"
            width={84}
            height={84}
            className="mr-4"
            priority
          />
          <h1 className="text-2xl font-bold">Dr. Razha</h1>
        </div>
        <div className="bg-blue-100 rounded-xl p-4 mb-6">
          <p className="font-bold">Focus:</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Select Date</h2>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 mb-6 border rounded"
          />
          
          <h2 className="text-xl font-bold mb-4">Available Time</h2>
          <div className="grid grid-cols-4 gap-2 mb-6">
            {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTime(t)}
                className={`p-2 rounded ${time === t ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                {t}
              </button>
            ))}
          </div>
          
          <h2 className="text-xl font-bold mb-4">Patient Details</h2>
          <div className="flex gap-2 mb-4">
            <button type="button" className="flex-1 p-2 bg-blue-600 text-white rounded">Yourself</button>
            <button type="button" className="flex-1 p-2 bg-gray-200 rounded">Another Person</button>
          </div>
          
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Patient Name"
          />
          
          <input
            type="number"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Age"
          />
          
          <div className="flex gap-2 mb-4">
            {['Male', 'Female'].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setPatientGender(g)}
                className={`flex-1 p-2 rounded ${patientGender === g ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                {g}
              </button>
            ))}
          </div>
          
          <textarea
            value={patientCondition}
            onChange={(e) => setPatientCondition(e.target.value)}
            className="w-full p-2 mb-6 border rounded"
            placeholder="Condition"
          />
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-full text-lg font-bold"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}