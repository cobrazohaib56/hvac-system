import CustomerPortalForm from '@/components/AccountForms/CustomerPortalForm';
import EmailForm from '@/components/AccountForms/EmailForm';
import NameForm from '@/components/AccountForms/NameForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Avatar from '@/components/avatar';

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (error) {
    console.log(error);
  }

  if (!user) {
    return redirect('/signin');
  }

  return (
    <section className="mb-32">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-center text-4xl font-extrabold sm:text-center sm:text-6xl">
            Account
          </h1>
        </div>
      </div>
      <div className="p-4 flex flex-col items-center">
        <Avatar uid={user?.id ?? null} size={150} />
        <CustomerPortalForm subscription={subscription} />
        <NameForm
          userName={userDetails?.full_name ?? ''}
          userId={userDetails?.id ?? ''}
        />
        <EmailForm userEmail={user.email} />
      </div>
    </section>
  );
}
