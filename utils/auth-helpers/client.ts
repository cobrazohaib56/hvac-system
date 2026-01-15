'use client';

// Supabase removed
// import { createClient } from '@/utils/supabase/client';
// import { type Provider } from '@supabase/supabase-js';
import { getURL } from '@/utils/helpers';
import { redirectToPath } from './server';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export async function handleRequest(
  e: React.FormEvent<HTMLFormElement>,
  requestFunc: (formData: FormData) => Promise<string>,
  router: AppRouterInstance | null = null
): Promise<boolean | void> {
  // Prevent default form submission refresh
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const redirectUrl: string = await requestFunc(formData);
  console.log(redirectUrl);

  if (router) {
    // If client-side router is provided, use it to redirect
    return router.push(redirectUrl);
  } else {
    // Otherwise, redirect server-side
    return await redirectToPath(redirectUrl);
  }
}

export async function signInWithOAuth(e: React.FormEvent<HTMLFormElement>) {
  // Supabase removed
  // e.preventDefault();
  // const formData = new FormData(e.currentTarget);
  // const provider = String(formData.get('provider')).trim() as Provider;
  // const supabase = createClient();
  // await supabase.auth.signInWithOAuth({...});
  alert('OAuth sign-in disabled - Supabase removed');
}
