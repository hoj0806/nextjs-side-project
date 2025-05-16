"use client";
import { useRouter } from "next/navigation";

export default function DeleteAccountButton() {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."))
      return;

    const res = await fetch("/api/delete-account", { method: "POST" });

    if (res.ok) {
      router.push("/");
    } else {
      alert("탈퇴 실패");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className='bg-red-600 text-white px-4 py-2 rounded w-[468px] mx-auto block'
    >
      회원탈퇴
    </button>
  );
}
