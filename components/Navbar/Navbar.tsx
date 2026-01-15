// import { createClient } from '@/utils/supabase/server';
import Navlinks from './Navlinks';

export default async function Navbar() {
  // Supabase removed
  // const supabase = createClient();
  // const { data: { user } } = await supabase.auth.getUser();
  // const { data: subscription } = await supabase.from('subscriptions')...

  return (
    <nav className="bg-zinc-50 dark:bg-zinc-900">
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <Navlinks user={null} subscription={null} />
      </div>
    </nav>
  );
}
