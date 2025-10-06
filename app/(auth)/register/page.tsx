import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'إنشاء حساب جديد - نائبك.com',
  description: 'إنشاء حساب جديد على نائبك.com',
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
}
