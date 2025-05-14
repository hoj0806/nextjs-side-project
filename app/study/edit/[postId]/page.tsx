"use server";

import { getPostById } from "@/app/actions/post-actions";
import { updatePost } from "@/app/actions/post-actions";
import PostForm from "@/components/register/post-form";

type PostEditPageProps = {
  params: Promise<{
    postId: string;
  }>;
};

const PostEditPage = async ({ params }: PostEditPageProps) => {
  const { postId } = await params;

  const post = await getPostById(postId);

  const defaultValues = {
    category: post.category,
    recruitment_count: post.recruitment_count,
    mode: post.mode,
    duration: post.duration,
    tech_stack: post.tech_stack,
    deadline: post.deadline,
    positions: post.positions,
    contact_method: post.contact_method,
    contact_link: post.contact_link,
    title: post.title,
    content: post.content,
    postId: post.id,
  };

  return <PostForm action={updatePost} defaultValues={defaultValues} />;
};

export default PostEditPage;
