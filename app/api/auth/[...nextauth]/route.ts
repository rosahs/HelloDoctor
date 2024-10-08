import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { DoctorModel } from '@/models/DoctorModel';
import { AppointmentModel } from '@/models/AppointmentModel';

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const doctorId = searchParams.get('doctorId');
        const date = searchParams.get('date');

        // If doctorId and date are provided, filter appointments accordingly
        const query: any = {};
        if (doctorId) query.doctorId = doctorId;
        if (date) query.date = date;

        const appointments = await AppointmentModel.find(query);

        return NextResponse.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        // Validate incoming data if needed before saving
        const { doctorId, userId, date, time, status } = body;
        if (!doctorId || !userId || !date || !time || !status) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newAppointment = new AppointmentModel(body);
        await newAppointment.save();

        return NextResponse.json({ success: true, message: 'Appointment booked successfully' });
    } catch (error) {
        console.error('Error booking appointment:', error);
        return NextResponse.json({ success: false, message: 'Failed to book appointment' }, { status: 500 });
    }
}