import React from 'react';
import classNames from 'classnames';

interface OwnProps {
  className?: string;
}

export default function LoadingSkeleton({ className }: OwnProps) {
  return (
    <div
      className={classNames(
        'h-[200px] bg-gray-200 animate-pulse rounded-lg',
        className
      )}
    ></div>
  );
}
