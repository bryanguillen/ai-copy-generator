import React from 'react';
import classNames from 'classnames';

export default function Textarea({
  className,
  rows = 4,
  style,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...rest}
      className={classNames(
        className,
        'w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
      )}
      style={{ ...(style || {}), borderRadius: '8px', resize: 'none' }}
      rows={rows}
    />
  );
}
