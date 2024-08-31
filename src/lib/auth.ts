import { OAuth2Client } from 'google-auth-library';
import { prisma } from './prisma';

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
    throw error; // Throw the original error for better debugging
  }
}

export async function getUserFromSessionToken(sessionToken: string | undefined) {
  if (!sessionToken) return null;
  
  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true },
  });

  return session?.user || null;
}
