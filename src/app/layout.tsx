import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PayLater',
  description: 'Split bills and track payments with WhatsApp reminders.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto min-h-screen w-full max-w-md px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
