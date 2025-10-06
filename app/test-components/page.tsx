
'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Modal from '@/components/ui/Modal';
import Toast, { ToastContainer } from '@/components/ui/Toast';
import Spinner, { DotsSpinner, PulseSpinner, LoadingOverlay } from '@/components/ui/Spinner';
import Pagination, { SimplePagination } from '@/components/ui/Pagination';
import Tabs, { useTabs } from '@/components/ui/Tabs';
import Accordion, { useAccordion } from '@/components/ui/Accordion';

interface TestToast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
}

export default function TestComponentsPage() {
  // State for various components
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<TestToast[]>([]);
  const [toastCounter, setToastCounter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  // Hooks for tabs and accordion
  const { activeTab, onTabChange } = useTabs('overview');
  const { openItems, onItemToggle } = useAccordion('multiple', ['faq-1']);

  // Toast management
  const addToast = (toast: Omit<TestToast, 'id'>) => {
    const id = `toast-${toastCounter}`;
    setToastCounter(prev => prev + 1);
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Sample data
  const selectOptions = [
    { value: 'cairo', label: 'القاهرة' },
    { value: 'alexandria', label: 'الإسكندرية' },
    { value: 'giza', label: 'الجيزة' },
    { value: 'luxor', label: 'الأقصر' },
  ];

  const tabItems = [
    {
      id: 'overview',
      label: 'نظرة عامة',
      content: (
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-semibold font-tajawal">نظرة عامة على المنصة</h3>
          <p className="text-gray-700 font-tajawal">
            منصة نائباك هي منصة رقمية تهدف إلى ربط المواطنين بممثليهم البرلمانيين وتسهيل التواصل المباشر معهم.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>إحصائيات المنصة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-tajawal">عدد المستخدمين:</span>
                    <Badge variant="primary">1,234</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-tajawal">عدد النواب:</span>
                    <Badge variant="secondary">567</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>آخر التحديثات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 font-tajawal">
                  تم إضافة ميزات جديدة لتحسين تجربة المستخدم وسهولة التنقل.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 'features',
      label: 'الميزات',
      content: (
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-semibold font-tajawal">ميزات المنصة</h3>
          <ul className="space-y-2 text-gray-700 font-tajawal">
            <li>• تواصل مباشر مع النواب</li>
            <li>• متابعة الجلسات البرلمانية</li>
            <li>• إرسال الاستفسارات والمقترحات</li>
            <li>• تلقي التحديثات والإشعارات</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'contact',
      label: 'اتصل بنا',
      content: (
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-semibold font-tajawal">معلومات الاتصال</h3>
          <div className="space-y-2 text-gray-700 font-tajawal">
            <p>البريد الإلكتروني: info@naebak.com</p>
            <p>الهاتف: +20 123 456 789</p>
            <p>العنوان: القاهرة، مصر</p>
          </div>
        </div>
      ),
    },
  ];

  const accordionItems = [
    {
      id: 'faq-1',
      title: 'ما هي منصة نائباك؟',
      content: (
        <p className="font-tajawal">
          منصة نائباك هي منصة رقمية تربط المواطنين بممثليهم البرلمانيين، وتوفر وسيلة سهلة للتواصل والمتابعة.
        </p>
      ),
    },
    {
      id: 'faq-2',
      title: 'كيف يمكنني التسجيل في المنصة؟',
      content: (
        <div className="space-y-2 font-tajawal">
          <p>يمكنك التسجيل بعدة طرق:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>استخدام البريد الإلكتروني</li>
            <li>التسجيل عبر حسابات التواصل الاجتماعي</li>
            <li>استخدام رقم الهاتف المحمول</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'faq-3',
      title: 'هل المنصة مجانية؟',
      content: (
        <p className="font-tajawal">
          نعم، المنصة مجانية بالكامل لجميع المواطنين المصريين.
        </p>
      ),
    },
  ];

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 font-tajawal mb-4">
            اختبار مكونات واجهة المستخدم
          </h1>
          <p className="text-lg text-gray-600 font-tajawal">
            صفحة اختبار شاملة لجميع مكونات واجهة المستخدم في منصة نائباك
          </p>
        </div>

        {/* Buttons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 font-tajawal">الأزرار (Buttons)</h2>
          <Card>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 font-tajawal">أحجام مختلفة</h3>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm">صغير</Button>
                  <Button size="md">متوسط</Button>
                  <Button size="lg">كبير</Button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 font-tajawal">أنواع مختلفة</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">أساسي</Button>
                  <Button variant="secondary">ثانوي</Button>
                  <Button variant="outline">محدد</Button>
                  <Button variant="ghost">شفاف</Button>
                  <Button variant="danger">خطر</Button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 font-tajawal">حالات خاصة</h3>
                <div className="flex flex-wrap gap-3">
                  <Button loading>جاري التحميل</Button>
                  <Button disabled>معطل</Button>
                  <Button onClick={() => setIsModalOpen(true)}>فتح النافذة المنبثقة</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form Elements Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 font-tajawal">عناصر النموذج (Form Elements)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>حقول الإدخال</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="الاسم الكامل"
                  placeholder="أدخل اسمك الكامل"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Input
                  label="البريد الإلكتروني"
                  type="email"
                  placeholder="example@email.com"
                  required
                />
                <Input
                  label="كلمة المرور"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  error="كلمة المرور قصيرة جداً"
                />
                <Input
                  label="حقل معطل"
                  placeholder="هذا الحقل معطل"
                  disabled
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>عناصر أخرى</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  label="الرسالة"
                  placeholder="اكتب رسالتك هنا..."
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  rows={4}
                />
                <Select
                  label="المحافظة"
                  placeholder="اختر محافظتك"
                  options={selectOptions}
                  value={selectValue}
                  onChange={setSelectValue}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards and Badges Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 font-tajawal">البطاقات والشارات (Cards & Badges)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar
                    src="/api/placeholder/40/40"
                    alt="أحمد محمد"
                    size="md"
                  />
                  <div>
                    <CardTitle>أحمد محمد</CardTitle>
                    <p className="text-sm text-gray-600 font-tajawal">نائب برلماني</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-tajawal mb-3">
                  نائب عن دائرة القاهرة الجديدة، متخصص في قضايا التعليم والصحة.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">تعليم</Badge>
                  <Badge variant="secondary">صحة</Badge>
                  <Badge variant="success">نشط</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  عرض الملف الشخصي
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إحصائيات المنصة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-tajawal">المستخدمين النشطين</span>
                    <Badge variant="primary" size="lg">1,234</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-tajawal">الرسائل اليوم</span>
                    <Badge variant="secondary" size="lg">89</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-tajawal">الجلسات المباشرة</span>
                    <Badge variant="success" size="lg">3</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أنواع الشارات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2 font-tajawal">الأحجام:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge size="sm">صغير</Badge>
                      <Badge size="md">متوسط</Badge>
                      <Badge size="lg">كبير</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 font-tajawal">الأنواع:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary">أساسي</Badge>
                      <Badge variant="secondary">ثانوي</Badge>
                      <Badge variant="success">نجاح</Badge>
                      <Badge variant="warning">تحذير</Badge>
                      <Badge variant="error">خطأ</Badge>
                      <Badge variant="info">معلومات</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Avatars Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 font-tajawal">الصور الشخصية (Avatars)</h2>
          <Card>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 font-tajawal">أحجام مختلفة</h3>
                <div className="flex items-center gap-4">
                  <Avatar size="xs" alt="صغير جداً" />
                  <Avatar size="sm" alt="صغير" />
                  <Avatar size="md" alt="متوسط" />
                  <Avatar size="lg" alt="كبير" />
                  <Avatar size="xl" alt="كبير جداً" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 font-tajawal">أنواع مختلفة</h3>
                <div className="flex items-center gap-4">
                  <Avatar
                    src="/api/placeholder/40/40"
                    alt="مع صورة"
                    size="md"
                  />
                  <Avatar
                    alt="أحمد محمد"
                    size="md"
                  />
                  <Avatar
                    alt="فاطمة أحمد"
                    size="md"
                    className="bg-pink-500"
                  />
                  <Avatar
                    alt="محمد علي"
                    size="md"
                    className="bg-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spinners Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 font-tajawal">مؤشرات التحميل (Spinners)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Spinner عادي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-4 py-8">
                  <Spinner size="sm" />
                  <Spinner size="md" variant="secondary" />
                  <Spinner size="lg" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dots Spinner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-4 py-8">
                  <DotsSpinner size="sm" />
                  <DotsSpinner size="md" variant="secondary" />
                  <DotsSpinner size="lg" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pulse Spinner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-4 py-8">
                  <PulseSpinner size="sm" />
                  <PulseSpinner size="md" variant="secondary" />
                  <PulseSpinner size="lg" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loading Overlay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8">
                  <Button onClick={simulateLoading} disabled={isLoading}>
                    {isLoading ? 'جاري التحميل...' : 'تشغيل Loading Overlay (3 ثوان)'}
                  </Button>
                </div>
                <LoadingOverlay isOpen={isLoading} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Toasts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 font-tajawal">الإشعارات (Toasts)</h2>
          <Card>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => addToast({ type: 'success', message: 'تم تنفيذ العملية بنجاح!', title: 'نجاح' })}>
                  نجاح
                </Button>
                <Button onClick={() => addToast({ type: 'error', message: 'حدث خطأ أثناء تنفيذ العملية.', title: 'خطأ' })} variant="danger">
                  خطأ
                </Button>
                <Button onClick={() => addToast({ type: 'warning', message: 'يرجى مراجعة البيانات المدخلة.', title: 'تحذير' })} variant="secondary">
                  تحذير
                </Button>
                <Button onClick={() => addToast({ type: 'info', message: 'هذه رسالة معلومات عامة.', title: 'معلومات' })} variant="outline">
                  معلومات
                </Button>
              </div>
            </CardContent>
          </Card>
          <ToastContainer toasts={toasts} onRemove={removeToast} />
        </section>

        {/* Pagination Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 font-tajawal">التنقل بين الصفحات (Pagination)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pagination عادي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={15}
                    onPageChange={setCurrentPage}
                  />
                </div>
                <p className="text-center text-sm text-gray-600 font-tajawal">
                  الصفحة الحالية: {currentPage}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Simple Pagination</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-8">
                  <SimplePagination
                    currentPage={currentPage}
                    totalPages={15}
                    onPageChange={setCurrentPage}
                  />
                </div>
                <p className="text-center text-sm text-gray-600 font-tajawal">
                  صفحة {currentPage} من 15
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 font-tajawal">التبويبات (Tabs)</h2>
          <Card>
            <CardContent>
              <Tabs tabs={tabItems} activeTab={activeTab} onTabChange={onTabChange} />
            </CardContent>
          </Card>
        </section>

        {/* Accordion Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 font-tajawal">الأكورديون (Accordion)</h2>
          <Card>
            <CardContent>
              <Accordion items={accordionItems} openItems={openItems} onItemToggle={onItemToggle} />
            </CardContent>
          </Card>
        </section>

        {/* Modal Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 font-tajawal">النافذة المنبثقة (Modal)</h2>
          <Card>
            <CardContent>
              <div className="flex justify-center py-8">
                <Button onClick={() => setIsModalOpen(true)}>فتح النافذة المنبثقة</Button>
              </div>
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="عنوان النافذة المنبثقة"
                description="هذا هو وصف تفصيلي للنافذة المنبثقة. يمكنك وضع أي محتوى هنا."
              >
                <div className="p-4 text-gray-700 font-tajawal">
                  <p className="mb-4">محتوى إضافي داخل النافذة المنبثقة.</p>
                  <Input label="اسم المستخدم" placeholder="أدخل اسمك" className="mb-4" />
                  <Button onClick={() => setIsModalOpen(false)} className="w-full">إغلاق</Button>
                </div>
              </Modal>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
}

