import Banner from '@/components/layout/Banner';

export default function TestBannerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          اختبار مكون البانر
        </h1>
        
        <div className="space-y-8">
          {/* Landing Banner Test */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              بانر الصفحة الرئيسية (Landing)
            </h2>
            <Banner pageType="landing" governorateId={null} />
          </div>

          {/* Candidates Banner Test */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              بانر صفحة المرشحين (Candidates)
            </h2>
            <Banner pageType="candidates" governorateId={null} />
          </div>

          {/* MPs Banner Test */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              بانر صفحة النواب (MPs)
            </h2>
            <Banner pageType="mps" governorateId={null} />
          </div>

          {/* Complaints Banner Test */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              بانر صفحة الشكاوى (Complaints)
            </h2>
            <Banner pageType="complaints" governorateId={null} />
          </div>

          {/* Governorate-specific Banner Test */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              بانر خاص بمحافظة (Governorate-specific)
            </h2>
            <Banner pageType="landing" governorateId="cairo" />
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            ملاحظات الاختبار
          </h3>
          <ul className="text-blue-700 space-y-1">
            <li>• جميع البانرات تعرض حالة الخطأ لأن بيانات Supabase وهمية</li>
            <li>• التصميم المتجاوب يعمل بشكل صحيح</li>
            <li>• معالجة الأخطاء تعمل كما هو متوقع</li>
            <li>• أنواع الصفحات المختلفة يتم التعامل معها بشكل صحيح</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
