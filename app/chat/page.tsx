import Chat from '@/components/ui/Chat/Chat';
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import React from 'react';
import ReactGA from 'react-ga4';

export default async function ChatPage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  ReactGA.send({
    hitType: 'pageview',
    page: '/chat',
    title: 'Chat Page'
  });

  return (
    <div className="bg-background text-text h-full container">
      {/* <Chat user={user} /> */}
    </div>
  );
}
