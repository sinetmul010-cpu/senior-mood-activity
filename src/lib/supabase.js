import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gsstmtphlmbzhwrsiexr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdzc3RtdHBobG1iemh3cnNpZXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0NjQ2OTksImV4cCI6MjEwODA0MDY5OX0.np7-3M3E0y8hdPLZ6wCkcjmQyRXPUcdUn5fAgp9-hxA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 구글 로그인 실행 함수
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  if (error) {
    console.error('Google Sign In Error:', error);
    throw error;
  }
  return data;
}

/**
 * 로그아웃 함수
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign Out Error:', error);
    throw error;
  }
}
