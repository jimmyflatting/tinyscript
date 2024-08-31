import { OAuth2Client } from 'google-auth-library';
import clientPromise from './mongodb';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log('payload', payload);
    if (!payload) {
      throw new Error('Unable to verify Google token');
    }

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  } catch (error) {
    console.error('Error verifying Google token:', error);
    throw error;
  }
}

export async function getUserFromSessionToken(sessionToken: string | undefined) {
  if (!sessionToken) return null;
  
  const client = await clientPromise;
  const db = client.db();
  
  const session = await db.collection('sessions').findOne({ token: sessionToken });
  if (!session) return null;

  const user = await db.collection('users').findOne({ _id: session.userId });
  return user;
}
