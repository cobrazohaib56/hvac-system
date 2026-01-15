// Supabase removed
// import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const createClient = (request: NextRequest) => {
  // Supabase removed - returning empty response
  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });
  return { supabase: null as any, response };
};

export const updateSession = async (request: NextRequest) => {
  // Supabase removed - just pass through
  // const { supabase, response } = createClient(request);
  // await supabase.auth.getUser();
  
  return NextResponse.next({
    request: {
      headers: request.headers
    }
  });
};
