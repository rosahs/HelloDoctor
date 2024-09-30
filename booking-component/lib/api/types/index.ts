export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience?: number;
  rating?: number;
  focus?: string;
  workingHours?: string;
  description?: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
}