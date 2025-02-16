import classNames from 'classnames';

interface OwnProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: 'primary' | 'secondary';
}

export default function Button({
  variant = 'primary',
  children,
  disabled,
  ...props
}: OwnProps) {
  // Define styles for each variant
  const buttonClasses = classNames(
    'px-4 py-2 rounded-lg focus:outline-none focus:ring-2 font-semibold transition-colors duration-200 text-white',
    {
      // Primary variant styles
      'bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-300 disabled:text-gray-500 disabled:cursor-not-allowed':
        variant === 'primary',

      // Secondary variant styles
      'bg-gray-600 hover:bg-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed':
        variant === 'secondary',
    }
  );

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
