import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export const metadata = {
  title: 'إعادة تعيين كلمة المرور - نائبك.com',
  description: 'إعادة تعيين كلمة المرور لحسابك على نائبك.com',
};

export default function ResetPasswordPage() {
  return (
    <main className="flex-grow">
      <ResetPasswordForm />
    </main>
  );
}
