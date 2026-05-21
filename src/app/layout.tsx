import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ali-chnitifa.vercel.app"),
  title: "Ali Chnitifa | Full-Stack Developer (React & Laravel)",
  description:
    "Portfolio of Ali Chnitifa — Full-Stack Developer specializing in React, Laravel, MySQL, and REST APIs. Building scalable, high-performance web solutions.",
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Laravel Developer",
    "MySQL",
    "REST API",
    "Full Stack Developer Morocco",
    "Portfolio",
    "Web Developer",
    "Next.js Developer",
    "Frontend Developer",
  ],
  openGraph: {
    title: "Ali Chnitifa | Full-Stack Developer",
    description:
      "Building scalable, high-performance web solutions with React & Laravel. Explore my projects, skills, and experience.",
    url: "https://ali-chnitifa.vercel.app",
    siteName: "Ali Chnitifa Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Ali Chnitifa — Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Chnitifa | Full-Stack Developer",
    description:
      "Building scalable, high-performance web solutions with React & Laravel.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
