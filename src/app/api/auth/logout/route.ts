import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const sessionToken = cookies().get('session_token')?.value;

    if (sessionToken) {
      // Delete the session from the database
      await prisma.session.delete({
        where: { token: sessionToken },
      });
    }

    // Clear the session cookie
    cookies().delete('session_token');

    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}