"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from 'react';
import Footer from "@/components/footer/page";

export default function DoctorReservePage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id as string;

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientType, setPatientType] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [problem, setProblem] = useState('');

  const doctor = {
    id: 1,
    name: "Dr. Emily Chen",
    specialty: "Cardiology",
    imageUrl: "/user2.jpg", 
    focus: "Cardiology"
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handlePatientTypeSelect = (type: string) => {
    setPatientType(type);
  };

  const handleGenderSelect = (genderOption: string) => {
    setGender(genderOption);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      doctorId,
      selectedDate,
      selectedTime,
      patientType,
      fullName,
      age,
      gender,
      problem,
    };

    console.log("Form Data Submitted:", formData);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push(`/appointments/doctor-list/${doctorId}/reserve/success?date=${selectedDate}&time=${selectedTime}`);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <div className="flex-grow p-6 w-full max-w-2xl mx-auto">
        <div className="mb-4">
          <button onClick={() => router.back()} className="text-green-800 hover:text-green-600 transition duration-300">
            ← Back
          </button>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
          <div className="flex items-center mb-4">
            <Image
              src={doctor.imageUrl}
              alt={doctor.name}
              width={100}
              height={100}
              className="mr-4 "
            />
            <div>
              <h2 className="font-medium text-xl">{doctor.name}</h2>
              <p className="text-gray-500">{doctor.specialty}</p>
            </div>
          </div>
          <div className="bg-black text-white p-4 rounded-md">
            Focus: {doctor.focus}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-bold">Select Date</label>
            <input 
              type="date" 
              className="mt-1 block w-full p-2 rounded-md border border-gray-300 bg-white hover:border-green-400 focus:border-green-500 transition duration-300"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-lg font-bold">Available Time</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'].map((time) => (
                <button 
                  key={time} 
                  type="button" 
                  className={`py-2 px-4 border rounded-md ${selectedTime === time ? 'bg-green-500 text-white' : 'bg-white text-gray-900'} hover:bg-green-600 hover:text-white transition duration-300`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-bold">Patient Details</label>
            <div className="flex space-x-2 mt-1">
              <button 
                type="button" 
                className={`py-2 px-4 border rounded-md ${patientType === 'Yourself' ? 'bg-green-500 text-white' : 'bg-white text-gray-900'} hover:bg-green-600 hover:text-white transition duration-300`}
                onClick={() => handlePatientTypeSelect('Yourself')}
              >
                Yourself
              </button>
              <button 
                type="button" 
                className={`py-2 px-4 border rounded-md ${patientType === 'Another Person' ? 'bg-green-500 text-white' : 'bg-white text-gray-900'} hover:bg-green-600 hover:text-white transition duration-300`}
                onClick={() => handlePatientTypeSelect('Another Person')}
              >
                Another Person
              </button>
            </div>
          </div>

          <input 
            type="text" 
            placeholder="Full Name" 
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 bg-white hover:border-green-400 focus:border-green-500 transition duration-300"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input 
            type="number" 
            placeholder="Age" 
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 bg-white hover:border-green-400 focus:border-green-500 transition duration-300"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <div className="flex space-x-2">
            {['Male', 'Female', 'Other'].map((genderOption) => (
              <button 
                key={genderOption} 
                type="button" 
                className={`py-2 px-4 border rounded-md ${gender === genderOption ? 'bg-green-500 text-white' : 'bg-white text-gray-900'} hover:bg-green-600 hover:text-white transition duration-300`}
                onClick={() => handleGenderSelect(genderOption)}
              >
                {genderOption}
              </button>
            ))}
          </div>

          <textarea 
            placeholder="Describe your problem" 
            rows={4} 
            className="mt-1 block w-full p-3 rounded-md border border-gray-300 bg-white hover:border-green-400 focus:border-green-500 transition duration-300"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          ></textarea>

          <button 
            type="submit" 
            className="w-full py-3 bg-custom-green text-white rounded-md hover:bg-green-600 transition duration-300"
            disabled={!selectedDate || !selectedTime || !patientType || !fullName || !age || !gender || !problem}
          >
            Book Appointment
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}