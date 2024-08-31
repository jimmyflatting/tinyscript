import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserFromSessionToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const sessionToken = cookies().get('session_token')?.value;
    const user = await getUserFromSessionToken(sessionToken);

    if (user) {
      return NextResponse.json({ auth: 'authenticated', user: { id: user.id, email: user.email, name: user.name } });
    } else {
      return NextResponse.json({ auth: 'no-auth' });
    }
  } catch (error) {
    console.error('Error checking auth:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
