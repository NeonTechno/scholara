import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SCHOLARA — Your Academic World, One Place.',
  description: 'A digital academic resource hub for ABU students.',
  icons: {
    icon: '/scholara-icon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
