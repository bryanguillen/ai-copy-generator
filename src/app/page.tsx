'use client';

import { useState } from 'react';

import { Textarea, Button, Select, OptionType } from '@/app/components';

const toneOptions: OptionType[] = [
  { label: 'Casual', value: 'casual' },
  { label: 'Professional', value: 'professional' },
  { label: 'Humorous', value: 'humorous' },
];

export default function Home() {
  const [input, setInput] = useState('');
  const [selectedTone, setSelectedTone] = useState<OptionType | null>(null);

  const onSubmit = () => {
    // eslint-disable-next-line no-console
    console.log(input, selectedTone);
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
        <h2 className="text-xl font-semibold" id="prompt-label">
          Select a tone
        </h2>
        <Select
          options={toneOptions}
          value={selectedTone || undefined}
          onChange={option => setSelectedTone(option || null)}
        />
        <Button disabled={!input || !selectedTone} onClick={onSubmit}>
          Generate Copy
        </Button>
      </div>
    </div>
  );
}
