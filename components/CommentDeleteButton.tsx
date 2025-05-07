// components/CommentDeleteButton.tsx
"use client";

import { useState } from "react";
import { deleteComment } from "@/app/actions";

type CommentDeleteButtonProps = {
  commentId: string;
};

const CommentDeleteButton = ({ commentId }: CommentDeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteComment(commentId); // 서버에 삭제 요청
    setIsDeleting(false);
  };

  return (
    <button
      className={`text-red-500 hover:text-red-700 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "삭제 중..." : "삭제"}
    </button>
  );
};

export default CommentDeleteButton;
