'use client';

import { useSession } from 'next-auth/react';

import { Button } from '@/shared/components/ui/button';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="h-[75vh] bg-background bg-cover bg-center">
      <div className="container">
        <h1 className="pt-8 text-3xl font-bold text-white">Hello, Next.js!</h1>
        <Button
          onClick={() => {
            console.log(session);
          }}
        >
          Session
        </Button>
      </div>
    </main>
  );
}
