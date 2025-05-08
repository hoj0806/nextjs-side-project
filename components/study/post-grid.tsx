import Link from "next/link";
import { getPosts, getMyLikes, likePost, unlikePost } from "../../app/actions";
import CategoryFilter from "../ui/categoryFilter";
import DropdownFilter from "../ui/dropdown-filter";
import SearchInput from "../ui/search-input";
import Pagination from "../ui/pagination";

export default async function PostGrid({
  searchParams,
}: {
  searchParams: {
    category?: string;
    mode?: string;
    position?: string;
    search?: string;
    page?: string;
  };
}) {
  const pageSize = 1;
  const page = parseInt(searchParams.page || "1", 10);

  const [posts, likes] = await Promise.all([
    getPosts(
      searchParams.category,
      searchParams.mode,
      searchParams.position,
      searchParams.search,
      page,
      pageSize
    ),
    getMyLikes(),
  ]);
  const likedPostIds = new Set(likes.map((like) => like.post_id));

  console.log(posts.total);

  return (
    <main className='max-w-7xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>모집 게시판</h1>
      <Pagination total={posts.total} pageSize={pageSize} />
      <CategoryFilter />
      <div className='flex gap-4'>
        <DropdownFilter
          paramsName='mode'
          data={["전체", "온라인", "오프라인", "온/오프라인"]}
          labelName='진행 방식'
        />
        <DropdownFilter
          paramsName='position'
          data={["전체", "프론트엔드", "백엔드", "디자이너"]}
          labelName='포지션'
        />
        <SearchInput />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {posts.data.map((post) => {
          const isLiked = likedPostIds.has(post.id);

          return (
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

              {/* 💜 찜 버튼 */}
              <form
                action={isLiked ? unlikePost : likePost}
                className='absolute top-2 right-2'
              >
                <input type='hidden' name='post_id' value={post.id} />
                <button
                  type='submit'
                  className={`text-sm px-2 py-1 rounded ${
                    isLiked
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                  }`}
                >
                  {isLiked ? "찜 취소" : "찜하기"}
                </button>
              </form>

              <></>
            </div>
          );
        })}
      </div>
    </main>
  );
}
