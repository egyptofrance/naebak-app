import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'تسجيل الدخول - نائبك.com',
  description: 'تسجيل الدخول إلى حسابك على نائبك.com',
};

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
