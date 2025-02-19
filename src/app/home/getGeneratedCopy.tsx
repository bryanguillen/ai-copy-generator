import { GenerateCopyResponse, GenerateCopyRequestPayload } from '@/app/types';

export const getGeneratedCopy = async (prompt: string, tone: string) => {
  try {
    const payload: GenerateCopyRequestPayload = { prompt, tone };
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = (await response.json()) as GenerateCopyResponse;
    return data;
  } catch (error) {
    console.error('Error generating copy:', error);
    return null;
  }
};
