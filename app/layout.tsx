import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getNewsItems, getNewsSettings } from "@/lib/news";
import LayoutWrapperSuspense from "@/components/layout/LayoutWrapperSuspense"; // Suspense wrapper for client component
import LoadingLayout from "@/components/layout/LoadingLayout";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["arabic"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "منصة نائبك - تواصل مع نوابك ومرشحيك",
  description: "منصة نائبك هي منصة إلكترونية تربط المواطنين بنوابهم ومرشحيهم في مجلسي النواب والشيوخ",
  keywords: "نائبك، مجلس النواب، مجلس الشيوخ، مصر، نواب، مرشحين، شكاوى، تواصل",
  icons: {
    icon: [
      { url: "https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/favicon.ico" },
    ],
    apple: [
      { url: "https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use default values for now to avoid server-side errors
  const newsItems: any[] = [];
  const direction = "rtl";
  const speedSeconds = 30;

  return (
    <html lang="ar" dir={direction}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tajawal.className} antialiased`}
      >
        <LoadingLayout
          header={<Header />}
          footer={<Footer />}
          minLoadingTime={800}
        >
          <LayoutWrapperSuspense
            newsItems={newsItems}
            newsDirection={direction as "ltr" | "rtl"}
            newsSpeedSeconds={speedSeconds}
          >
            {children}
          </LayoutWrapperSuspense>
        </LoadingLayout>
      </body>
    </html>
  );
}

