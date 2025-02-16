import { OpenAI } from 'openai';

import { GenerateCopyResponse, GenerateCopyRequestPayload } from '@/app/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt, tone } = (await req.json()) as GenerateCopyRequestPayload;

    if (!prompt || !tone) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const message = await getMessageFromOpenAi(prompt, tone);
    const response: GenerateCopyResponse = { data: message };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating copy:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

async function getMessageFromOpenAi(prompt: string, tone: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert AI marketing assistant. Generate a compelling marketing message based on the provided description and tone.',
      },
      {
        role: 'user',
        content: `Description: ${prompt}\nTone: ${tone}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 150,
  });

  return cleanContent(response.choices[0].message.content);
}

// Hack to remove double quotes from the beginning and end of the string
function cleanContent(content: string | null) {
  if (content && content.trim().startsWith('"') && content.trim().endsWith('"')) {
    return content.slice(1, -1);
  }
  return content;
}