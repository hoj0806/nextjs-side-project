"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AuthCallbackClient() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function updateProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const metadataStr = localStorage.getItem("pendingUserMetadata");
      if (!metadataStr) {
        router.replace("/");
        return;
      }

      const metadata = JSON.parse(metadataStr);
      console.log("metadataStr", metadataStr);
      console.log("metadata", metadata);
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        first_name: metadata.first_name,
        last_name: metadata.last_name,
      });

      if (error) {
        console.error("프로필 업데이트 실패", error);
        // 필요하면 에러 처리
      }

      localStorage.removeItem("pendingUserMetadata");
      router.replace("/");
    }

    updateProfile();
  }, [router, supabase]);

  return <div>로그인 처리 중입니다...</div>;
}
