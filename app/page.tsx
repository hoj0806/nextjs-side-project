import { createClient } from "@/utils/supabase/server";
import { getAllPosts, signOutAction } from "./actions";

export default async function Home() {
  const supabase = await createClient();

  const session = await supabase.auth.getUser();

  const data = await getAllPosts();
  console.log(data, session);
  // if (error || !data?.user) {
  //   redirect("/login");
  // }

  return (
    <>
      MainPage
      <form>
        <button formAction={signOutAction}>로그아웃</button>
      </form>
    </>
  );
}
