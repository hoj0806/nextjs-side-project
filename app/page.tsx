import PostGrid from "@/components/study/post-grid";

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  return <PostGrid searchParams={searchParams} />;
}
