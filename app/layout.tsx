import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PCA Student Portal (Demo)',
  description: 'Proof of concept for shared DreamX UI packages',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
