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
  title: 'Nuclieos AI Receptionist',
  description: '24/7 AI Receptionist for your business. No sick leaves, no mood swings. Transform your customer engagement with intelligent automation.',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: 'https://nuclieos.com/wp-content/uploads/2024/11/nuclieos-logo-1.png',
  url: getURL()
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    referrer: 'origin-when-cross-origin',
    keywords: ['AI receptionist', 'AI assistant', 'customer service', 'lead generation', 'automation', '24/7 support'],
    authors: [{ name: 'Nuclieos AI Receptionist', url: getURL() }],
    creator: 'Nuclieos AI Receptionist',
    publisher: 'Nuclieos AI Receptionist',
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url)
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
