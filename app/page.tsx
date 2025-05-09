import PostGrid from "@/components/study/post-grid";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    mode?: string;
    position?: string;
    search?: string;
    page?: string;
    expired?: string;
    showAll?: string;
  }>;
}) {
  // searchParams를 비동기적으로 처리하여 params에 할당
  const params = await searchParams;

  return <PostGrid searchParams={params} />;
}
