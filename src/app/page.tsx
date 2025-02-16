'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

import { Textarea, Button } from '@/app/components';

// Quick way to avoid hydration mismatch error
const Select = dynamic(() => import('react-select'), {
  ssr: false,
});

// Move to a reusable file if needed (not yet needed elsewhere)
interface OptionType {
  label: string;
  value: string;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [selectedTone, setSelectedTone] = useState<OptionType | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedCopy, setGeneratedCopy] = useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copy copied to clipboard');
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const copy = await getGeneratedCopy(input, selectedTone?.value || '');
      if (!copy) throw new Error('No copy generated');
      setGeneratedCopy(copy || '');
      toast.success('Copy generated successfully');
    } catch (error) {
      console.error('Error generating copy:', error);
      toast.error('Error generating copy. Please try again.');
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
          onChange={option => setSelectedTone(option as OptionType | null)}
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
        <p className="min-h-[200px] p-3 border border-gray-300 rounded-lg bg-white">
          {generatedCopy ||
            'Your generated copy will appear here once you enter the information above.'}
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => onSubmit()}
            variant="secondary"
            disabled={loading || !generatedCopy}
          >
            Regenerate
          </Button>
          <Button
            onClick={() => copyToClipboard(generatedCopy)}
            disabled={loading || !generatedCopy}
          >
            Copy
          </Button>
        </div>
      </div>
      <Toaster />
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
