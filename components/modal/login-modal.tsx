"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Props } from "@/types";

const jobOptions = [
  "프론트엔드",
  "백엔드",
  "디자이너",
  "IOS",
  "안드로이드",
  "데브옵스",
  "PM",
  "기획자",
  "마케터",
];

const careerOptions = [
  "0년",
  "1년",
  "2년",
  "3년",
  "4년",
  "5년",
  "6년",
  "7년",
  "8년",
  "9년",
  "10년 이상",
];

const LoginModal = ({ onClose }: Props) => {
  const supabase = createClient();

  const [step, setStep] = useState<"provider" | "form">("provider");
  const [selectedProvider, setSelectedProvider] = useState<
    "github" | "google" | "kakao" | null
  >(null);
  const [formData, setFormData] = useState({
    nickname: "",
    job: jobOptions[0], // 기본값 첫번째 옵션
    career: careerOptions[0], // 기본값 첫번째 옵션
    organization: "",
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

    localStorage.setItem(
      "pendingUserMetadata",
      JSON.stringify({
        nickname: formData.nickname,
        job: formData.job,
        career: formData.career,
        organization: formData.organization,
      })
    );

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
              placeholder='닉네임'
              value={formData.nickname}
              onChange={(e) =>
                setFormData({ ...formData, nickname: e.target.value })
              }
              className='border p-2 rounded'
              required
            />

            <select
              value={formData.job}
              onChange={(e) =>
                setFormData({ ...formData, job: e.target.value })
              }
              className='border p-2 rounded'
              required
            >
              {jobOptions.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>

            <select
              value={formData.career}
              onChange={(e) =>
                setFormData({ ...formData, career: e.target.value })
              }
              className='border p-2 rounded'
              required
            >
              {careerOptions.map((career) => (
                <option key={career} value={career}>
                  {career}
                </option>
              ))}
            </select>

            <input
              type='text'
              placeholder='소속'
              value={formData.organization}
              onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
              }
              className='border p-2 rounded'
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
