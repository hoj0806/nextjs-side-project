"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

export async function handleRegister(formData: FormData): Promise<void> {
  const supabase = await createClient();

  // FormData 값 꺼내기
  const data = Object.fromEntries(formData.entries());
  let tech_stack = formData.getAll("tech_stack"); // 배열로 받기
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

  tech_stack = tech_stack
    .filter((tech) => typeof tech === "string") // 필터링하여 문자열만 처리
    .map((tech: string) => tech.trim().toLowerCase());
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

export async function updatePost(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const data = Object.fromEntries(formData.entries());
  const tech_stack = formData
    .getAll("tech_stack")
    .filter((t) => typeof t === "string") as string[];
  const positions = formData
    .getAll("positions")
    .filter((p) => typeof p === "string") as string[];

  const {
    postId, // 🔥 FormData에서 받아온 postId 사용
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

  if (!postId || typeof postId !== "string") {
    console.error("postId가 없습니다.");
    return;
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("로그인된 유저가 없습니다:", userError?.message);
    return;
  }

  const { error } = await supabase
    .from("posts")
    .update({
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
    })
    .eq("id", postId)
    .eq("user_id", user.id);

  if (error) {
    console.error("업데이트 실패:", error.message);
  } else {
    console.log("✅ 업데이트 성공!");
  }
}

export async function getPosts(
  categoryParams?: string,
  modeParams?: string,
  positionParams?: string,
  searchQuery?: string,
  techStackParams?: string[], // tech_stack 파라미터를 배열로 받도록 추가
  page: number = 1,
  pageSize: number = 20,
  showAll?: string
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

  if (showAll !== "true") {
    query = query.eq("expired", false);
  }

  if (techStackParams && techStackParams.length > 0) {
    query = query.overlaps("tech_stack", techStackParams);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error("게시글 조회 실패:", error.message);
    return { data: [], total: 0 };
  }

  // 댓글 수 추가: 각 게시물에 댓글 수를 추가
  const postsWithCommentCount = await Promise.all(
    data.map(async (post) => {
      const { count: commentCount, error: commentError } = await supabase
        .from("comments")
        .select("*", { count: "exact", head: true })
        .eq("post_id", post.id);

      if (commentError) {
        console.error("댓글 수 조회 실패:", commentError);
      }

      return {
        ...post,
        commentCount: commentCount ?? 0, // 댓글 수 추가
      };
    })
  );

  return { data: postsWithCommentCount, total: count ?? 0 };
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

export async function getMyLikesPosts(postIds: string[]) {
  const supabase = await createClient();
  let query = supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  // postIds가 주어졌다면 필터링 쿼리 추가
  if (postIds && postIds.length > 0) {
    query = query.in("id", postIds);
  }

  const { data, error } = await query;

  if (error) {
    console.error("게시글 조회 실패:", error.message);
    return [];
  }

  return data;
}

export async function getMyReadPosts(postIds: string[]) {
  const supabase = await createClient();
  let query = supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (postIds && postIds.length > 0) {
    query = query.in("id", postIds);
  }

  const { data, error } = await query;

  if (error) {
    console.error("게시글 조회 실패:", error.message);
    return [];
  }

  return data;
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

// 게시글 expired를 true로 설정
export async function expirePost(formData: FormData) {
  const postId = formData.get("post_id") as string;
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("❌ 로그인된 유저가 없습니다:", userError?.message);
    return;
  }

  // 게시글 소유자 확인
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", postId)
    .single();

  if (postError) {
    console.error("❌ 게시글 조회 실패:", postError.message);
    return;
  }

  if (post.user_id !== user.id) {
    console.error("❌ 이 게시글의 만료 상태를 변경할 권한이 없습니다.");
    return;
  }

  const { error } = await supabase
    .from("posts")
    .update({ expired: true })
    .eq("id", postId);

  if (error) {
    console.error("❌ 게시글 expired true 설정 실패:", error.message);
  } else {
    console.log("✅ 게시글 expired true 설정 성공!");
    revalidatePath(`/study/${postId}`);
  }
}

// 게시글 expired를 false로 설정
export async function unexpirePost(formData: FormData) {
  const postId = formData.get("post_id") as string;
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("❌ 로그인된 유저가 없습니다:", userError?.message);
    return;
  }

  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", postId)
    .single();

  if (postError) {
    console.error("❌ 게시글 조회 실패:", postError.message);
    return;
  }

  if (post.user_id !== user.id) {
    console.error("❌ 이 게시글의 만료 상태를 변경할 권한이 없습니다.");
    return;
  }

  const { error } = await supabase
    .from("posts")
    .update({ expired: false })
    .eq("id", postId);

  if (error) {
    console.error("❌ 게시글 expired false 설정 실패:", error.message);
  } else {
    console.log("✅ 게시글 expired false 설정 성공!");
    revalidatePath(`/study/${postId}`);
  }
}

export async function markPostAsRead(postId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("❌ 로그인된 유저가 없습니다:", userError?.message);
    return;
  }

  if (!postId) {
    console.error("❌ postId가 제공되지 않았습니다.");
    return;
  }

  const { error: upsertError } = await supabase.from("read_posts").upsert(
    {
      user_id: user.id,
      post_id: postId,
    },
    { onConflict: "user_id,post_id" } // 복합 유니크 키 기준
  );

  if (upsertError) {
    console.error("❌ 읽은 게시물 기록 실패:", upsertError.message);
  } else {
    console.log("✅ 읽은 게시물 기록 성공!");
  }
}

export async function getMyReadData() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("❌ 로그인된 유저가 없습니다:", userError?.message);
    return [];
  }

  const { data: readPosts, error: fetchError } = await supabase
    .from("read_posts")
    .select("post_id") // 원하는 데이터만 선택
    .eq("user_id", user.id); // 로그인한 사용자의 읽은 게시물만 조회

  if (fetchError) {
    console.error("❌ 읽은 게시물 조회 실패:", fetchError.message);
    return [];
  }

  // post_id만 반환
  return readPosts || [];
}

export async function increaseView(postId: string) {
  const supabase = await createClient();

  // 1. 현재 view 값 가져오기
  const { data, error: fetchError } = await supabase
    .from("posts")
    .select("view")
    .eq("id", postId)
    .single();

  if (fetchError || !data) {
    console.error("조회수 가져오기 실패:", fetchError?.message);
    return;
  }

  const currentView = data.view ?? 0;

  // 2. view + 1로 업데이트
  const { error: updateError } = await supabase
    .from("posts")
    .update({ view: currentView + 1 })
    .eq("id", postId);

  if (updateError) {
    console.error("조회수 업데이트 실패:", updateError.message);
  }
}
