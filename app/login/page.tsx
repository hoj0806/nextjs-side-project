"use client";

import { createClient } from "@/utils/supabase/client";

const LoginPage = () => {
  const signInWithGithub = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("OAuth 로그인 에러:", error.message);
    }
  };

  const signInWithKakao = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("OAuth 로그인 에러:", error.message);
    }
  };

  const signInWithGoogle = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("OAuth 로그인 에러:", error.message);
    }
  };

  return (
    <>
      <h1>Login page</h1>
      <form>
        <button
          onClick={signInWithGithub}
          className='bg-gray-400 p-2 rounded-lg'
        >
          깃허브 로그인
        </button>
        <button
          onClick={signInWithKakao}
          className='bg-yellow-300 p-2 rounded-lg text-black'
        >
          카카오 로그인
        </button>
        <button
          onClick={signInWithGoogle}
          className='bg-white p-2 rounded-lg text-black'
        >
          구글 로그인
        </button>
      </form>
    </>
  );
};

export default LoginPage;
