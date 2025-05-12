import { getPosts, getMyLikes } from "../../app/actions";
import CategoryFilter from "../ui/home/categoryFilter";
import Pagination from "../ui/pagination";
import SearchFilterBar from "./search-filter-bar";
import PostGrid from "./post-grid";

export default async function Main({
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
      searchParams.showAll
    ),
    getMyLikes(),
  ]);

  const likedPostIds = new Set(likes.map((like) => like.post_id));
  return (
    <main className='max-w-7xl mx-auto'>
      <CategoryFilter />
      <SearchFilterBar />
      <PostGrid posts={posts.data} likedPostIds={likedPostIds} />
      <Pagination total={posts.total} pageSize={pageSize} />
    </main>
  );
}
