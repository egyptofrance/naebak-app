import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'إنشاء حساب جديد - نائبك.com',
  description: 'إنشاء حساب جديد على نائبك.com',
};

export default function RegisterPage() {
  return (
    <main className="flex-grow">
      <RegisterForm />
    </main>
  );
}
