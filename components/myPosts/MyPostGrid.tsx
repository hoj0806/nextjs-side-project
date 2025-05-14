"use client";

import PostItem from "../../ui/home/post-item";

type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  recruitment_count: number;
  deadline: string;
  expired: boolean;
  positions: string[];
  tech_stack: string[];
};

type PostGridProps = {
  posts: Post[];
};

export default function MyPostGrid({ posts }: PostGridProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
    </div>
  );
}
