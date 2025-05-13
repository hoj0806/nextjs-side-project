"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getMyLikes() {
  const supabase = await createClient();

  // 현재 로그인한 유저 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("❌ 로그인된 유저가 없습니다:", userError?.message);
    return [];
  }

  // 현재 유저의 좋아요 데이터 조회
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ 좋아요 데이터 조회 실패:", error.message);
    return [];
  }

  return data;
}

export async function likePost(formData: FormData) {
  const supabase = await createClient();
  const post_id = formData.get("post_id")?.toString();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !post_id) return;

  const { error } = await supabase.from("likes").insert({
    post_id,
    user_id: user.id, // user_id 명시적으로 지정
  });

  if (error) {
    console.error("찜하기 실패:", error.message);
  }

  revalidatePath("/");
}

export async function unlikePost(formData: FormData) {
  const supabase = await createClient();
  const post_id = formData.get("post_id")?.toString();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !post_id) return;

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", post_id)
    .eq("user_id", user.id);

  if (error) {
    console.error("찜 취소 실패:", error.message);
  }

  revalidatePath("/");
}
