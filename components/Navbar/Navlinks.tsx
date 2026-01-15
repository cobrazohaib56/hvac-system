'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import { ThemeToggle } from '../theme-toggle';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface NavlinksProps {
  user?: any;
  subscription?: any;
}

export default function Navlinks({ user, subscription }: NavlinksProps) {
  const [showMenu, setShowMenu] = useState(false);
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      <div className="flex items-center flex-1">
        <Link href="/" aria-label="Logo">
          <Image src="/logo.png" width={40} height={40} alt="logo" />
        </Link>
        <nav className="ml-6 hidden space-x-2 lg:flex flex-row gap-4">
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#features">Features</Link>
          <Link href="/#faq">FAQ</Link>
          {user && <Link href="/account">Account</Link>}
          {user && subscription && <Link href="/chat">Chat</Link>}
        </nav>
      </div>
      <div className="justify-end hidden lg:flex space-x-8 items-center">
        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit">Sign out</button>
          </form>
        ) : (
          <Link href="/signin">Sign In</Link>
        )}
      </div>
      <div className="ml-5 hidden lg:flex">
        <ThemeToggle />
      </div>
      <button>
        <Bars3Icon
          onClick={() => setShowMenu(!showMenu)}
          className="lg:hidden"
          width={25}
        />
      </button>
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="absolute lg:hidden flex flex-col gap-8 shadow-lg dark:shadow-zinc-800 z-10 right-[-24px] items-end top-[70px] border-b border-t w-screen bg-zinc-50 dark:bg-zinc-900 p-8"
        >
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#features">Features</Link>
          <Link href="/#faq">FAQ</Link>
          {user && <Link href="/account">Account</Link>}
          {user && subscription && <Link href="/chat">Chat</Link>}
          {user ? (
            <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
              <input type="hidden" name="pathName" value={usePathname()} />
              <button type="submit">Sign out</button>
            </form>
          ) : (
            <Link href="/signin">Sign In</Link>
          )}
          <ThemeToggle />
        </div>
      )}
    </div>
  );
}
