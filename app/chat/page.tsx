import Chat from '@/components/chat';
// Supabase removed
// import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ChatPage() {
  // Supabase removed
  // const supabase = createClient();
  // const { data: { user } } = await supabase.auth.getUser();
  // const { data: subscription } = await supabase.from('subscriptions')...

  // Allow access without authentication (Supabase removed)
  return <Chat />;
}
