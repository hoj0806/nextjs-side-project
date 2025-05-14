import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import NavigationDropDown from "../../ui/NavigationDropDown";
import NotificationDropdown from "../../ui/notification-dropdown-button";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className='flex items-center gap-8 justify-center'>
      <NotificationDropdown />
      <NavigationDropDown />
    </div>
  ) : (
    <Link href={"/login"}>로그인</Link>
  );
}
