import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test Personal | Zalde",
  description: "Temukan minat & bakat terpendam Anda dengan kuis kecerdasan majemuk interaktif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className="h-full antialiased font-sans"
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
