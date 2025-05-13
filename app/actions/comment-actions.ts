"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function insertComment(formData: FormData) {
  const supabase = await createClient();
  const post_id = formData.get("post_id")?.toString();
  const content = formData.get("content")?.toString();

  if (!post_id || !content) {
    console.error("❌ post_id와 content는 필수입니다.");
    return;
  }

  // 로그인된 사용자 확인
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("❌ 로그인된 유저가 없습니다:", userError?.message);
    return;
  }

  // 댓글 삽입
  const { error } = await supabase.from("comments").insert({
    post_id,
    content,
    email: user.user_metadata.email,
  });

  if (error) {
    console.error("❌ 댓글 삽입 실패:", error.message);
    return;
  } else {
    console.log("✅ 댓글 삽입 성공!");
  }

  // 게시물 소유자에게 알림 삽입 (댓글이 달린 게시물의 작성자에게 알림)
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", post_id)
    .single(); // 게시물의 작성자 ID 가져오기

  if (postError) {
    console.error("❌ 게시물 작성자 정보 조회 실패:", postError.message);
    return;
  }

  // 게시물 작성자와 댓글 작성자가 다른 경우에만 알림을 삽입
  // if (postData?.user_id !== user.id) {
  const { error: notificationError } = await supabase
    .from("comment_notifications")
    .insert({
      user_id: postData?.user_id, // 게시물 작성자에게 알림
      user_email: user.user_metadata.email, // 댓글 작성자의 이메일
      post_id,
      comment: content, // 댓글 내용
    });

  if (notificationError) {
    console.error("❌ 알림 삽입 실패:", notificationError.message);
  } else {
    console.log("✅ 알림 삽입 성공!");
  }
  // }

  revalidatePath(`/study/${post_id}`);
}

export async function getCommentsByPostId(postId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("댓글 조회 실패:", error.message);
    return [];
  }

  return data;
}

export async function deleteComment(commentId: string) {
  const supabase = await createClient();

  // 로그인된 사용자 확인
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("❌ 로그인된 유저가 없습니다:", userError?.message);
    return;
  }

  // 댓글 조회
  const { data: comment, error: commentError } = await supabase
    .from("comments")
    .select("author_id")
    .eq("id", commentId)
    .single();

  if (commentError) {
    console.error("❌ 댓글 조회 실패:", commentError.message);
    return;
  }

  // 로그인된 유저가 댓글 작성자인지 확인
  if (comment.author_id !== user.id) {
    console.error("❌ 이 댓글은 삭제할 권한이 없습니다.");
    return;
  }

  // 댓글 삭제
  const { error: deleteError } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (deleteError) {
    console.error("❌ 댓글 삭제 실패:", deleteError.message);
  } else {
    console.log("✅ 댓글 삭제 성공!");
  }

  revalidatePath(`/study/${comment.post_id}`);
}
