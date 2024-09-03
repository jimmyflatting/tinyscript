import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  const { data } = await req.json();

  return NextResponse.json({ message: 'Hello World' });
}

// CODE PASTED FROM STRIPE WHEN SETTING UP WEBHOOK

// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
// const stripe = require('stripe')('sk_test_...');
// const express = require('express');
// const app = express();

// // This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret =
//   'whsec_e7d831cf9f1d9900cced8dfdf0ed62605f6b4071b9d95632202f4e827142aba6';

// app.post(
//   '/webhook',
//   express.raw({ type: 'application/json' }),
//   (request, response) => {
//     const sig = request.headers['stripe-signature'];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//     } catch (err) {
//       response.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }

//     // Handle the event
//     switch (event.type) {
//       case 'account.updated':
//         const accountUpdated = event.data.object;
//         // Then define and call a function to handle the event account.updated
//         break;
//       case 'account.external_account.created':
//         const accountExternalAccountCreated = event.data.object;
//         // Then define and call a function to handle the event account.external_account.created
//         break;
//       case 'account.external_account.deleted':
//         const accountExternalAccountDeleted = event.data.object;
//         // Then define and call a function to handle the event account.external_account.deleted
//         break;
//       case 'account.external_account.updated':
//         const accountExternalAccountUpdated = event.data.object;
//         // Then define and call a function to handle the event account.external_account.updated
//         break;
//       case 'customer.created':
//         const customerCreated = event.data.object;
//         // Then define and call a function to handle the event customer.created
//         break;
//       case 'customer.updated':
//         const customerUpdated = event.data.object;
//         // Then define and call a function to handle the event customer.updated
//         break;
//       case 'customer.subscription.created':
//         const customerSubscriptionCreated = event.data.object;
//         // Then define and call a function to handle the event customer.subscription.created
//         break;
//       case 'customer.subscription.updated':
//         const customerSubscriptionUpdated = event.data.object;
//         // Then define and call a function to handle the event customer.subscription.updated
//         break;
//       // ... handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//   }
// );

// app.listen(4242, () => console.log('Running on port 4242'));
