import PostGrid from "@/components/study/post-grid";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    category?: string;
    mode?: string;
    position?: string;
    search?: string;
  };
}) {
  return <PostGrid searchParams={searchParams} />;
}
