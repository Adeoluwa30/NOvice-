import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PayLater',
    short_name: 'PayLater',
    description: 'Split Nigerian bills and share payment reminders on WhatsApp.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#0ea5e9',
    icons: []
  };
}
