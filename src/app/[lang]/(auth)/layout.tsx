import '../../globals.css';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { ReactNode } from 'react';

import { Providers } from '@/shared/components';
import { Toaster } from '@/shared/components/ui/toaster';

interface RootLayoutProps {
  children: ReactNode;
  params: { lang: string };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={params.lang ?? 'en'} className="dark">
      <body>
        <Providers>
          <Toaster />
          <div className="h-screen">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
