import {
  getCommentsByPostId,
  getPostById,
  insertComment,
  deleteComment,
} from "@/app/actions";
import CommentDeleteButton from "@/components/CommentDeleteButton";

type PostDetailPageProps = {
  params: {
    postId: string;
  };
};

const PostDetailPage = async ({ params }: PostDetailPageProps) => {
  const post = await getPostById(params.postId);
  const comments = await getCommentsByPostId(params.postId);

  if (!post) {
    return (
      <div className='text-center mt-10 text-red-600'>
        ❌ 게시글을 찾을 수 없습니다.
      </div>
    );
  }

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

      {/* 💬 댓글 목록 */}
      <div className='mt-6 space-y-4'>
        <h2 className='text-lg font-semibold'>댓글 {comments.length}개</h2>
        {comments.length === 0 ? (
          <p className='text-gray-500'>아직 댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className='p-4 border rounded bg-gray-50 text-sm'
            >
              <div className='text-gray-800 whitespace-pre-wrap'>
                {comment.content}
              </div>
              <div className='text-gray-500 text-xs mt-2'>
                작성자: {comment.email ?? "알 수 없음"} ·{" "}
                {new Date(comment.created_at).toLocaleString()}
              </div>
              {/* 댓글 삭제 버튼 추가 */}
              <div className='mt-2'>
                <CommentDeleteButton commentId={comment.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
