import Replicate from 'replicate';

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error('REPLICATE_API_TOKEN is not set in the environment variables');
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    const input = {
          prompt: prompt,
          system_prompt: process.env.SYSTEM_PROMPT,
          max_new_tokens: 512, // Increase token limit
          temperature: 0.7,
          top_p: 0.95,
          top_k: 0,
          length_penalty: 1,
          presence_penalty: 1,
        }

    const output = [];
    for await (const event of replicate.stream("meta/meta-llama-3-8b-instruct", {input })) {
        output.push(event.toString());
    }

    console.log("Replicate API response:", output);

    if (Array.isArray(output) && output.length > 0) {
      return output.join(''); // Remove space to preserve formatting
    } else {
      throw new Error('Unexpected output format from Replicate API');
    }
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
}
