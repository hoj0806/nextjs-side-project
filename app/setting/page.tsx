import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  deleteAccountAction,
  getMyProfile,
  updateProfileAction,
} from "../actions/profile-action";
import ProfileImageUploader from "@/components/setting/profile-image-uploader";
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
    <div className='py-10 px-4 max-w-xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>설정 페이지</h1>

      {/* 프로필 이미지 미리보기 */}
      <div className='mb-6 flex items-center space-x-4'>
        <span className='text-lg font-medium'>{profile.nickname}</span>
      </div>

      <form
        action={updateProfileAction}
        method='POST'
        encType='multipart/form-data'
        className='space-y-4'
      >
        <input type='hidden' name='id' value={profile.id} />

        {/* 🔼 이미지 업로드 필드 추가 */}
        <ProfileImageUploader
          currentImageUrl={profile.profile_image}
          nickname={profile.nickname}
        />

        <div>
          <label className='block text-sm font-medium'>닉네임</label>
          <input
            name='nickname'
            defaultValue={profile.nickname ?? ""}
            className='w-full border px-3 py-2 rounded'
          />
        </div>

        <div>
          <label className='block text-sm font-medium'>직업</label>
          <input
            name='job'
            defaultValue={profile.job ?? ""}
            className='w-full border px-3 py-2 rounded'
          />
        </div>

        <div>
          <label className='block text-sm font-medium'>경력</label>
          <input
            name='career'
            defaultValue={profile.career ?? ""}
            className='w-full border px-3 py-2 rounded'
          />
        </div>

        <div>
          <label className='block text-sm font-medium'>소속</label>
          <input
            name='organization'
            defaultValue={profile.organization ?? ""}
            className='w-full border px-3 py-2 rounded'
          />
        </div>

        <div className='flex items-center space-x-2'>
          <input
            type='checkbox'
            name='organization_view'
            defaultChecked={profile.organization_view}
            className='h-4 w-4'
          />
          <label>소속 공개 여부</label>
        </div>

        <button
          type='submit'
          className='bg-purple-600 text-white px-4 py-2 rounded'
        >
          저장하기
        </button>
      </form>
      <DeleteAccountButton />
    </div>
  );
};

export default SettingPage;
