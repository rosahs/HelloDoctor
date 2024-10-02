import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id

    const doctor = {
        id,
        name: "Dr. Razha",
        title: "M.D.",
    }

    return NextResponse.json(doctor)
}