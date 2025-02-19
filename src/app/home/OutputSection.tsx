'use client';

import toast from 'react-hot-toast';

import { HomePageLabel } from './HomePageLabel';
import { Button } from '@/app/components';

interface OwnProps {
  generatedCopy: string;
  loading: boolean;
  onRegenerate: () => void;
}

export function OutputSection({
  generatedCopy,
  loading,
  onRegenerate,
}: OwnProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copy copied to clipboard');
    } catch (error) {
      console.error('Failed to copy text:', error);
      toast.error('Failed to copy text. Please try again or manually copy.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <HomePageLabel>Generated Copy</HomePageLabel>
      {loading && (
        <div className="h-[200px] bg-gray-200 animate-pulse rounded-lg"></div>
      )}
      {!loading && (
        <p className="min-h-[200px] p-3 border border-gray-300 rounded-lg bg-white">
          {generatedCopy || (
            <span className="text-gray-500 italic">
              Your generated copy will appear here once you enter the
              information above.
            </span>
          )}
        </p>
      )}
      <div className="flex gap-2">
        <Button
          onClick={() => onRegenerate()}
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
  );
}
