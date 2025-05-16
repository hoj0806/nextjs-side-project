"use client";
import MDEditor from "@uiw/react-md-editor";
import remarkGfm from "remark-gfm";
const PostContent = ({ content }: { content: string }) => {
  return (
    <div className='flex'>
      <MDEditor.Markdown
        source={content}
        remarkPlugins={[remarkGfm]}
        className='whitespace-pre-wrap'
      />
    </div>
  );
};

export default PostContent;
