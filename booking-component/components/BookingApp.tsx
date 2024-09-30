'use client'

import React, { useState, useEffect } from 'react';
import { Doctor, Appointment } from '@/lib/types';
import { getAvailableAppointments } from '@/lib/api/api';
import DoctorProfile from '../components/DoctorProfile';
import Schedule, { ScheduleProps } from '../components/Schedule';
import AppointmentDetails from '../components/AppointmentDetails';
import BottomNavigation from '../components/BottomNavigation';

type Tab = 'profile' | 'schedule' | 'details';

interface BookingAppProps {
    doctor: Doctor;
}

export default function BookingApp({ doctor }: BookingAppProps) {
    const [selectedTab, setSelectedTab] = useState<Tab>('profile');
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [availableAppointments, setAvailableAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        async function fetchAppointments() {
            const appointments = await getAvailableAppointments(Number(doctor.id), selectedDate);
            setAvailableAppointments(appointments);
        }
        fetchAppointments();
    }, [doctor.id, selectedDate]);

    return (
        <div className="max-w-md mx-auto bg-gray-100 p-4">
            {selectedTab === 'profile' && <DoctorProfile params={{ id: doctor.id }} />}
            {selectedTab === 'schedule' && <Schedule 
                doctor={doctor}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                availableAppointments={availableAppointments}
            />}
            {selectedTab === 'details' && <AppointmentDetails />}
            <BottomNavigation selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
    );
}