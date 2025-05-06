"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("유저 정보를 가져오는 중 에러:", error.message);
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

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

      {user ? <p>환영합니다, {user.email}</p> : <p>로그인된 유저 없음</p>}

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
