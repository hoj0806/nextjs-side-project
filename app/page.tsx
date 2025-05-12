import Main from "@/components/home/main";

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
    tech_stack?: string;
  }>;
}) {
  const params = await searchParams;

  return <Main searchParams={params} />;
}
