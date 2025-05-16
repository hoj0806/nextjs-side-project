// components/comments/CommentList.tsx

import CommentDeleteButton from "@/components/CommentDeleteButton";
import { formatDate } from "@/utils/helper";
import Image from "next/image";

type Comment = {
  id: string;
  content: string;
  created_at: string;
  author_profile_image: string;
  author_nickname: string;
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
          <div key={comment.id} className='pb-4 border-b-2 mb-6'>
            <div className='flex justify-between items-start'>
              <div className='flex gap-4 items-start mb-3'>
                <Image
                  src={comment.author_profile_image}
                  width={64}
                  height={64}
                  alt='profile image'
                  className='rounded-full w-10 h-10 object-cover'
                />
                <div className='flex-1'>
                  <div className='flex flex-col'>
                    <span className='text-gray-900 font-boldtext-lg'>
                      {comment.author_nickname}
                    </span>
                    <span>{formatDate(comment.created_at)}</span>
                  </div>
                </div>
              </div>
              <CommentDeleteButton commentId={comment.id} />
            </div>
            <div className='text-gray-800 whitespace-pre-wrap mt-1 text-lg'>
              {comment.content}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
