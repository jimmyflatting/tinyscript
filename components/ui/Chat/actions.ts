import Replicate from 'replicate';
import { createClient } from '@/utils/supabase/server';

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error('REPLICATE_API_TOKEN is not set in the environment variables');
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

interface ChatMessage {
  _id: string;
  name: string;
  createdAt: string;
  isUserMessage: boolean;
}

export async function sendMessage(userId: string, message: string) {
  const response = await fetch('/api/chat/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, message })
  });
  
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  
  return response.json();
}

export async function getChatHistory(userId: string): Promise<ChatMessage[]> {
  const response = await fetch(`/api/chat/history?userId=${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch chat history');
  }
  
  return response.json();
}

export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    const input = {
      prompt: prompt,
      system_prompt: process.env.SYSTEM_PROMPT,
      max_new_tokens: 512,
      temperature: 0.7,
      top_p: 0.95,
      top_k: 0,
      length_penalty: 1,
      presence_penalty: 1,
    };

    const output = [];
    for await (const event of replicate.stream("meta/meta-llama-3-8b-instruct", { input })) {
      output.push(event.toString());
    }

    console.log("Replicate API response:", output);

    if (Array.isArray(output) && output.length > 0) {
      return output.join('');
    } else {
      throw new Error('Unexpected output format from Replicate API');
    }
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
}

export async function streamAIResponse(prompt: string, callback: (chunk: string) => void) {
  const response = await fetch('/api/chat/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    throw new Error('Failed to stream AI response');
  }

  const reader = response?.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const result = await reader?.read();
    if (!result) break;
    const { done, value } = result;
    if (done) break;
    if (value) {
      callback(decoder.decode(value));
    }
  }
}

// Example function for Replicate API interaction (adjust as needed)
export async function getReplicateResponse(prompt: string, chatId: string, userId: string) {
  const response = await fetch('/api/replicate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });
  
  if (!response.ok) {
    throw new Error('Failed to get Replicate response');
  }

  // add the prompt and response to the database based on chat and user id
  const supabase = createClient();
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([
      {
        chat_id: chatId,
        user_id: userId,
        message: prompt,
        is_user_message: false
      },
      {
        chat_id: chatId,
        user_id: userId,
        message: response.json(),
        is_user_message: true
      }
    ]);

  if (error) {
    console.error('Error adding message to database:', error);
    throw new Error('Failed to add message to database');
  }
  
  return response.json();
}