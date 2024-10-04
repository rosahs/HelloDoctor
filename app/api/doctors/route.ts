import { NextResponse } from 'next/server';

export async function GET() {
  // Fetch all doctors (replace with your actual data fetching logic)
  const dummyDoctors = [
    {
      id: 1,
      name: "Dr. Emily Chen",
      specialty: "Cardiology",
      imageUrl: "/doctor1.jpg",
      experience: 15,
      rating: 4.8,
      about: "Dr. Chen is a board-certified cardiologist with over 15 years of experience in treating complex heart conditions. She specializes in interventional cardiology and has performed over 1000 successful procedures.",
      education: [
        "MD from Harvard Medical School",
        "Residency in Internal Medicine at Massachusetts General Hospital",
        "Fellowship in Cardiology at Johns Hopkins Hospital"
      ],
      languages: ["English", "Mandarin"],
      availableDays: ["Monday", "Wednesday", "Friday"],
      consultationFee: "$200"
    },
    {
      id: 2,
      name: "Dr. Michael Johnson",
      specialty: "Neurology",
      imageUrl: "/doctor2.jpg",
      experience: 20,
      rating: 4.9,
      about: "Dr. Johnson is a renowned neurologist with two decades of experience in diagnosing and treating neurological disorders. He has a particular interest in neurodegenerative diseases and has published numerous papers on Alzheimer's research.",
      education: [
        "MD from Stanford University School of Medicine",
        "Residency in Neurology at UCSF Medical Center",
        "Fellowship in Movement Disorders at Mayo Clinic"
      ],
      languages: ["English", "Spanish"],
      availableDays: ["Tuesday", "Thursday", "Saturday"],
      consultationFee: "$250"
    },
    {
      id: 3,
      name: "Dr. Sarah Patel",
      specialty: "Pediatrics",
      imageUrl: "/doctor3.jpg",
      experience: 10,
      rating: 4.7,
      about: "Dr. Patel is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence. She has a special focus on childhood nutrition and obesity prevention.",
      education: [
        "MD from Yale School of Medicine",
        "Residency in Pediatrics at Children's Hospital of Philadelphia",
        "Fellowship in Pediatric Endocrinology at Boston Children's Hospital"
      ],
      languages: ["English", "Hindi", "Gujarati"],
      availableDays: ["Monday", "Tuesday", "Thursday", "Friday"],
      consultationFee: "$150"
    }
  ];

  // Return the dummyDoctors data as a JSON response
  return NextResponse.json(dummyDoctors);
}