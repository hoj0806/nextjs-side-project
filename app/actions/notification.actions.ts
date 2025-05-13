import { createClient } from "@/utils/supabase/server";

export async function getMyCommentNotifications() {
  const supabase = await createClient();

  // 현재 로그인된 유저 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("❌ 로그인된 유저가 없습니다:", userError?.message);
    return [];
  }

  // 로그인한 유저의 user_id와 일치하는 알람만 가져오기
  const { data, error } = await supabase
    .from("comment_notifications")
    .select("*")
    .eq("user_id", user.id) // 로그인한 유저가 수신자인 알람만
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ 알림 조회 실패:", error.message);
    return [];
  }

  return data;
}

export async function deleteCommentNotificationById(notificationId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("❌ 로그인된 유저가 없습니다:", userError?.message);
    return;
  }

  const { error } = await supabase
    .from("comment_notifications")
    .delete()
    .eq("id", notificationId);

  if (error) {
    console.error("❌ 알림 삭제 실패:", error.message);
  } else {
    console.log("✅ 알림 삭제 성공!");
  }
}
