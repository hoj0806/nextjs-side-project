import { insertComment } from "@/app/actions/comment-actions";
import { getMyProfile } from "@/app/actions/profile-action";
import Image from "next/image";

type CommentFormProps = {
  postId: string;
  commentCount: number;
};

export default async function CommentForm({
  postId,
  commentCount,
}: CommentFormProps) {
  const profile = await getMyProfile();

  if (!profile) return null; // 또는 로딩 스피너 표시

  return (
    <div>
      <p className='font-bold'>
        댓글 <span className='text-gray-500'>{commentCount}</span>
      </p>

      <form action={insertComment} className='mt-2 space-y-2'>
        {/* 숨겨진 post_id */}
        <input type='hidden' name='post_id' value={postId} />

        {/* 이미지 + 텍스트 영역 */}
        <div className='flex items-start gap-2'>
          <Image
            src={profile.profile_image}
            width={40}
            height={40}
            alt='profile_image'
            className='rounded-full object-cover'
          />
          <textarea
            name='content'
            required
            className='w-full border-2 p-2 rounded-xl resize-none'
            placeholder='댓글을 입력하세요'
          />
        </div>

        {/* 버튼: 오른쪽 정렬 */}
        <div className='flex justify-end  mt-5'>
          <button
            type='submit'
            className='bg-gray-900  text-white px-4 py-2 rounded-full font-extrabold'
          >
            댓글 등록
          </button>
        </div>
      </form>
    </div>
  );
}
