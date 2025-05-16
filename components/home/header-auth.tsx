"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import NavigationDropDown from "../../ui/NavigationDropDown";
import NotificationDropdown from "../../ui/notification-dropdown-button";
import LoginModal from "../modal/login-modal";

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  return (
    <>
      {user ? (
        <div className='flex items-center gap-8 justify-center'>
          <NotificationDropdown />
          <NavigationDropDown />
        </div>
      ) : (
        <button onClick={() => setIsModalOpen(true)} className='text-blue-500'>
          로그인
        </button>
      )}

      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
