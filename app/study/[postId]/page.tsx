import { getPostById, insertComment } from "@/app/actions";

type PostDetailPageProps = {
  params: {
    postId: string;
  };
};

const PostDetailPage = async ({ params }: PostDetailPageProps) => {
  const post = await getPostById(params.postId);

  if (!post) {
    return (
      <div className='text-center mt-10 text-red-600'>
        ❌ 게시글을 찾을 수 없습니다.
      </div>
    );
  }

  console.log(post);
  return (
    <div className='max-w-3xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md space-y-6'>
      <h1 className='text-2xl font-bold'>{post.title}</h1>

      <div className='text-gray-700 whitespace-pre-wrap'>{post.content}</div>

      <div className='grid grid-cols-2 gap-4 text-sm text-gray-600'>
        <div>
          <strong>모집 구분:</strong> {post.category}
        </div>
        <div>
          <strong>모집 인원:</strong> {post.recruitment_count}
        </div>
        <div>
          <strong>진행 방식:</strong> {post.mode}
        </div>
        <div>
          <strong>진행 기간:</strong> {post.duration}
        </div>
        <div>
          <strong>마감일:</strong> {post.deadline}
        </div>
        <div>
          <strong>연락 방법:</strong> {post.contact_method}
        </div>
        <div className='col-span-2'>
          <strong>연락 링크:</strong>
          <a
            href={post.contact_link}
            className='text-blue-600 underline break-all'
            target='_blank'
          >
            {post.contact_link}
          </a>
        </div>
      </div>

      <div className='space-y-2'>
        <div>
          <strong>기술 스택:</strong>
          <span className='text-sm text-gray-800'>
            {post.tech_stack?.join(", ")}
          </span>
        </div>
        <div>
          <strong>모집 포지션:</strong>
          <span className='text-sm text-gray-800'>
            {post.positions?.join(", ")}
          </span>
        </div>
      </div>

      {/* 💬 댓글 작성 */}
      <form action={insertComment} className='space-y-4 mt-8'>
        <input type='hidden' name='post_id' value={params.postId} />
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
};

export default PostDetailPage;
