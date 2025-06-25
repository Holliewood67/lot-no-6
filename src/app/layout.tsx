import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navbar";
import { Limelight } from 'next/font/google'

 const limelight = Limelight({
  subsets: ['latin'],
  weight: ['400'], 
})


export const metadata = {
  title: "Lot No. 6 - Tulsa's #1 Art & Karaoke Bar",
  description: "Tulsa’s hub for art, karaoke, and live music—Lot No. 6 is a cozy, creative bar in the Pearl District where open mics, monthly art shows, and community vibes come together every week.",
  siteName: 'Lot No. 6',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: "Lot No. 6 - Tulsa's #1 Art & Karaoke Bar",
    description: "Tulsa’s hub for art, karaoke, and live music—Lot No. 6 is a cozy, creative bar in the Pearl District where open mics, monthly art shows, and community vibes come together every week.",
  
    images: [
      {
        url: "https://master.d2p7nbas23b057.amplifyapp.com/lot-6.jpg", // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ]
  },
}

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
