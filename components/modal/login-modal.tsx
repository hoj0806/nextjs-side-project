"use client";

import { createClient } from "@/utils/supabase/client";
import type { Props } from "@/types";

const LoginModal = ({ onClose }: Props) => {
  const supabase = createClient();

  const handleProviderLogin = async (
    provider: "github" | "google" | "kakao"
  ) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("OAuth 로그인 실패:", error.message);
      alert("로그인 실패");
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg p-6 w-96 shadow-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>로그인</h2>
          <button onClick={onClose} className='text-gray-600 hover:text-black'>
            ✕
          </button>
        </div>

        <div className='space-y-2'>
          <button
            onClick={() => handleProviderLogin("github")}
            className='w-full bg-gray-800 text-white p-2 rounded'
          >
            깃허브로 로그인
          </button>
          <button
            onClick={() => handleProviderLogin("kakao")}
            className='w-full bg-yellow-300 text-black p-2 rounded'
          >
            카카오로 로그인
          </button>
          <button
            onClick={() => handleProviderLogin("google")}
            className='w-full bg-white border p-2 rounded text-black'
          >
            구글로 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
