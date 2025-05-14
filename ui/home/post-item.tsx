"use client";

import Link from "next/link";
import { likePost, unlikePost } from "@/app/actions/like-actions";
import ExpiredLayer from "./expired-layer";
import CategoryBadge from "./category-badge";
import PositionBox from "./position-box";
import StackBox from "./stack-box";
import NewPostBadge from "./new-post-badge";
import DeadlineBadge from "./deadline-badge";
import PostInfo from "./post-info";

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
    <Link
      href={`/study/${post.id}`}
      className='hover:scale-105 bg-white border-2 border-gray-300 shadow-sm rounded-3xl p-4 space-y-2 relative w-[300px] h-[340px] pl-[25px] pt-[20px] pr-[25px]'
    >
      {post.expired && <ExpiredLayer />}
      <div className='relative z-20'>
        <div className='flex gap-2 mb-4'>
          <CategoryBadge category={post.category} />
          {isNewPost && <NewPostBadge />}
          {!post.expired && !isNewPost && isDeadlineSoon && <DeadlineBadge />}
        </div>

        <div className='text-md text-gray-400 font-semibold'>
          마감일 | {post.deadline.split("-").join(".")}
        </div>
        <h2
          className='text-lg font-semibold text-black overflow-hidden text-ellipsis break-words mb-3'
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {post.title}
        </h2>
        <PositionBox positions={post.positions} />
        <StackBox stacks={post.tech_stack} />
        <PostInfo view={post.view} commentCount={post.commentCount} />
      </div>

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
    </Link>
  );
}
