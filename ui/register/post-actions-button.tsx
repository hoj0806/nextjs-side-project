import {
  deletePost,
  expirePost,
  unexpirePost,
} from "@/app/actions/post-actions";
import Link from "next/link";

type PostActionButtonsProps = {
  postId: string;
  expired: boolean;
  isAuthor: boolean;
};

export default function PostActionButtons({
  postId,
  expired,
  isAuthor,
}: PostActionButtonsProps) {
  if (!isAuthor) return null;

  return (
    <div className='flex gap-2 items-center mb-6'>
      <form action={deletePost}>
        <input type='hidden' name='post_id' value={postId} />
        <button type='submit' className='text-xl font-bold text-black'>
          삭제
        </button>
      </form>

      <form action={expired ? unexpirePost : expirePost}>
        <input type='hidden' name='post_id' value={postId} />
        <button type='submit' className='text-xl font-bold text-black'>
          {expired ? "마감 취소" : "마감"}
        </button>
      </form>
      <Link
        href={`/study/edit/${postId}`}
        className='text-xl font-bold text-black'
      >
        수정
      </Link>
    </div>
  );
}
