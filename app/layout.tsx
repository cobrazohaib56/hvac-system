import { Metadata } from 'next';
import NavbarHVAC from '@/components/NavbarHVAC';
import { Toaster } from '@/components/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import 'styles/main.css';
import { cn } from '@/utils/cn';
import { Inter as FontSans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

const meta = {
  title: 'CoolBreeze Climate Solutions - Expert Heat Pump Installation',
  description: 'Transform your property with an Air Source Heat Pump. Expert survey, design and installation. Reduce energy bills and your carbon footprint.',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: getURL()
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    referrer: 'origin-when-cross-origin',
    keywords: ['heat pump', 'HVAC', 'air source heat pump', 'climate solutions', 'heating', 'cooling', 'energy efficiency'],
    authors: [{ name: 'CoolBreeze Climate Solutions', url: getURL() }],
    creator: 'CoolBreeze Climate Solutions',
    publisher: 'CoolBreeze Climate Solutions',
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
      type: 'website',
      siteName: meta.title
    },
    twitter: {
      card: 'summary_large_image',
      site: '@',
      creator: '@',
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage]
    }
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const CrispWithNoSSR = dynamic(() => import('../components/crisp'));
  return (
    <html lang="en" className="scroll-smooth scroll-p-16">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased loading',
          fontSans.variable
        )}
      >
        <CrispWithNoSSR />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavbarHVAC />
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
          >
            {children}
          </main>
          {/* <Footer /> */}
          <Suspense>
            <Toaster />
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
