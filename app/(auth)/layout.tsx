import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "../globals.css";

const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["arabic"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "تسجيل الدخول - نائبك.com",
  description: "تسجيل الدخول إلى منصة نائبك",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
