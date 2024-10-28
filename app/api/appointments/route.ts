import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/appointments
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const appointments = await db.appointment.findMany({
      where: {
        userId: userId
      },
      include: {
        doctor: {
          include: {
            user: true
          }
        }
      }
    });

    const formattedAppointments = appointments.map(appointment => ({
      id: appointment.id,
      doctorName: appointment.doctor?.user?.name ?? 'Unknown Doctor',
      date: appointment.date.toISOString().split('T')[0],
      time: appointment.time
    }));

    return NextResponse.json(formattedAppointments);
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

// DELETE /api/appointments
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Appointment ID is required' }, { status: 400 });
  }

  try {
    await db.appointment.delete({
      where: {
        id: id
      }
    });

    return NextResponse.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Failed to delete appointment:', error);
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 }
    );
  }
}