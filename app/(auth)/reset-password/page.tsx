import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export const metadata = {
  title: 'إعادة تعيين كلمة المرور - نائبك.com',
  description: 'إعادة تعيين كلمة المرور لحسابك على نائبك.com',
};

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ResetPasswordForm />
      </main>
      <Footer />
    </div>
  );
}
