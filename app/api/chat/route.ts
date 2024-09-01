import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId, message } = await req.json();
  const supabase = createClient();

  const { data, error } = await supabase
    .from('chat_messages')
    .insert({ user_id: userId, message, is_user_message: true });

  if (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch chat history' }, { status: 500 });
  }

  return NextResponse.json(data);
}
