import Link from "next/link";
import { getPosts, getMyLikes, likePost, unlikePost } from "../../app/actions";
import CategoryFilter from "../ui/categoryFilter";
import DropdownFilter from "../ui/dropdown-filter";
import SearchInput from "../ui/search-input";
import Pagination from "../ui/pagination";
import ShowAllToggleButton from "../ui/showAll-toggle-button";
import MultiSelectDropdownFilter from "../ui/multi-select-dropdown-filter";
import { techStacks } from "@/lib/techStack";

export default async function PostGrid({
  searchParams,
}: {
  searchParams: {
    category?: string;
    mode?: string;
    position?: string;
    search?: string;
    page?: string;
    showAll?: string;
    tech_stack?: string;
  };
}) {
  const pageSize = 2;
  const page = parseInt(searchParams.page || "1", 10);
  const techStackArray = searchParams.tech_stack
    ? searchParams.tech_stack.split(",")
    : [];

  const [posts, likes] = await Promise.all([
    getPosts(
      searchParams.category,
      searchParams.mode,
      searchParams.position,
      searchParams.search,
      techStackArray,
      page,
      pageSize,
      searchParams.showAll // 추가가
    ),
    getMyLikes(),
  ]);
  console.log(searchParams.tech_stack);
  const likedPostIds = new Set(likes.map((like) => like.post_id));
  return (
    <main className='max-w-7xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>모집 게시판</h1>
      <Pagination total={posts.total} pageSize={pageSize} />
      <CategoryFilter />
      <div className='flex gap-4'>
        <MultiSelectDropdownFilter
          paramsName='tech_stack'
          labelName='카테고리 선택'
          data={techStacks}
        />
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
        <ShowAllToggleButton />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {posts.data.map((post) => {
          const isLiked = likedPostIds.has(post.id);

          return (
            <div
              key={post.id}
              className='bg-white border border-gray-200 shadow-sm rounded-xl p-4 space-y-2 relative'
            >
              {post.expired && (
                <div className='absolute inset-0 bg-black opacity-50 flex items-center justify-center z-10'>
                  <span className='text-white text-xl font-bold'>
                    모집 마감
                  </span>
                </div>
              )}

              <Link href={`/study/${post.id}`}>
                <div className='relative z-20'>
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
            </div>
          );
        })}
      </div>
    </main>
  );
}
