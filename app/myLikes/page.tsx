import { getMyReadData } from "../actions/post-actions";
import { getMyLikes } from "../actions/like-actions";
import PostGrid from "@/components/home/post-grid";
import MyPostGrid from "@/components/myPosts/MyPostGrid";
import Link from "next/link";
import { getMyLikesPosts, getMyReadPosts } from "../actions/post-actions";
type Props = {
  searchParams: {
    tab?: string;
  };
};

export default async function MyPage({ searchParams }: Props) {
  const tab = searchParams.tab ?? "likes";

  const likes = await getMyLikes();
  const likedPostIds = likes.map((like) => like.post_id);
  const likedPosts =
    likedPostIds.length > 0 ? await getMyLikesPosts(likedPostIds) : [];

  const readPostData = await getMyReadData();
  const readIds = readPostData.map((read) => read.post_id);
  const readedPosts = readIds.length > 0 ? await getMyReadPosts(readIds) : [];

  const isLikesTab = tab === "likes";
  const isReadTab = tab === "read";

  return (
    <main className='max-w-7xl mx-auto p-6'>
      <div className='flex space-x-4 mb-6 gap-3'>
        <Link
          href='?tab=read'
          className={`text-2xl font-bold  ${
            isReadTab ? "text-black" : "text-gray-400"
          }`}
        >
          읽은 목록
        </Link>
        <Link
          href='?tab=likes'
          className={`text-2xl font-bold  ${
            isLikesTab ? "text-black" : "text-gray-400"
          }`}
        >
          관심 목록
        </Link>
      </div>
      {isLikesTab && likedPosts.length === 0 && (
        <p className='text-gray-500'>아직 찜한 게시물이 없습니다.</p>
      )}

      {isReadTab && readedPosts.length === 0 && (
        <p className='text-gray-500'>아직 읽은 게시물이 없습니다.</p>
      )}

      {isLikesTab && likedPosts.length > 0 && (
        <PostGrid
          posts={likedPosts}
          likedPostIds={new Set(likedPosts.map((post) => post.id))}
        />
      )}

      {isReadTab && readedPosts.length > 0 && (
        <MyPostGrid posts={readedPosts} />
      )}
    </main>
  );
}
