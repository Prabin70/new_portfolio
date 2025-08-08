import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prabin Shrestha- Full-Stack Developer & DevOps Engineer",
  description:
    "Passionate full-stack developer with expertise in MERN stack, DevOps practices, and modern web technologies. Building scalable solutions and efficient development workflows.",
  keywords:
    "full-stack developer, DevOps engineer, React, Node.js, MongoDB, AWS, Docker, GitHub Actions, web development, San Francisco",
  authors: [{ name: "Alex Chen" }],
  creator: "Alex Chen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alexchen.dev",
    title: "Prabin Shrestha- Full-Stack Developer & DevOps Engineer",
    description:
      "Passionate full-stack developer with expertise in MERN stack, DevOps practices, and modern web technologies.",
    siteName: "Prabin ShresthaPortfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabin Shrestha- Full-Stack Developer & DevOps Engineer",
    description:
      "Passionate full-stack developer with expertise in MERN stack, DevOps practices, and modern web technologies.",
    creator: "@alexchen_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}