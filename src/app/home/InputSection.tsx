'use client';

import dynamic from 'next/dynamic';

import { OptionType } from '@/app/types';
import { Textarea, Button } from '@/app/components';

import { HomePageLabel } from './HomePageLabel';
import { toneOptions } from './toneOptions';

// Quick way to avoid hydration mismatch error
const Select = dynamic(() => import('react-select'), {
  ssr: false,
});

interface OwnProps {
  loading: boolean;
  input: string;
  selectedTone: OptionType | null;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTone: React.Dispatch<React.SetStateAction<OptionType | null>>;
  onSubmit: () => void;
}

export function InputSection({
  loading,
  input,
  selectedTone,
  setInput,
  setSelectedTone,
  onSubmit,
}: OwnProps) {
  return (
    <div className="flex flex-col gap-4">
      <HomePageLabel id="prompt-label">
        Describe your product or service
      </HomePageLabel>
      <Textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        aria-labelledby="prompt-label"
        placeholder="e.g. A luxury watch with a stainless steel case and a leather strap"
      />
      <HomePageLabel id="tone-label">Select a tone</HomePageLabel>
      <Select
        options={toneOptions}
        value={selectedTone || undefined}
        onChange={option => setSelectedTone(option as OptionType | null)}
        aria-labelledby="tone-label"
      />
      <Button
        disabled={!input.trim() || !selectedTone || loading}
        onClick={() => onSubmit()}
      >
        Generate Copy
      </Button>
    </div>
  );
}
