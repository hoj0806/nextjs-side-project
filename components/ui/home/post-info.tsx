const PostInfo = ({
  view,
  commentCount,
}: {
  view: number;
  commentCount: number;
}) => {
  return (
    <div>
      <span>조회 수 : {view}</span>
      <span>댓글 수 : {commentCount}</span>
    </div>
  );
};

export default PostInfo;
