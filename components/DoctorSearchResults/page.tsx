'use client'

import { useEffect, useState } from 'react';
import DoctorCard from '@/components/doctor-card/page';
import { Doctor } from '@/lib/doctors';

interface DoctorSearchResultsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  profileUrl: string;
}

export default function DoctorSearchResults({ searchParams }: DoctorSearchResultsProps) {
  return (
    <div className="text-center text-gray-500 mt-8">
      No doctors found matching your search criteria.
    </div>
  );
}