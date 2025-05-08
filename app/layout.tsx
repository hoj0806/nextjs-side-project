import HeaderAuth from "@/components/header-auth";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <main className='min-h-screen flex flex-col items-center'>
          <nav className='w-full flex justify-center border-b h-16'>
            <div className='w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm'>
              <div className='flex gap-5 items-center font-semibold'>
                <Link href='/'>Home</Link>
                <Link href='/register'>팀원 모집하기</Link>
              </div>
              <HeaderAuth />
            </div>
          </nav>

          <div className='flex flex-col gap-20 max-w-5xl p-5'>{children}</div>

          <footer className='w-full flex items-center justify-center border-t text-xs py-16'>
            <p>Holla</p>
          </footer>
        </main>
      </body>
    </html>
  );
}
