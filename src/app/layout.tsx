import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Copy Generator',
  description: 'Generate copy for your business with AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-800 bg-gray-100">
        <div className="min-h-screen max-w-2xl w-full p-4 mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
