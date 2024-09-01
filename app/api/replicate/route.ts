
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const stream = new ReadableStream({
    async start(controller) {
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

        for await (const event of replicate.stream("meta/meta-llama-3-8b-instruct", { input })) {
          controller.enqueue(event.toString());
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new NextResponse(stream);
}