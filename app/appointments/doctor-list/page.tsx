'use client'

import DoctorsList from "@/app/appointments/components/doctor-list";
import { useRouter } from "next/navigation";
import React from "react";

const DoctorsListPage: React.FC = () => {
  const router = useRouter();

  const doctorsList: Doctor[] = [
    {
      id: "1",
      name: "Dr. Emily Chen",
      specialty: "Cardiology",
      experience: 15,
      rating: 4.8,
      imageUrl: "/doctor1.jpg",
      about:
        "Dr. Chen is a board-certified cardiologist with over 15 years of experience in treating complex heart conditions. She specializes in interventional cardiology and has performed over 1000 successful procedures.",
      specialties: ["Cardiology", "Interventional Cardiology"],
      certifications: ["Board Certified Cardiologist", "Interventional Cardiology Certification"],
      professionalExperience: ["15 years of cardiology experience"],
      languages: ["English", "Mandarin"],
    },
    {
      id: "2",
      name: "Dr. Michael Johnson",
      specialty: "Neurology",
      experience: 20,
      rating: 4.9,
      imageUrl: "/doctor2.jpg",
      about:
        "Dr. Johnson is a renowned neurologist with two decades of experience in diagnosing and treating neurological disorders. He has a particular interest in neurodegenerative diseases and has published numerous papers on Alzheimer's research.",
      specialties: ["Neurology", "Neurodegenerative Diseases"],
      certifications: ["Board Certified Neurologist"],
      professionalExperience: ["20 years of neurology experience"],
      languages: ["English", "Spanish"],
    },
    {
      id: "3",
      name: "Dr. Sarah Patel",
      specialty: "Pediatrics",
      experience: 10,
      rating: 4.7,
      imageUrl: "/doctor3.jpg",
      about:
        "Dr. Patel is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence. She has a special focus on childhood nutrition and obesity prevention.",
      specialties: ["Pediatrics", "Childhood Nutrition"],
      certifications: ["Board Certified Pediatrician"],
      professionalExperience: ["10 years of pediatric experience"],
      languages: ["English", "Hindi", "Gujarati"],
    },
  ];
  // Function to handle doctor selection and redirect
  const handleDoctorSelect = (doctorId: string) => {
    router.push(`/appointments/doctor-list/${doctorId}`); // Redirect to the doctor's appointment page by ID
  };

  return (
    <DoctorsList
      initialDoctors={doctorsList}
    />
  );
};

export default DoctorsListPage;