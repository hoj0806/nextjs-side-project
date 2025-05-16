"use client";

import { useState, useEffect, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  getMyCommentNotifications,
  deleteCommentNotificationById,
} from "@/app/actions/notification.actions";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    const data = await getMyCommentNotifications();
    setNotifications(data);
    setUnreadCount(data.length);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // 바깥 클릭 감지해서 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // 알림 삭제
  const handleDelete = (id: string) => {
    startTransition(async () => {
      await deleteCommentNotificationById(id);
      await fetchNotifications();
    });
  };

  // 클릭 시 알람 삭제 후 이동
  const handleClickAndDelete = async (id: string, postId: string) => {
    await deleteCommentNotificationById(id);
    router.push(`/study/${postId}`);
  };

  return (
    <div className='relative inline-block' ref={dropdownRef}>
      {/* 알람 버튼 */}
      <button onClick={() => setOpen((prev) => !prev)} className='relative'>
        <img src='/icons/notification.svg' />
        {unreadCount > 0 && (
          <span className='absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full'>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* 드롭다운 */}
      {open && (
        <div className='absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded shadow-lg max-h-72 overflow-y-auto z-50 p-4'>
          {notifications.length === 0 ? (
            <div className='text-sm text-gray-500 text-center'>
              알람이 없습니다.
            </div>
          ) : (
            <ul className='space-y-3'>
              {notifications.map((n) => (
                <li key={n.id} className='relative'>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className='absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xs'
                    title='알림 삭제'
                  >
                    ✕
                  </button>
                  <button
                    onClick={() => handleClickAndDelete(n.id, n.post_id)}
                    className='w-full text-left p-3 bg-gray-50 hover:bg-purple-50 rounded border border-gray-200 transition pr-6'
                  >
                    <p className='text-sm font-semibold text-purple-700'>
                      새로운 댓글이 달렸어요!
                    </p>
                    <p className='text-sm text-gray-700 truncate'>
                      {n.author_nickname}이 댓글을 남겼어요: {n.comment}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
