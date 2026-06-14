import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WorkHub — Job Portal",
  description: "Browse open roles and apply in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3.5">
            <span className="flex items-center gap-2 text-lg font-bold tracking-tight">
              <span aria-hidden>💼</span> WorkHub
            </span>
            <nav className="text-sm text-neutral-500 dark:text-neutral-400">
              Jobs
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-neutral-200 py-6 text-center text-sm text-neutral-400 dark:border-neutral-800">
          WorkHub · Demo job portal with mock data
        </footer>
      </body>
    </html>
  );
}
