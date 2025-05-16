"use client";

import React, { useState, useEffect } from "react";

type Props = {
  currentImageUrl: string | null;
  nickname: string | null;
};

export default function ProfileImageUploader({
  currentImageUrl,
  nickname,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl);

  // 이미지 파일 선택 시 미리보기 업데이트
  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  }

  // 컴포넌트 언마운트 시 오브젝트 URL 해제
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== currentImageUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, currentImageUrl]);

  return (
    <div className='mb-6 flex items-center space-x-4'>
      <img
        src={previewUrl ?? "/default-profile.webp"}
        alt={`${nickname ?? "프로필"} 이미지`}
        className='w-16 h-16 rounded-full object-cover border'
      />
      <div>
        <label className='block text-sm font-medium mb-1'>
          프로필 이미지 변경
        </label>
        <input
          type='file'
          accept='image/*'
          name='profile_image'
          onChange={onFileChange}
        />
      </div>
    </div>
  );
}


