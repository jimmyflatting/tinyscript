import { createClient } from '@/utils/supabase/server';
import s from './Navbar.module.css';
import Navlinks from './Navlinks';

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-10 border-b-2 border-card backdrop-blur-sm">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <Navlinks user={user} />
        </div>
      </div>
    </nav>
  );
}
