import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: "IA Humanizer",
  description: "Humanize your IA with a simple and easy to use tool.",
};

const inter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
