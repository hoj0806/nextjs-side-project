import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getMyProfile, updateProfileAction } from "../actions/profile-action";
import DeleteAccountButton from "@/components/setting/delete-account-button";

const SettingPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/");
  }

  const profile = await getMyProfile();

  return (
    <div className='py-10 px-4 flex flex-col items-center text-center'>
      <div className='relative w-52 h-52 mb-4'>
        {/* 프로필 이미지 */}
        <img
          src={profile.profile_image ?? "/default-profile.png"}
          alt='프로필 이미지'
          className='w-52 h-52 rounded-full object-cover'
        />

        {/* 이미지 업로드 버튼 (오버레이) */}
        <label
          htmlFor='image-upload'
          className='absolute bottom-0 right-0 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded cursor-pointer'
        >
          이미지 변경
        </label>
      </div>

      {/* 환영 메시지 */}
      <p className='text-lg font-semibold mb-6'>
        {profile.nickname}님, 환영합니다!
      </p>

      {/* 설정 폼 */}
      <form
        action={updateProfileAction}
        method='POST'
        encType='multipart/form-data'
        className='space-y-4 w-[468px] mb-6'
      >
        <input type='hidden' name='id' value={profile.id} />
        <input
          type='file'
          id='image-upload'
          name='profile_image'
          accept='image/*'
          className='hidden'
        />

        <div>
          <label className='block text-sm font-medium text-left w-full mb-2'>
            닉네임
          </label>
          <input
            name='nickname'
            defaultValue={profile.nickname ?? ""}
            className='w-[468px] border px-3 py-2 rounded'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-left w-full mb-2'>
            직무
          </label>
          <select
            name='job'
            defaultValue={profile.job ?? ""}
            className='w-[468px] border px-3 py-2 rounded'
          >
            <option value=''>선택</option>
            <option value='프론트엔드'>프론트엔드</option>
            <option value='백엔드'>백엔드</option>
            <option value='디자이너'>디자이너</option>
            <option value='IOS'>IOS</option>
            <option value='안드로이드'>안드로이드</option>
            <option value='데브옵스'>데브옵스</option>
            <option value='PM'>PM</option>
            <option value='기획자'>기획자</option>
            <option value='마케터'>마케터</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-left w-full mb-2'>
            소속
          </label>
          <input
            name='organization'
            defaultValue={profile.organization ?? ""}
            className='w-[468px] border px-3 py-2 rounded'
          />
        </div>

        <div className='flex items-center space-x-2 mb-4'>
          <input
            type='checkbox'
            name='organization_view'
            defaultChecked={profile.organization_view}
            className='h-4 w-4'
          />
          <label>소속 공개 여부</label>
        </div>

        <div>
          <label className='block text-sm font-medium text-left w-full mb-2'>
            경력
          </label>
          <select
            name='career'
            defaultValue={profile.career ?? ""}
            className='w-[468px] border px-3 py-2 rounded'
          >
            <option value=''>선택</option>
            {Array.from({ length: 11 }).map((_, i) => (
              <option key={i} value={i === 10 ? "10+" : i}>
                {i === 10 ? "10년 이상" : `${i}년`}
              </option>
            ))}
          </select>
        </div>

        <button
          type='submit'
          className='bg-purple-600 text-white px-4 py-2 rounded w-[468px]'
        >
          저장하기
        </button>
      </form>
      <DeleteAccountButton />
    </div>
  );
};

export default SettingPage;
