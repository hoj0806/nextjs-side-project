// components/comments/CommentList.tsx

import CommentDeleteButton from "@/components/CommentDeleteButton";

type Comment = {
  id: string;
  content: string;
  created_at: string;
  email?: string;
};

type CommentListProps = {
  comments: Comment[];
};

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className='mt-6 space-y-4'>
      {comments.length === 0 ? (
        <p className='text-gray-500'>아직 댓글이 없습니다.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className='pb-4 border-b-gray-200 border-b-2 text-sm'
          >
            <div className='text-gray-500 text-xs mt-2 flex flex-col'>
              <span>{comment.email ?? "알 수 없음"}</span>
              <span>{comment.created_at}</span>
            </div>
            <div className='text-gray-800 whitespace-pre-wrap'>
              {comment.content}
            </div>

            <div className='mt-2'>
              <CommentDeleteButton commentId={comment.id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
