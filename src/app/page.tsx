'use client';

import { useState } from 'react';

import { Textarea, Button, Select, OptionType } from '@/app/components';

export default function Home() {
  const [input, setInput] = useState('');
  const [selectedTone, setSelectedTone] = useState<OptionType | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedCopy, setGeneratedCopy] = useState('');

  const onSubmit = async () => {
    setLoading(true);
    try {
      const copy = await getGeneratedCopy(input, selectedTone?.value || '');
      setGeneratedCopy(copy || '');
    } catch (error) {
      console.error('Error generating copy:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-center">AI Copy Generator</h1>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold" id="prompt-label">
          Describe your product or service
        </h2>
        <Textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-labelledby="prompt-label"
          placeholder="e.g. A luxury watch with a stainless steel case and a leather strap"
        />
        <h2 className="text-xl font-semibold" id="tone-label">
          Select a tone
        </h2>
        <Select
          options={toneOptions}
          value={selectedTone || undefined}
          onChange={option => setSelectedTone(option || null)}
          aria-labelledby="tone-label"
        />
        <Button
          disabled={!input || !selectedTone || loading}
          onClick={onSubmit}
        >
          Generate Copy
        </Button>
      </div>

      <hr />

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Generated Copy</h2>
        {generatedCopy && <p>{generatedCopy}</p>}
        {!generatedCopy && (
          <p className="italic">Your generated copy will appear here</p>
        )}
        <div className="flex gap-2">
          <Button
            onClick={() => onSubmit()}
            variant="secondary"
            disabled={loading || !generatedCopy}
          >
            Regenerate
          </Button>
          <Button
            onClick={() => navigator.clipboard.writeText(generatedCopy)}
            disabled={loading || !generatedCopy}
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
}

const toneOptions: OptionType[] = [
  { label: 'Casual', value: 'casual' },
  { label: 'Professional', value: 'professional' },
  { label: 'Humorous', value: 'humorous' },
];

interface GenerateResponse {
  data: string;
}

const getGeneratedCopy = async (prompt: string, tone: string) => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, tone }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = (await response.json()) as GenerateResponse;
    return data;
  } catch (error) {
    console.error('Error generating copy:', error);
    return null;
  }
};
