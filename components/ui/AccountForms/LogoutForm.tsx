'use client';

import React from 'react';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';

function LogoutForm() {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;
  return (
    <div className="container">
      <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
        <input type="hidden" name="pathName" value={usePathname()} />
        <button
          type="submit"
          className="text-primary bg-background border border-red-700 w-full py-4 px-2 rounded"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}

export default LogoutForm;
