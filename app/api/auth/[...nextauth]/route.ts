import { NextResponse } from 'next/server';
import { handlers } from '@/auth';

export async function GET(request: Request) {
    try {
        return await handlers.GET(request);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to handle GET request' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        return await handlers.POST(request);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to handle POST request' }, { status: 500 });
    }
}