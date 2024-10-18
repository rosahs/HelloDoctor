// Example: Adjusting Featured Doctors Component

import { useEffect, useState } from 'react';

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors/featured');
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          console.error('Failed to fetch featured doctors');
        }
      } catch (error) {
        console.error('Error fetching featured doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div>
      {doctors.length > 0 ? (
        doctors.map((doctor: { name: string; specialty: string }, index: number) => (
          <div key={index}>
            <p>{doctor.name}</p>
            <p>{doctor.specialty}</p>
          </div>
        ))
      ) : (
        <p>No featured doctors available at this time.</p>
      )}
    </div>
  );
}