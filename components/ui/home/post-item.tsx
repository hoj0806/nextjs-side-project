// components/ui/home/PostItem.tsx
"use client";

import Link from "next/link";
import { likePost, unlikePost } from "@/app/actions";
import ExpiredLayer from "./expired-layer";
import CategoryBadge from "./category-badge";
import PositionBox from "./position-box";
import StackBox from "./stack-box";
import NewPostBadge from "./new-post-badge";
import DeadlineBadge from "./deadline-badge";

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
};

type PostItemProps = {
  post: Post;
  isLiked?: boolean;
};

export default function PostItem({ post, isLiked }: PostItemProps) {
  const now = new Date();
  const isNewPost =
    new Date().getTime() - new Date(post.created_at).getTime() <
    24 * 60 * 60 * 1000;
  const deadlineDate = new Date(post.deadline + "T23:59:59");
  const isDeadlineSoon =
    deadlineDate.getTime() - now.getTime() < 3 * 24 * 60 * 60 * 1000;
  return (
    <div className='bg-white border border-gray-400 shadow-sm rounded-3xl p-4 space-y-2 relative h-[300px]'>
      {post.expired && <ExpiredLayer />}
      <Link href={`/study/${post.id}`}>
        <div className='relative z-20'>
          <CategoryBadge category={post.category} />
          {isNewPost && <NewPostBadge />}
          {!post.expired && !isNewPost && isDeadlineSoon && <DeadlineBadge />}

          <div className='text-xs text-gray-400'>
            마감일 | {post.deadline.split("-").join(".")}
          </div>
          <h2 className='text-lg font-semibold truncate text-black'>
            {post.title}
          </h2>
          <PositionBox positions={post.positions} />
          <StackBox stacks={post.tech_stack} />
        </div>
      </Link>

      {isLiked !== undefined && (
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
      )}
    </div>
  );
}
