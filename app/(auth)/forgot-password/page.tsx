import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata = {
  title: 'نسيت كلمة المرور - نائبك.com',
  description: 'إعادة تعيين كلمة المرور لحسابك على نائبك.com',
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex-grow">
      <ForgotPasswordForm />
    </main>
  );
}
