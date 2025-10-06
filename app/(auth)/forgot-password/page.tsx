import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata = {
  title: 'نسيت كلمة المرور - نائبك.com',
  description: 'إعادة تعيين كلمة المرور لحسابك على نائبك.com',
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ForgotPasswordForm />
      </main>
      <Footer />
    </div>
  );
}
