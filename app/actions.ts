"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Provider } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

const signInWith = (provider: Provider) => async () => {
  const supabase = await createClient();

  const auth_callback_url = `${process.env.SITE_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: auth_callback_url,
    },
  });

  console.log(data);

  if (error) {
    console.log(error);
  }

  redirect(data.url as string);
};

export const signInWithGithub = signInWith("github");
export const signInWithKakao = signInWith("kakao");

export async function handleRegister(formData: FormData): Promise<void> {
  const supabase = await createClient();

  // FormData 값 꺼내기
  const data = Object.fromEntries(formData.entries());
  const tech_stack = formData.getAll("tech_stack"); // 배열로 받기
  const positions = formData.getAll("positions");

  const {
    category,
    recruitment_count,
    mode,
    duration,
    deadline,
    contact_method,
    contact_link,
    title,
    content,
  } = data;

  // 현재 로그인한 유저 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("로그인된 유저가 없습니다:", userError?.message);
    return;
  }

  // Supabase insert
  const { error } = await supabase.from("posts").insert({
    category,
    recruitment_count,
    mode,
    duration,
    deadline,
    contact_method,
    contact_link,
    title,
    content,
    tech_stack,
    positions,
    user_id: user.id, // 명시적으로 삽입
  });

  if (error) {
    console.error("삽입 실패:", error.message);
  } else {
    console.log("✅ 삽입 성공!");
  }
}

export async function getPosts(
  categoryParams?: string,
  modeParams?: string,
  positionParams?: string,
  searchQuery?: string,
  page: number = 1,
  pageSize: number = 1
) {
  const supabase = await createClient();
  let query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (categoryParams) {
    query = query.eq("category", categoryParams);
  }

  if (modeParams) {
    query = query.eq("mode", modeParams);
  }

  if (positionParams) {
    query = query.overlaps("positions", [positionParams]);
  }

  if (searchQuery) {
    query = query.or(
      `title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`
    );
  }
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error("게시글 조회 실패:", error.message);
    return { data: [], total: 0 };
  }

  return { data, total: count ?? 0 }; // ✅ 총 개수 함께 반환
}

export async function getPostById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("게시글 조회 실패:", error.message);
    return null;
  }

  return data;
}

export async function getMyPosts() {
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

  // 현재 유저가 작성한 게시물 조회
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ 나의 게시물 조회 실패:", error.message);
    return [];
  }

  return data;
}

// 댓글 삽입 함수
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
  } else {
    console.log("✅ 댓글 삽입 성공!");
  }

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

// 댓글 삭제 함수
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

export async function deletePost(formData: FormData) {
  const supabase = await createClient();
  const post_id = formData.get("post_id")?.toString();
  // 로그인된 사용자 정보 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("❌ 로그인된 유저가 없습니다:", userError?.message);
    return;
  }

  // 삭제할 게시글이 현재 유저의 것인지 확인
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", post_id)
    .single();

  if (postError) {
    console.error("❌ 게시글 조회 실패:", postError.message);
    return;
  }

  if (post.user_id !== user.id) {
    console.error("❌ 이 게시글을 삭제할 권한이 없습니다.");
    return;
  }

  // 게시글 삭제
  const { error: deleteError } = await supabase
    .from("posts")
    .delete()
    .eq("id", post_id);

  if (deleteError) {
    console.error("❌ 게시글 삭제 실패:", deleteError.message);
    return;
  }

  console.log("✅ 게시글 삭제 성공!");

  revalidatePath("/");
  redirect("/");
}
