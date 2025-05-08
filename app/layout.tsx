import HeaderAuth from "@/components/header-auth";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>
        <main className='min-h-screen flex flex-col items-center'>
          <div className='w-full max-w-screen-xl'>
            <nav className='w-full flex justify-center border-b h-16'>
              <div className='w-full flex justify-between items-center p-3 px-5 text-sm'>
                <div className='flex gap-5 items-center font-semibold'>
                  <Link href='/'>Home</Link>
                  <Link href='/register'>팀원 모집하기</Link>
                </div>
                <HeaderAuth />
              </div>
            </nav>
            <div className='p-5'>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
