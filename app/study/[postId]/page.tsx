import {
  getCommentsByPostId,
  getPostById,
  markPostAsRead,
} from "@/app/actions";
import CommentDeleteButton from "@/components/CommentDeleteButton";
import CommentForm from "@/components/study/comment-form";
import CommentList from "@/components/study/comment-list";
import BackButton from "@/components/ui/register/back-button";
import PostActionButtons from "@/components/ui/register/post-actions-button";
import PostDescriptionLabel from "@/components/ui/register/post-description-label";
import PostContent from "@/components/ui/register/PostContent";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

type PostDetailPageProps = {
  params: Promise<{
    postId: string;
  }>;
};

const PostDetailPage = async ({ params }: PostDetailPageProps) => {
  const { postId } = await params;
  await markPostAsRead(postId);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [post, comments] = await Promise.all([
    getPostById(postId),
    getCommentsByPostId(postId),
  ]);

  if (!post) {
    return (
      <div className='text-center mt-10 text-red-600'>
        ❌ 게시글을 찾을 수 없습니다.
      </div>
    );
  }

  const isAuthor = user?.id === post.user_id;

  return (
    <section className='w-[852px] max-w-screen-xl mx-auto mt-10 bg-white space-y-6 relative text-black'>
      <BackButton />

      {isAuthor && (
        <PostActionButtons
          postId={postId}
          expired={post.expired}
          isAuthor={isAuthor}
        />
      )}

      <div className='border-b-2 border-b-gray-200 pb-[32px]'>
        <h1 className='text-3xl font-bold'>{post.title}</h1>
        {/* 유저 닉네임 표시 되도록 */}
        <p className='text-gray-500 text-md font-semibold'>
          {post.deadline.split("-").join(".")}
        </p>
      </div>

      <div className='grid grid-cols-2 gap-4 text-sm text-gray-600'>
        <PostDescriptionLabel label='모집 구분'>
          {post.category}
        </PostDescriptionLabel>
        <PostDescriptionLabel label='진행 방식'>
          {post.mode}
        </PostDescriptionLabel>
        <PostDescriptionLabel label='모집 인원'>
          {post.recruitment_count}
        </PostDescriptionLabel>
        <PostDescriptionLabel label='시작 예정'>
          {post.deadline}
        </PostDescriptionLabel>
        <PostDescriptionLabel label='연락 방법'>
          <a
            href={post.contact_link}
            className='text-blue-600 underline break-all'
            target='_blank'
          >
            {post.contact_method}
          </a>
        </PostDescriptionLabel>
        <PostDescriptionLabel label='예상 기간'>
          {post.duration}
        </PostDescriptionLabel>
        <PostDescriptionLabel label='모집 분야'>
          <ul className='flex gap-2'>
            {post.positions.map((position: string) => {
              return <li key={position}>{position}</li>;
            })}
          </ul>
        </PostDescriptionLabel>
        <PostDescriptionLabel label='기술 스택'>
          <ul className='flex gap-2'>
            {post.tech_stack.map((stack: string) => {
              return (
                <li key={stack}>
                  <Image
                    src={`/images/languages/${stack}.png`}
                    width={32}
                    height={32}
                    alt={stack}
                  />
                </li>
              );
            })}
          </ul>
        </PostDescriptionLabel>
      </div>

      <div className='border-b-gray-300 border-b-2 pb-10'>
        <h2 className='text-xl font-bold'>프로젝트 소개</h2>
      </div>
      <PostContent content={post.content} />

      {/* 💬 댓글 작성 */}
      <CommentForm postId={postId} commentCount={comments.length} />

      {/* 💬 댓글 목록 */}
      <CommentList comments={comments} />
    </section>
  );
};

export default PostDetailPage;
