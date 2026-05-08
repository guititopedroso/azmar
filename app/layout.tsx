import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AZMAR — Presença Digital para Negócios Locais',
    template: '%s | AZMAR',
  },
  description:
    'Criamos websites, sistemas digitais e estratégias de marketing para ajudar pequenos negócios locais a parecerem mais profissionais, serem encontrados online e conquistarem mais clientes.',
  keywords: [
    'criação de websites em Setúbal',
    'marketing digital Setúbal',
    'agência digital Setúbal',
    'websites para negócios locais',
    'gestão de redes sociais Setúbal',
    'presença digital para pequenos negócios',
    'websites para restaurantes',
    'websites para ginásios',
    'websites para barbearias',
    'marketing local',
    'AZMAR',
  ],
  authors: [{ name: 'AZMAR' }],
  creator: 'AZMAR',
  publisher: 'AZMAR',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://azmar.pt'
  ),
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: '/',
    siteName: 'AZMAR',
    title: 'AZMAR — Presença Digital para Negócios Locais',
    description:
      'Ajudamos negócios locais a modernizar a sua presença digital e captar mais clientes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AZMAR — Presença Digital para Negócios Locais',
    description:
      'Ajudamos negócios locais a modernizar a sua presença digital e captar mais clientes.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
