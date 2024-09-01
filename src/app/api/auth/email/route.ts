import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db();

    let user = await db.collection('users').findOne({ email });

    if (user) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
      email,
      name,
      password: hashedPassword,
      credits: 5,
      subscriptionStatus: 'trial',
      stripeCustomerId: null,
      subscription: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    user = await db.collection('users').findOne({ _id: result.insertedId });

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