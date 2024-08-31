import { NextRequest, NextResponse } from 'next/server';
import { getUserFromSessionToken } from '@/lib/auth';
import { generateAIResponse } from '@/lib/replicate';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get('session_token')?.value;
  const user = await getUserFromSessionToken(sessionToken);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const chatHistory = await db.collection('items').find({ userId: user._id }).sort({ createdAt: 1 }).toArray();

    return NextResponse.json({ chatHistory });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get('session_token')?.value;
  const user = await getUserFromSessionToken(sessionToken);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // Create user message
    const userMessageResult = await db.collection('items').insertOne({
      name: message,
      userId: user._id,
      isUserMessage: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Generate AI response
    const aiResponse = await generateAIResponse(message);

    // Create AI message
    const aiMessageResult = await db.collection('items').insertOne({
      name: aiResponse,
      userId: user._id,
      isUserMessage: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    let remainingCredits = user.credits;

    if (user.subscriptionStatus !== 'active') {
      remainingCredits = Math.max(0, user.credits - 1);
      await db.collection('users').updateOne(
        { _id: user._id },
        { $set: { credits: remainingCredits } }
      );
    }

    return NextResponse.json({ 
      userMessageId: userMessageResult.insertedId,
      aiMessageId: aiMessageResult.insertedId,
      aiResponse,
      remainingCredits 
    });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
