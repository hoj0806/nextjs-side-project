import Link from "next/link";
import { getMyLikes, getMyLikesPosts, getPosts, unlikePost } from "../actions";

const MyLikesPage = async () => {
  const likes = await getMyLikes();
  console.log(likes);
  const postIds = likes.map((like) => like.post_id);
  const likedPosts = postIds.length > 0 ? await getMyLikesPosts(postIds) : [];
  return (
    <main className='max-w-7xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>내 관심 게시물</h1>

      {likedPosts.length === 0 ? (
        <p className='text-gray-500'>아직 찜한 게시물이 없습니다.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {likedPosts.map((post) => (
            <div
              key={post.id}
              className='bg-white border border-gray-200 shadow-sm rounded-xl p-4 space-y-2 relative'
            >
              <Link href={`/study/${post.id}`}>
                <div>
                  <div className='text-sm text-gray-500'>{post.category}</div>
                  <h2 className='text-lg font-semibold truncate text-black'>
                    {post.title}
                  </h2>
                  <div className='text-sm text-gray-700 line-clamp-2'>
                    {post.content}
                  </div>
                  <div className='text-xs text-gray-400'>
                    모집 인원: {post.recruitment_count}
                  </div>
                  <div className='text-xs text-gray-400'>
                    마감일: {post.deadline}
                  </div>
                </div>
              </Link>

              {/* 💜 찜 취소 버튼 */}
              <form action={unlikePost} className='absolute top-2 right-2'>
                <input type='hidden' name='post_id' value={post.id} />
                <button
                  type='submit'
                  className='text-sm px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200'
                >
                  찜 취소
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MyLikesPage;
