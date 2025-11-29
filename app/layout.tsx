import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Doc Connect - Find Nearby Doctors',
  description: 'Find and book nearby doctors in Khurja and Bulandshahr',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}