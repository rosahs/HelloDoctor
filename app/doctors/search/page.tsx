'use client'

import { useState, useEffect } from 'react';
import { Search, Calendar, HelpCircle, Heart, Home, MessageCircle, User, ChevronLeft } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div className="bg-blue-50 rounded-xl p-4 mb-4">
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
      <div className="flex justify-between mt-4">
        <button className="text-blue-600 flex items-center gap-1 text-sm">
          <span>Info</span>
        </button>
        <button className="text-blue-600 flex items-center gap-1 text-sm">
          <Calendar className="w-4 h-4" />
        </button>
        <button className="text-blue-600 flex items-center gap-1 text-sm">
          <HelpCircle className="w-4 h-4" />
        </button>
        <button className="text-blue-600 flex items-center gap-1 text-sm">
          <Heart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default function DoctorSearchPage({ searchParams }: { searchParams: SearchParams }) {
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: itemsPerPage.toString(),
          sort: sortBy,
          ...searchParams
        });

        const response = await fetch(`/api/doctors?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data.doctors || []);
        setTotalPages(Math.ceil((data.total || 0) / itemsPerPage));
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [currentPage, sortBy, searchParams]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="p-4 flex items-center border-b">
        <button className="text-blue-600">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-center flex-1 text-blue-600">Doctors</h1>
        <div className="flex gap-2">
          <button className="text-blue-600">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-blue-600">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sorting options */}
      <div className="p-4 flex gap-2 overflow-x-auto">
        <button 
          className={`px-4 py-1 rounded-full text-sm ${
            sortBy === 'name' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setSortBy('name')}
        >
          A-Z
        </button>
        <button className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
          ⭐️
        </button>
        <button className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
          💝
        </button>
        <button className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
          🎓
        </button>
      </div>

      {/* Doctor cards */}
      <div className="flex-1 p-4 overflow-y-auto">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <DoctorCard key={index} doctor={doctor} />
          ))
        ) : (
          <div className="text-center py-8">No doctors found</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
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
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="border-t bg-white p-4">
        <div className="flex justify-around">
          <button className="text-blue-600">
            <Home className="w-6 h-6" />
          </button>
          <button className="text-gray-400">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="text-gray-400">
            <User className="w-6 h-6" />
          </button>
          <button className="text-gray-400">
            <Calendar className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}