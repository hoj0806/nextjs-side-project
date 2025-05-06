import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOutAction } from "./actions";

export default async function Home() {
  const supabase = await createClient();

  const session = await supabase.auth.getUser();

  console.log(session);
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
