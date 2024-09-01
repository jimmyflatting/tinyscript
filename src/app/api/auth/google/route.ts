import { NextRequest, NextResponse } from 'next/server';
import { verifyGoogleToken } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  const { credential } = await req.json();

  try {
    const googleUser = await verifyGoogleToken(credential);
    
    if (!googleUser.email) {
      return NextResponse.json({ error: 'No email provided' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    let user = await db.collection('users').findOne({ email: googleUser.email });

    if (!user) {
      const result = await db.collection('users').insertOne({
        email: googleUser.email,
        name: googleUser.name ?? googleUser.email.split('@')[0],
        credits: 5,
        subscriptionStatus: 'trial',
        stripeCustomerId: null,
        subscription: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      user = await db.collection('users').findOne({ _id: result.insertedId });
    }

    const sessionToken = crypto.randomUUID();
    await db.collection('sessions').insertOne({
      token: sessionToken,
      userId: user?._id,
      createdAt: new Date(),
    });

    cookies().set('session_token', sessionToken, { httpOnly: true, secure: true });

    return NextResponse.json({ id: user?._id, email: user?.email, name: user?.name });
  } catch (error) {
    console.error('Authentication error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json({ error: 'Authentication failed: ' + error }, { status: 400 });
  }
}