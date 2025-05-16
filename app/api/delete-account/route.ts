import { createAuthClient } from "@/utils/supabase/auth-client";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createAuthClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error: profileDeleteError } = await supabase
      .from("profiles")
      .delete()
      .eq("id", user.id);

    if (profileDeleteError) throw profileDeleteError;

    const { error: deleteError } = await supabase.auth.admin.deleteUser(
      user.id
    );

    if (deleteError) throw deleteError;

    return NextResponse.json({ message: "계정이 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json({ error: "계정 삭제 실패" }, { status: 500 });
  }
}
