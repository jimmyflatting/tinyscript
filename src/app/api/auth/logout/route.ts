import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const sessionToken = cookies().get('session_token')?.value;

    if (sessionToken) {
      const client = await clientPromise;
      const db = client.db();

      // Delete the session from the database
      await db.collection('sessions').deleteOne({ token: sessionToken });
    }

    // Clear the session cookie
    cookies().delete('session_token');

    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}