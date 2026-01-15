import Footer from '@/components/footer';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
