'use client';

import { useSession } from 'next-auth/react';

import { dictionaries } from '../dictionaries';

export default function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <main className="h-[75vh] bg-background bg-cover bg-center">
      <div className="container">
        <h1 className="pt-8 text-3xl font-bold text-white">
          {dictionaries[lang].home.title}
        </h1>
        <p>{dictionaries[lang].home.subtitle}</p>
      </div>
    </main>
  );
}
