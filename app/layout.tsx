import "./globals.css";
import Navigation from "@/components/home/Navigation";

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
            <Navigation />
            <div className='p-5'>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
