import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import NavigationDropDown from "./ui/NavigationDropDown";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className='flex items-center gap-4'>
      <NavigationDropDown />
    </div>
  ) : (
    <Link href={"/login"}>로그인</Link>
  );
}
