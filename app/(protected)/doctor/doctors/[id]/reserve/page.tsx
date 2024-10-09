"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { MessageSquare, Bookmark, User, Image as ImageIcon, MapPin, Star } from 'lucide-react';
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
  const [successMessage, setSuccessMessage] = useState('');

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
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call

      // Redirect to success page with appointment details
      router.push(`/doctor/doctors/${doctorId}/reserve/success?date=${selectedDate}&time=${selectedTime}`);
    } catch (error) {
      console.error("Error booking appointment:", error);
      // Handle error (you might want to show an error message to the user)
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex-grow p-4 w-full max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <button onClick={() => router.back()} className="text-white">
            ← Back
          </button>
        </div>

        {/* Logo and Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">HelloDoctor</h1>
          <h2 className="text-xl font-bold text-center">
            Book Appointment with<br />Dr. Emily Chen
          </h2>
        </div>

        {/* Doctor Info Card */}
        <div className="bg-gray-900 rounded-lg p-4 mb-8">
          <div className="flex items-center mb-4">
            <Image
              src={doctor.imageUrl}
              alt={doctor.name}
              width={100}
              height={100}
              className="mr-4 rounded-full"
            />
            <div>
              <h2 className="font-medium text-lg">{doctor.name}</h2>
              <p className="text-gray-400">{doctor.specialty}</p>
            </div>
          </div>
          <div className="bg-gray-800 text-white p-2 rounded-md">
            Focus: {doctor.focus}
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-2 bg-green-800 text-white rounded-md">
            {successMessage}
          </div>
        )}

        {/* Appointment Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-md font-medium text-white">Select Date</label>
            <div className="relative">
              <input 
                type="date" 
                className="mt-1 block w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white appearance-none" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                style={{ colorScheme: 'dark' }}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-md font-medium text-white">Available Time</label>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'].map((time) => (
                <button 
                  key={time} 
                  type="button" 
                  className={`py-2 px-4 border border-gray-600 rounded-md text-md hover:bg-green-600 hover:text-white ${selectedTime === time ? 'bg-green-600 text-white' : 'bg-gray-300 text-black'}`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-md font-medium text-white">Patient Details</label>
            <div className="flex space-x-2 mt-1">
              <button 
                type="button" 
                className={`py-2 px-4 border border-gray-600 rounded-md text-md hover:bg-green-600 hover:text-white ${patientType === 'Yourself' ? 'bg-green-600 text-white' : 'bg-gray-300 text-black'}`}
                onClick={() => handlePatientTypeSelect('Yourself')}
              >
                Yourself
              </button>
              <button 
                type="button" 
                className={`py-2 px-4 border border-gray-600 rounded-md text-md hover:bg-green-600 hover:text-white ${patientType === 'Another Person' ? 'bg-green-600 text-white' : 'bg-gray-300 text-black'}`}
                onClick={() => handlePatientTypeSelect('Another Person')}
              >
                Another Person
              </button>
            </div>
          </div>

          <input 
            type="text" 
            placeholder="Full Name" 
            className="mt-1 p-4 block text-md w-full rounded-md border border-gray-600 bg-gray-800 text-white h-12"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input 
            type="number" 
            placeholder="Age" 
            className="mt-1 p-4 block w-full rounded-md border text-md border-gray-600 bg-gray-800 text-white h-12"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <div className="flex space-x-2">
            {['Male', 'Female', 'Other'].map((genderOption) => (
              <button 
                key={genderOption} 
                type="button" 
                className={`py-2 px-4 border border-gray-600 rounded-md text-md hover:bg-green-600 hover:text-white ${gender === genderOption ? 'bg-green-600 text-white' : 'bg-gray-300 text-black'}`}
                onClick={() => handleGenderSelect(genderOption)}
              >
                {genderOption}
              </button>
            ))}
          </div>

          <textarea 
            placeholder="Describe your problem" 
            rows={6} 
            className="mt-1 block w-full p-4 rounded-md border text-lg border-gray-600 bg-gray-800 text-white"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          ></textarea>

          <button 
            type="submit" 
            className="w-full py-4 px-4 bg-gray-300 text-black rounded-md hover:bg-green-600 hover:text-white"
            disabled={!selectedDate || !selectedTime || !patientType || !fullName || !age || !gender || !problem}
          >
            Book Appointment
          </button>
        </form>
      </div>

      <div className="w-full mx-auto mt-8">
        <Footer />
      </div>
    </div>
  );
}