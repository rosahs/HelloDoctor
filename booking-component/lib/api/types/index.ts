export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    experience: number;
    rating: number;
    appointmentDuration: number;
  }
  
  export interface Appointment {
    time: string;
    available: boolean;
  }