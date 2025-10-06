import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'تسجيل الدخول - نائبك.com',
  description: 'تسجيل الدخول إلى حسابك على نائبك.com',
};

export default function LoginPage() {
  return (
    <main className="flex-grow">
      <LoginForm />
    </main>
  );
}
