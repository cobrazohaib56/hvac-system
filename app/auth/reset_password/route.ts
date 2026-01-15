// Supabase removed
// import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getErrorRedirect, getStatusRedirect } from '@/utils/helpers';

export async function GET(request: NextRequest) {
  // Supabase removed - password reset callback disabled
  const requestUrl = new URL(request.url);
  // const code = requestUrl.searchParams.get('code');
  // const supabase = createClient();
  // const { error } = await supabase.auth.exchangeCodeForSession(code);

  return NextResponse.redirect(
    getErrorRedirect(
      `${requestUrl.origin}/signin/forgot_password`,
      'Authentication disabled',
      'Supabase has been removed from this project.'
    )
  );
}
