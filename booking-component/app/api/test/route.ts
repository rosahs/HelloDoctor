// app/api/test/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('API: GET /api/test called');
  return NextResponse.json({ message: 'API is working' });
}