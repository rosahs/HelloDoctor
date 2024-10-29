'use client'

import DoctorSearchForm from '@/components/DoctorSearchForm/page';
import Footer from '@/components/footer/page';
import { useState, useEffect } from 'react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
}

interface SearchParams {
  name?: string;
  specialization?: string;
}

export default function DoctorSearchPage({ searchParams }: { searchParams: SearchParams }) {
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 9;

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/doctors/search?page=${currentPage}&limit=${itemsPerPage}&sort=${sortBy}`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            // Add authorization header if required
            // 'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched doctors data:', data);
      
      setDoctors(data.doctors || []);
      setTotalPages(Math.ceil((data.total || 0) / itemsPerPage));
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [currentPage, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-8 backdrop-blur-sm">
          <h1 className="text-3xl text-[var(--primary-color)] font-bold mb-6 text-center">Search for a Doctor</h1>
          <DoctorSearchForm />
          
          {/* All Doctors Section */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl text-[var(--primary-color)] font-bold">All Doctors</h2>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              >
                <option value="name">Sort by Name (A-Z)</option>
                <option value="location">Sort by Location</option>
              </select>
            </div>

            {/* Doctor Cards */}
            <div>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : doctors.length > 0 ? (
                doctors.map((doctor, index) => (
                  <div key={index} className="bg-blue-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={doctor.imageUrl || '/api/placeholder/64/64'}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-blue-600 font-semibold">{doctor.name}</h3>
                        <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">No doctors found</div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === index + 1
                        ? 'bg-[var(--primary-color)] text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}