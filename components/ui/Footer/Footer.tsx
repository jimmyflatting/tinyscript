import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import Logo from '@/components/icons/Logo';
import GitHub from '@/components/icons/GitHub';
import { Twitter } from 'lucide-react';

export default async function Footer() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <div className="items-center p-8 border-t border-primary border-opacity-20">
      <footer className="footer container">
        <div className="flex items-center flex-1">
          <Link
            href={user ? '/chat' : '/'}
            className="text-lg font-normal text-primary"
            aria-label="Logo"
          >
            Tiny<span className="font-bold">Script</span>
          </Link>
        </div>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href="https://twitter.com/tinyscript_ai" target="_blank">
            <Twitter />
          </a>
          <a href="https://github.com/tinyscript-ai/tinyscript" target="_blank">
            <GitHub />
          </a>
        </nav>
      </footer>
    </div>
  );
}
