import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get('doctorId');
  const date = searchParams.get('date');


const appointments = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:30 AM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:30 PM', available: true },
    { time: '03:00 PM', available: true },
  ];

  return NextResponse.json(appointments);
}

export async function POST(request: Request) {
  const body = await request.json();
  // save this to database
  console.log('Booking appointment:', body);
  return NextResponse.json({ success: true, message: 'Appointment booked successfully' });
}