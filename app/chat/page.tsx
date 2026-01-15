import Chat from '@/components/chat';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ChatPage() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (!user) return redirect('/signin');

  if (!subscription) return redirect('/');

  return <Chat />;
}
