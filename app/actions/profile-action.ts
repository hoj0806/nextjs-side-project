"use server";

import { createAuthClient } from "@/utils/supabase/auth-client";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getMyProfile() {
  const supabase = await createClient();

  // 현재 로그인한 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("유저 정보를 가져오지 못했습니다", userError);
    return null;
  }

  // profiles 테이블에서 해당 유저의 프로필 가져오기
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("프로필을 가져오는 데 실패했습니다", profileError);
    return null;
  }

  return profile;
}

export async function updateProfileAction(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const nickname = formData.get("nickname") as string;
  const job = formData.get("job") as string | null;
  const career = formData.get("career") as string | null;
  const organization = formData.get("organization") as string | null;
  const organization_view = formData.get("organization_view") === "on";

  // 이미지 파일 처리
  const profileImageFile = formData.get("profile_image") as File | null;
  let profile_image_url: string | null = null;

  if (profileImageFile && profileImageFile.size > 0) {
    // 고유 파일명 생성 (예: userId_timestamp_원본파일명)
    const fileExt = profileImageFile.name.split(".").pop();
    const fileName = `${id}_${Date.now()}.${fileExt}`;

    // Storage에 업로드
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(fileName, profileImageFile, {
        cacheControl: "3600",
        upsert: true,
        contentType: profileImageFile.type,
      });

    if (uploadError) {
      console.error("이미지 업로드 실패", uploadError);
    } else {
      // 업로드 성공하면 public URL 생성
      profile_image_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-images/${fileName}`;
    }
  }

  // 업데이트할 데이터 객체 생성
  const updateData: any = {
    nickname,
    job,
    career,
    organization,
    organization_view,
  };

  // 이미지가 업로드 됐다면 프로필 이미지 URL도 업데이트
  if (profile_image_url) {
    updateData.profile_image = profile_image_url;
  }

  const { error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("프로필 업데이트 실패", error);
    // 에러처리 필요 시 작성
  }

  revalidatePath("/setting"); // Next.js ISR 재검증
}
