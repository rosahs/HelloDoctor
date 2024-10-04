'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { Calendar, Clock, Phone, Video, MessageSquare } from 'lucide-react';

export default function AppointmentBooking({ doctorId, doctorName, doctorSpecialty, doctorExperience, doctorFocus }: { 
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorExperience: string;
  doctorFocus: string;
}) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [problem, setProblem] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/bookAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId,
          date,
          time,
          patientName,
          age,
          gender,
          problem,
        }),
      });

      if (response.ok) {
        // Clear the form
        setDate('');
        setTime('');
        setPatientName('');
        setAge('');
        setGender('');
        setProblem('');

        // Show success message
        alert('Appointment booked successfully!');

        // Optionally, redirect to a confirmation page
        // router.push('/appointment-confirmation');
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-blue-50 p-4 rounded-3xl shadow-lg">
      <header className="flex justify-between items-center mb-4">
        <Link href={`/doctors/${doctorId}`} className="text-blue-600">
          <span className="text-2xl">&larr;</span>
        </Link>
        {/* <div className="flex space-x-2">
          <Calendar className="text-blue-600" />
          <Phone className="text-blue-600" />
          <Video className="text-blue-600" />
          <MessageSquare className="text-blue-600" />
        </div> */}
        <div className="flex space-x-2">
          <button className="text-blue-600">?</button>
          <button className="text-blue-600">♥</button>
        </div>
      </header>

      <div className="bg-white rounded-2xl p-4 mb-4">
        <div className="flex items-center mb-2">
          <div className="w-20 h-20 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <h2 className="text-xl font-bold">{doctorName}</h2>
            <p className="text-sm text-gray-600">{doctorSpecialty}</p>
          </div>
        </div>
        <div className="bg-blue-100 rounded-xl p-2 mb-2">
          {/* <p className="text-sm"><Clock className="inline mr-1" size={16} /> {doctorExperience} experience</p> */}
        </div>
        <div className="bg-blue-100 rounded-xl p-2">
          <p className="text-sm">Focus: {doctorFocus}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Select Date</h3>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-2 rounded-lg bg-white"
          />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Available Time</h3>
          <div className="grid grid-cols-4 gap-2">
            {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTime(t)}
                className={`${time === t ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-full py-1 px-2 text-sm`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Patient Details</h3>
          <div className="flex space-x-2 mb-2">
            {['Yourself', 'Another Person'].map((option) => (
              <button
                key={option}
                type="button"
                className={`bg-white text-blue-600 rounded-full py-1 px-4 flex-1`}
              >
                {option}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Full Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
            className="w-full p-2 rounded-lg bg-white mb-2"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="w-full p-2 rounded-lg bg-white mb-2"
          />
          <div className="flex space-x-2 mb-2">
            {['Male', 'Female', 'Other'].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`${gender === g ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-full py-1 px-4 flex-1`}
              >
                {g}
              </button>
            ))}
          </div>
          <textarea
            placeholder="Describe your problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
            className="w-full p-2 rounded-lg bg-white"
            rows={4}
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
          Book Appointment
        </button>
      </form>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-around">
        <button className="text-blue-600">🏠</button>
        <button className="text-blue-600">💬</button>
        <button className="text-blue-600">👤</button>
        <button className="text-blue-600">📅</button>
      </div>
    </div>
  );
}
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// // import { Calendar, Clock, Phone, Video, MessageSquare } from 'lucide-react';

// export default function AppointmentBooking({ doctorId, doctorName, doctorSpecialty, doctorExperience, doctorFocus }: { 
//   doctorId: string;
//   doctorName: string;
//   doctorSpecialty: string;
//   doctorExperience: string;
//   doctorFocus: string;
// }) {
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [patientName, setPatientName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [problem, setProblem] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // ... (keep your existing submit logic)
//   };

//   return (
//     <div className="max-w-md mx-auto bg-blue-50 p-4 rounded-3xl shadow-lg">
//       <header className="flex justify-between items-center mb-4">
//         <Link href={`/doctors/${doctorId}`} className="text-blue-600">
//           <span className="text-2xl">&larr;</span>
//         </Link>
//         {/* <div className="flex space-x-2">
//           <Calendar className="text-blue-600" />
//           <Phone className="text-blue-600" />
//           <Video className="text-blue-600" />
//           <MessageSquare className="text-blue-600" />
//         </div> */}
//         <div className="flex space-x-2">
//           <button className="text-blue-600">?</button>
//           <button className="text-blue-600">♥</button>
//         </div>
//       </header>

//       <div className="bg-white rounded-2xl p-4 mb-4">
//         <div className="flex items-center mb-2">
//           <div className="w-20 h-20 bg-gray-300 rounded-full mr-4"></div>
//           <div>
//             <h2 className="text-xl font-bold">{doctorName}</h2>
//             <p className="text-sm text-gray-600">{doctorSpecialty}</p>
//           </div>
//         </div>
//         <div className="bg-blue-100 rounded-xl p-2 mb-2">
//           {/* <p className="text-sm"><Clock className="inline mr-1" size={16} /> {doctorExperience} experience</p> */}
//         </div>
//         <div className="bg-blue-100 rounded-xl p-2">
//           <p className="text-sm">Focus: {doctorFocus}</p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <h3 className="font-semibold mb-2">Select Date</h3>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//             className="w-full p-2 rounded-lg bg-white"
//           />
//         </div>

//         <div>
//           <h3 className="font-semibold mb-2">Available Time</h3>
//           <div className="grid grid-cols-4 gap-2">
//             {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'].map((t) => (
//               <button
//                 key={t}
//                 type="button"
//                 onClick={() => setTime(t)}
//                 className={`${time === t ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-full py-1 px-2 text-sm`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h3 className="font-semibold mb-2">Patient Details</h3>
//           <div className="flex space-x-2 mb-2">
//             {['Yourself', 'Another Person'].map((option) => (
//               <button
//                 key={option}
//                 type="button"
//                 className={`bg-white text-blue-600 rounded-full py-1 px-4 flex-1`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={patientName}
//             onChange={(e) => setPatientName(e.target.value)}
//             required
//             className="w-full p-2 rounded-lg bg-white mb-2"
//           />
//           <input
//             type="number"
//             placeholder="Age"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             required
//             className="w-full p-2 rounded-lg bg-white mb-2"
//           />
//           <div className="flex space-x-2 mb-2">
//             {['Male', 'Female', 'Other'].map((g) => (
//               <button
//                 key={g}
//                 type="button"
//                 onClick={() => setGender(g)}
//                 className={`${gender === g ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-full py-1 px-4 flex-1`}
//               >
//                 {g}
//               </button>
//             ))}
//           </div>
//           <textarea
//             placeholder="Describe your problem"
//             value={problem}
//             onChange={(e) => setProblem(e.target.value)}
//             required
//             className="w-full p-2 rounded-lg bg-white"
//             rows={4}
//           />
//         </div>

//         <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
//           Book Appointment
//         </button>
//       </form>

//       <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-around">
//         <button className="text-blue-600">🏠</button>
//         <button className="text-blue-600">💬</button>
//         <button className="text-blue-600">👤</button>
//         <button className="text-blue-600">📅</button>
//       </div>
//     </div>
//   );
// }