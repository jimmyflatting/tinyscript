'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex flex-row justify-between align-center my-auto py-4">
      <div className="flex items-center flex-1">
        <Link
          href={user ? '/chat' : '/'}
          className="text-lg font-normal text-primary"
          aria-label="Logo"
        >
          Tiny<span className="font-bold">Script</span>
        </Link>
      </div>
      <div className="flex justify-end space-x-8 items-center">
        {user ? (
          <>
            <Link href="/account">Settings</Link>
            <Link
              href="/chat"
              className="px-4 py-2 border border-primary text-primary rounded-lg hover:opacity-90 transition duration-300"
            >
              App
            </Link>
          </>
        ) : (
          <Link href="/signin" className={s.link}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
