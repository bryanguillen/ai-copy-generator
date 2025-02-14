import React from 'react';

interface OwnProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'className' | 'rows' | 'style'
  > {}

export default function Textarea({ ...rest }: OwnProps) {
  return (
    <textarea
      {...rest}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ borderRadius: '8px', resize: 'none' }}
      rows={4}
    />
  );
}
