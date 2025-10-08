import EnhancedRegisterForm from '@/components/auth/EnhancedRegisterForm';

export const metadata = {
  title: 'إنشاء حساب جديد - نائبك.com',
  description: 'إنشاء حساب جديد على نائبك.com',
};

export default function RegisterPage() {
  return (
    <main className="flex-grow">
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <EnhancedRegisterForm />
      </div>
    </main>
  );
}
