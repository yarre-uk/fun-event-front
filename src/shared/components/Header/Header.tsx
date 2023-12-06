'use client';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { dictionaries } from '@/app/[lang]/dictionaries';
import { ROUTE } from '@/shared/constants/routes';

type HeaderProps = {
  className?: string;
  lang: string;
};

function Header({ className, lang }: HeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div
      className={`${className} flex h-16 items-center justify-between gap-5 bg-background-secondary pr-4`}
    >
      <div />
      <div />
      <div className=" flex gap-5">
        {session?.user ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>{dictionaries[lang]?.header.profile}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(ROUTE.PROFILE)}>
                  {dictionaries[lang]?.header.profile}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setTimeout(() => {
                      signOut();
                    }, 100);
                    router.push(ROUTE.HOME);
                  }}
                >
                  {dictionaries[lang]?.header.signOut}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button onClick={() => router.push(ROUTE.SIGN_IN)}>
              {dictionaries[lang]?.header.signIn}
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push(ROUTE.SIGN_UP)}
            >
              {dictionaries[lang]?.header.signUp}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
