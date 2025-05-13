import { insertComment } from "@/app/actions/comment-actions";

type CommentFormProps = {
  postId: string;
  commentCount: number;
};

export default function CommentForm({
  postId,
  commentCount,
}: CommentFormProps) {
  return (
    <div>
      <p className='font-bold'>
        댓글 <span className='text-gray-500'>{commentCount}</span>
      </p>
      <form action={insertComment} className='space-y-4 mt-8'>
        <input type='hidden' name='post_id' value={postId} />
        <textarea
          name='content'
          required
          className='w-full border p-2 rounded resize-none'
          placeholder='댓글을 입력하세요'
        />
        <button
          type='submit'
          className='bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700'
        >
          댓글 작성
        </button>
      </form>
    </div>
  );
}
