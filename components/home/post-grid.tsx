"use client";

import PostItem from "../ui/home/post-item";

type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  recruitment_count: number;
  deadline: string;
  expired: boolean;
  positions: string[];
  created_at: string;
  tech_stack: string[];
  view: number;
  commentCount: number;
};

type PostGridProps = {
  posts: Post[];
  likedPostIds: Set<number>;
};

export default function PostGrid({ posts, likedPostIds }: PostGridProps) {
  console.log(posts);
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {posts.map((post) => {
        const isLiked = likedPostIds.has(post.id);
        return <PostItem key={post.id} post={post} isLiked={isLiked} />;
      })}
    </div>
  );
}
