'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { OptionType } from '@/app/types';
import { InputSection, OutputSection, getGeneratedCopy } from '@/app/home';

export default function Home() {
  const [input, setInput] = useState('');
  const [selectedTone, setSelectedTone] = useState<OptionType | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedCopy, setGeneratedCopy] = useState('');

  const onSubmit = async () => {
    setLoading(true);
    try {
      const copy = await getGeneratedCopy(
        input.trim(),
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
      <InputSection
        loading={loading}
        input={input}
        selectedTone={selectedTone}
        setInput={setInput}
        setSelectedTone={setSelectedTone}
        onSubmit={onSubmit}
      />
      <hr />
      <OutputSection
        generatedCopy={generatedCopy}
        loading={loading}
        onRegenerate={onSubmit}
      />
      <Toaster />
    </div>
  );
}
