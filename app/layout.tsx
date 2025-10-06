import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Tajawal } from "next/font/google";
import "./globals.css";
import NewsBar from "@/components/layout/NewsBar";
import { getNewsItems, getNewsSettings } from "@/lib/news";

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
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const newsItems = await getNewsItems();
  const newsSettings = await getNewsSettings();

  const direction = newsSettings?.direction || "rtl"; // Default to rtl if not set
  const speedSeconds = newsSettings?.speed_seconds || 30; // Default speed

  return (
    <html lang="ar" dir={direction}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tajawal.className} antialiased`}
      >
        {newsItems.length > 0 && (
          <NewsBar
            newsItems={newsItems}
            direction={direction as "ltr" | "rtl"}
            speedSeconds={speedSeconds}
          />
        )}
        {children}
      </body>
    </html>
  );
}

