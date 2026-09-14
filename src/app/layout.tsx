import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "hot path archive",
    template: "%s · hot path archive",
  },
  description: "그때 가장 많이 시간을 쓴 관심사를 파고든 기록",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${geistMono.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <header className="border-b border-edge">
          <nav className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 text-sm">
            <Link href="/" className="font-bold tracking-tight">
              hot path archive
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12">{children}</main>
        <footer className="border-t border-edge">
          <p className="mx-auto max-w-3xl px-5 py-6 font-mono text-xs text-faint">© hyunjinb394</p>
        </footer>
      </body>
    </html>
  );
}
