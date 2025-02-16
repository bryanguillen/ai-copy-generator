'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

import { Textarea, Button } from '@/app/components';
import { GenerateCopyResponse, GenerateCopyRequestPayload } from '@/app/types';

// Quick way to avoid hydration mismatch error
const Select = dynamic(() => import('react-select'), {
  ssr: false,
});

export default function Home() {
  const [input, setInput] = useState('');
  const [selectedTone, setSelectedTone] = useState<OptionType | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedCopy, setGeneratedCopy] = useState('');

  const trimmedInput = input.trim();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copy copied to clipboard');
    } catch (error) {
      console.error('Failed to copy text:', error);
      toast.error('Failed to copy text. Please try again or manually copy.');
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const copy = await getGeneratedCopy(
        trimmedInput,
        selectedTone?.value || ''
      );
      if (!copy) throw new Error('No copy generated');
      setGeneratedCopy(copy || '');
      toast.success('Copy generated successfully');
    } catch (error) {
      // Generic error messaging for now
      console.error('Error generating copy:', error);
      toast.error('Error generating copy. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-2xl w-full flex flex-col gap-8 mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">AI Copy Generator</h1>

      <div className="flex flex-col gap-4">
        <PageLabel id="prompt-label">
          Describe your product or service
        </PageLabel>
        <Textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-labelledby="prompt-label"
          placeholder="e.g. A luxury watch with a stainless steel case and a leather strap"
        />
        <PageLabel id="tone-label">Select a tone</PageLabel>
        <Select
          options={toneOptions}
          value={selectedTone || undefined}
          onChange={option => setSelectedTone(option as OptionType | null)}
          aria-labelledby="tone-label"
        />
        <Button
          disabled={!trimmedInput || !selectedTone || loading}
          onClick={onSubmit}
        >
          Generate Copy
        </Button>
      </div>

      <hr />

      <div className="flex flex-col gap-4">
        <PageLabel>Generated Copy</PageLabel>
        <p className="min-h-[200px] p-3 border border-gray-300 rounded-lg bg-white">
          {generatedCopy || (
            <span className="text-gray-500 italic">
              Your generated copy will appear here once you enter the
              information above.
            </span>
          )}
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => onSubmit()}
            disabled={loading || !generatedCopy}
            variant="secondary"
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

/**
 * Types, constants, and functions that are used in the component.
 * As of right now, these can remain in this file, as it is not too much
 * and not needed elsewhere.
 */

interface PageLabelProps {
  children: React.ReactNode;
  id?: string;
}

function PageLabel({ children, id }: PageLabelProps) {
  return (
    <h2 className="text-xl font-semibold" id={id}>
      {children}
    </h2>
  );
}

interface OptionType {
  label: string;
  value: string;
}

const toneOptions: OptionType[] = [
  { label: 'Casual', value: 'casual' },
  { label: 'Professional', value: 'professional' },
  { label: 'Humorous', value: 'humorous' },
];

const getGeneratedCopy = async (prompt: string, tone: string) => {
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
