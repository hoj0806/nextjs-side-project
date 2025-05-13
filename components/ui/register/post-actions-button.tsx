import {
  deletePost,
  expirePost,
  unexpirePost,
} from "@/app/actions/post-actions";

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
    <div className='flex gap-2 absolute top-4 right-4'>
      <form action={deletePost}>
        <input type='hidden' name='post_id' value={postId} />
        <button
          type='submit'
          className='text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
        >
          삭제
        </button>
      </form>

      <form action={expired ? unexpirePost : expirePost}>
        <input type='hidden' name='post_id' value={postId} />
        <button
          type='submit'
          className='text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
        >
          {expired ? "마감 취소" : "마감"}
        </button>
      </form>
    </div>
  );
}
