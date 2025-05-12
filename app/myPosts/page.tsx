import { getMyPosts } from "../actions";
import MyPostGrid from "@/components/myPosts/MyPostGrid";

const MyPostsPage = async () => {
  const myPosts = await getMyPosts();

  return (
    <main className='max-w-7xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>내 게시물</h1>
      {myPosts.length === 0 ? (
        <p className='text-gray-500'>아직 작성한 게시물이 없습니다.</p>
      ) : (
        <MyPostGrid posts={myPosts} />
      )}
    </main>
  );
};

export default MyPostsPage;
