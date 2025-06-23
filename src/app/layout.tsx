import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navbar";
import { Limelight } from 'next/font/google'

 const limelight = Limelight({
  subsets: ['latin'],
  weight: ['400'], 
})


export const metadata: Metadata = {
  title: "Lot No. 6 - Tulsa's #1 Art and Karaoke Bar",
  description: "Tulsaa's favorite art & karaoke bar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={limelight.className}>
      <NavBar />
        {children}
      </body>
    </html>
  );
}
