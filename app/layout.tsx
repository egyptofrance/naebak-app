import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "منصة نائبك - تواصل مع نوابك ومرشحيك",
  description: "منصة نائبك هي منصة إلكترونية تربط المواطنين بنوابهم ومرشحيهم في مجلسي النواب والشيوخ",
  keywords: "نائبك، مجلس النواب، مجلس الشيوخ، مصر، نواب، مرشحين، شكاوى، تواصل",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
