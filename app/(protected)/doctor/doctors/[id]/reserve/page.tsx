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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage("Appointment successfully booked!");
      setSelectedDate('');
      setSelectedTime('');
      setPatientType('');
      setFullName('');
      setAge('');
      setGender('');
      setProblem('');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-4 mb-4">
        {/* Back Button */}
        <div className="mb-4">
          <button onClick={() => router.back()} className="text-green-800">
            ← Back
          </button>
        </div>

        {/* Logo and Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-green-800">HelloDoctor</h1>
          <h2 className="text-xl font-bold text-center">
            Book Appointment with<br />Dr. Emily Chen
          </h2>
        </div>

        {/* Doctor Info Card */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center mb-4">
            <Image
              src={doctor.imageUrl}
              alt={doctor.name}
              width={100}
              height={100}
              className="mr-4"
            />
            <div>
              <h2 className="font-medium text-lg">{doctor.name}</h2>
              <p className="text-gray-600">{doctor.specialty}</p>
            </div>
          </div>
          <div className="bg-blue-100 text-green-800 p-2 rounded-md">
            Focus: {doctor.focus}
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded-md">
            {successMessage}
          </div>
        )}

        {/* Appointment Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-md font-medium  text-gray-700">Select Date</label>
            <input 
              type="date" 
              className="mt-1 block w-full p-2 rounded-md border border-gray-400 shadow-sm" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">Available Time</label>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'].map((time) => (
                <button 
                  key={time} 
                  type="button" 
                  className={`py-2 px-4 border border-gray-400 rounded-md text-md text-black hover:bg-blue-50 ${selectedTime === time ? 'bg-green-600 text-white' : 'bg-white'}`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-md font-medium text-gray-700">Patient Details</label>
            <div className="flex space-x-2 mt-1">
              <button 
                type="button" 
                className={`py-2 px-4 border border-gray-400 rounded-md text-md text-black hover:bg-blue-50 ${patientType === 'Yourself' ? 'bg-green-600 text-white' : 'bg-white'}`}
                onClick={() => handlePatientTypeSelect('Yourself')}
              >
                Yourself
              </button>
              <button 
                type="button" 
                className={`py-2 px-4 border border-gray-400 rounded-md text-md text-black hover:bg-blue-50 ${patientType === 'Another Person' ? 'bg-green-600 text-white' : 'bg-white'}`}
                onClick={() => handlePatientTypeSelect('Another Person')}
              >
                Another Person
              </button>
            </div>
          </div>

          <input 
            type="text" 
            placeholder="Full Name" 
            className="mt-1 p-4 block text-md w-full rounded-md border border-gray-400 shadow-sm h-12"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input 
            type="number" 
            placeholder="Age" 
            className="mt-1 p-4 block w-full rounded-md border text-md border-gray-400 shadow-sm h-12"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <div className="flex space-x-2">
            {['Male', 'Female', 'Other'].map((genderOption) => (
              <button 
                key={genderOption} 
                type="button" 
                className={`py-2 px-4 border border-gray-400 rounded-md text-md text-black hover:bg-blue-50 ${gender === genderOption ? 'bg-green-600 text-white' : 'bg-white'}`}
                onClick={() => handleGenderSelect(genderOption)}
              >
                {genderOption}
              </button>
            ))}
          </div>

          <textarea 
            placeholder="Describe your problem" 
            rows={6} 
            className="mt-1 block w-full p-4 rounded-md border text-lg border-gray-400 shadow-sm"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          ></textarea>

          <button 
            type="submit" 
            className="w-full py-4 px-4 bg-black text-white rounded-md hover:bg-green-600 border border-gray-400"
            disabled={!selectedDate || !selectedTime || !patientType || !fullName || !age || !gender || !problem}
          >
            Book Appointment
          </button>
        </form>
      </div>

      <div className="w-full max-w-lg mx-auto mt-8">
        <Footer />
      </div>
    </div>
  );
}