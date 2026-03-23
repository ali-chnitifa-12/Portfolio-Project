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
  title: "Ali Chnitifa | Junior Full-Stack Developer (React & Laravel)",
  description:
    "Portfolio of Ali Chnitifa — Junior Full-Stack Developer specializing in React, Laravel, MySQL, and REST APIs. Open to Junior Developer roles and freelance opportunities.",
  keywords: [
    "Junior Full-Stack Developer",
    "React Developer",
    "Laravel Developer",
    "MySQL",
    "REST API",
    "Full Stack Developer Morocco",
    "Portfolio",
    "Web Developer",
  ],
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
