import { NextResponse } from 'next/server';
import { getUser, createUser, updateUser } from '@/server/actions/user';
import { User } from '@/lib/types';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  console.log('Webhook triggered');

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Do something with the payload
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  if (eventType === 'user.created') {
    const userData: Partial<User> = {};

    userData.clerkId = id as string;
    userData.full_name = evt.data.first_name + ' ' + evt.data.last_name;
    userData.email = evt.data.email_addresses[0].email_address;
    userData.password = evt.data.primary_email_address_id as string;
    userData.subscription_status = 'trial';
    userData.items = [];

    await createUser(userData as User);

    return NextResponse.json({ status: 200 });
  }

  if (eventType === 'user.updated') {
    const existingUser = await getUser(id as string);

    const userData: Partial<User> = {};

    if (
      evt.data.first_name + ' ' + evt.data.last_name !==
      existingUser.full_name
    ) {
      userData.full_name = evt.data.first_name + ' ' + evt.data.last_name;
    }

    if (evt.data.email_addresses[0].email_address !== existingUser.email) {
      userData.email = evt.data.email_addresses[0].email_address;
    }

    if (evt.data.primary_email_address_id !== existingUser.password) {
      userData.password = evt.data.primary_email_address_id as string;
    }

    if (Object.keys(userData).length > 0) {
      await updateUser(id as string, userData as User);
    }

    return new Response('', { status: 200 });
  }
  return new Response('', { status: 200 });
}
