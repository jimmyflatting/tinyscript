import { cookies } from 'next/headers';
import { getUserFromSessionToken } from './auth';

export async function getServerSideAuth() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('session_token')?.value;
  
  if (!sessionToken) {
    return { auth: 'no-auth', user: null };
  }

  const user = await getUserFromSessionToken(sessionToken);
  
  if (user) {
    return { 
      auth: "authenticated",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        credits: user.credits,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionEndDate: user.subscriptionEndDate,
        stripeCustomerId: user.stripeCustomerId,
        stripeSubscriptionId: user.stripeSubscriptionId,
      },
    };
  }

  return { auth: "no-auth", user: null };
}