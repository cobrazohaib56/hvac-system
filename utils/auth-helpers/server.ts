'use server';

// Supabase removed
// import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getURL, getErrorRedirect, getStatusRedirect } from 'utils/helpers';
import { getAuthTypes } from 'utils/auth-helpers/settings';
// import { Database } from '@/types_db';

function isValidEmail(email: string) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export async function redirectToPath(path: string) {
  return redirect(path);
}

export async function SignOut(formData: FormData) {
  const pathName = String(formData.get('pathName')).trim();

  // Supabase removed
  // const supabase = createClient();
  // const { error } = await supabase.auth.signOut();

  return '/signin';
}

export async function signInWithEmail(formData: FormData) {
  const cookieStore = cookies();
  const callbackURL = getURL('/auth/callback');

  const email = String(formData.get('email')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/email_signin',
      'Invalid email address.',
      'Please try again.'
    );
  }

  // Supabase removed
  // const supabase = createClient();
  // const { data, error } = await supabase.auth.signInWithOtp({...});
  
  redirectPath = getErrorRedirect(
    '/signin/email_signin',
    'Authentication disabled',
    'Supabase has been removed from this project.'
  );

  return redirectPath;
}

export async function requestPasswordUpdate(formData: FormData) {
  const callbackURL = getURL('/auth/reset_password');

  // Get form data
  const email = String(formData.get('email')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/forgot_password',
      'Invalid email address.',
      'Please try again.'
    );
  }

  // Supabase removed
  // const supabase = createClient();
  // const { data, error } = await supabase.auth.resetPasswordForEmail(...);
  
  redirectPath = getErrorRedirect(
    '/signin/forgot_password',
    'Authentication disabled',
    'Supabase has been removed from this project.'
  );

  return redirectPath;
}

export async function signInWithPassword(formData: FormData) {
  const cookieStore = cookies();
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();
  let redirectPath: string;

  // Supabase removed
  // const supabase = createClient();
  // const { error, data } = await supabase.auth.signInWithPassword({...});
  
  redirectPath = getErrorRedirect(
    '/signin/password_signin',
    'Authentication disabled',
    'Supabase has been removed from this project.'
  );

  return redirectPath;
}

export async function signUp(formData: FormData) {
  const callbackURL = getURL('/auth/callback');

  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Invalid email address.',
      'Please try again.'
    );
  }

  // Supabase removed
  // const supabase = createClient();
  // const { error, data } = await supabase.auth.signUp({...});
  
  redirectPath = getErrorRedirect(
    '/signin/signup',
    'Authentication disabled',
    'Supabase has been removed from this project.'
  );

  return redirectPath;
}

export async function updatePassword(formData: FormData) {
  const password = String(formData.get('password')).trim();
  const passwordConfirm = String(formData.get('passwordConfirm')).trim();
  let redirectPath: string;

  // Check that the password and confirmation match
  if (password !== passwordConfirm) {
    redirectPath = getErrorRedirect(
      '/signin/update_password',
      'Your password could not be updated.',
      'Passwords do not match.'
    );
  }

  // Supabase removed
  // const supabase = createClient();
  // const { error, data } = await supabase.auth.updateUser({...});
  
  redirectPath = getErrorRedirect(
    '/signin/update_password',
    'Authentication disabled',
    'Supabase has been removed from this project.'
  );

  return redirectPath;
}

export async function updateEmail(formData: FormData) {
  // Get form data
  const newEmail = String(formData.get('newEmail')).trim();

  // Check that the email is valid
  if (!isValidEmail(newEmail)) {
    return getErrorRedirect(
      '/account',
      'Your email could not be updated.',
      'Invalid email address.'
    );
  }

  // Supabase removed
  // const supabase = createClient();
  // const { error } = await supabase.auth.updateUser({...});
  
  return getErrorRedirect(
    '/account',
    'Authentication disabled',
    'Supabase has been removed from this project.'
  );
}

export async function updateName(formData: FormData) {
  try {
    // Get form data
    const fullName = String(formData.get('fullName')).trim();
    const userId = String(formData.get('userId')).trim();
    console.log(userId);
    // Supabase removed
    // const supabase = createClient();
    // const { data, error } = await supabase.from('users').update({...});
    
    return getErrorRedirect(
      '/account',
      'Database disabled',
      'Supabase has been removed from this project.'
    );
  } catch (error) {
    return getErrorRedirect(
      '/account',
      'Hmm... Something went wrong.',
      'Your name could not be updated.'
    );
  }
}
