import { getPosts } from "./actions";

export default async function Home() {
  const data = await getPosts();

  return (
    <main className='max-w-7xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>모집 게시판</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {data.map((post) => (
          <div
            key={post.id}
            className='bg-white border border-gray-200 shadow-sm rounded-xl p-4 space-y-2'
          >
            <div className='text-sm text-gray-500'>{post.category}</div>
            <h2 className='text-lg font-semibold truncate'>{post.title}</h2>
            <div className='text-sm text-gray-700 line-clamp-2'>
              {post.content}
            </div>
            <div className='text-xs text-gray-400'>
              모집 인원: {post.recruitment_count}
            </div>
            <div className='text-xs text-gray-400'>마감일: {post.deadline}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
