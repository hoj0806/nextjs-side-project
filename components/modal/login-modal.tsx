"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Props } from "@/types"; // Import Props type

const LoginModal = ({ onClose }: Props) => {
  const supabase = createClient();

  const [step, setStep] = useState<"provider" | "form">("provider");
  const [selectedProvider, setSelectedProvider] = useState<
    "github" | "google" | "kakao" | null
  >(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  });

  const handleProviderSelect = (provider: "github" | "google" | "kakao") => {
    setSelectedProvider(provider);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProvider) {
      alert("공급자를 선택해주세요.");
      return;
    }

    // localStorage에 저장 (콜백 페이지에서 읽을 용도)
    localStorage.setItem(
      "pendingUserMetadata",
      JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
      })
    );

    // OAuth 로그인 요청 (queryParams는 생략해도 됨)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: selectedProvider,
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

        {step === "provider" && (
          <div className='space-y-2'>
            <button
              onClick={() => handleProviderSelect("github")}
              className='w-full bg-gray-800 text-white p-2 rounded'
            >
              깃허브로 로그인
            </button>
            <button
              onClick={() => handleProviderSelect("kakao")}
              className='w-full bg-yellow-300 text-black p-2 rounded'
            >
              카카오로 로그인
            </button>
            <button
              onClick={() => handleProviderSelect("google")}
              className='w-full bg-white border p-2 rounded text-black'
            >
              구글로 로그인
            </button>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <input
              type='text'
              placeholder='이름 (first name)'
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              className='border p-2 rounded'
              required
            />
            <input
              type='text'
              placeholder='성 (last name)'
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              className='border p-2 rounded'
              required
            />
            <button
              type='submit'
              className='bg-purple-600 text-white p-2 rounded hover:bg-purple-700'
            >
              로그인 시작
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
