import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'غير مصرح - نائبك.com',
  description: 'ليس لديك صلاحية للوصول إلى هذه الصفحة',
};

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <div className="mb-8">
            <svg
              className="mx-auto h-24 w-24 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">غير مصرح</h1>
          <p className="text-xl text-gray-600 mb-8">
            عذراً، ليس لديك صلاحية للوصول إلى هذه الصفحة
          </p>
          <div className="space-x-4 space-x-reverse">
            <Link
              href="/dashboard"
              className="inline-block bg-[#004705] text-white px-6 py-3 rounded-lg hover:bg-[#003604] transition-colors font-medium"
            >
              العودة إلى لوحة التحكم
            </Link>
            <Link
              href="/"
              className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              العودة إلى الرئيسية
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
