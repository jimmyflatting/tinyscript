import { NextRequest, NextResponse } from 'next/server';
import { verifyGoogleToken } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { credential } = await req.json();

  try {
    const googleUser = await verifyGoogleToken(credential);
    
    if (!googleUser.email) {
      return NextResponse.json({ error: 'No email provided' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({ where: { email: googleUser.email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name ?? googleUser.email.split('@')[0],
        },
      });
    }

    const sessionToken = crypto.randomUUID();
    await prisma.session.create({
      data: {
        token: sessionToken,
        userId: user.id,
      },
    });

    cookies().set('session_token', sessionToken, { httpOnly: true, secure: true });

    return NextResponse.json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    console.error('Authentication error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json({ error: 'Authentication failed: ' + error }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}
