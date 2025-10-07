import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-extrabold text-center text-[#004705] mb-12 leading-tight">
          سياسة الخصوصية
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 mb-8">
          <p className="text-lg text-gray-700 mb-6 text-center">
            آخر تحديث: 6 أكتوبر 2025
          </p>
          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            في منصة نائبك، نحن ملتزمون بحماية خصوصيتك وضمان أمان بياناتك الشخصية. هذه السياسة توضح كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 flex items-center">
              <span className="text-4xl text-[#FF8C00] mr-4">📊</span>
              المعلومات التي نجمعها
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[#004705] mb-2">المعلومات الشخصية:</h3>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
                  <li>الاسم الكامل</li>
                  <li>عنوان البريد الإلكتروني</li>
                  <li>رقم الهاتف</li>
                  <li>العنوان (المحافظة والمنطقة)</li>
                  <li>الرقم القومي (للتحقق من الهوية)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#004705] mb-2">معلومات الاستخدام:</h3>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
                  <li>سجل الأنشطة على المنصة</li>
                  <li>الرسائل والشكاوى المرسلة</li>
                  <li>التقييمات والآراء</li>
                  <li>معلومات الجهاز وعنوان IP</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 flex items-center">
              <span className="text-4xl text-[#FF8C00] mr-4">🎯</span>
              كيف نستخدم معلوماتك
            </h2>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-3">
              <li>التحقق من هويتك وضمان أمان الحساب</li>
              <li>تسهيل التواصل بينك وبين النواب والمرشحين</li>
              <li>معالجة ومتابعة الشكاوى المقدمة</li>
              <li>تحسين خدمات المنصة وتطوير ميزات جديدة</li>
              <li>إرسال إشعارات مهمة متعلقة بحسابك</li>
              <li>ضمان الامتثال للقوانين واللوائح المعمول بها</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 flex items-center">
              <span className="text-4xl text-[#FF8C00] mr-4">🔒</span>
              حماية بياناتك
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                نتخذ إجراءات أمنية صارمة لحماية معلوماتك الشخصية، بما في ذلك:
              </p>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-3 ml-4">
                <li>تشفير البيانات أثناء النقل والتخزين</li>
                <li>استخدام خوادم آمنة ومحمية</li>
                <li>تطبيق بروتوكولات أمان متقدمة</li>
                <li>مراقبة مستمرة للأنشطة المشبوهة</li>
                <li>تحديث أنظمة الأمان بانتظام</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 flex items-center">
              <span className="text-4xl text-[#FF8C00] mr-4">🤝</span>
              مشاركة المعلومات
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلومات محدودة في الحالات التالية:
              </p>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-3 ml-4">
                <li>مع النواب والمرشحين عند إرسال رسائل أو شكاوى</li>
                <li>مع السلطات المختصة عند الضرورة القانونية</li>
                <li>مع مقدمي الخدمات التقنية (بشكل مشفر ومحدود)</li>
                <li>في حالات الطوارئ لحماية سلامة المستخدمين</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 flex items-center">
              <span className="text-4xl text-[#FF8C00] mr-4">⚖️</span>
              حقوقك
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-[#004705] mb-3">حقوق البيانات:</h3>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                  <li>الوصول إلى بياناتك</li>
                  <li>تصحيح المعلومات الخاطئة</li>
                  <li>حذف حسابك وبياناتك</li>
                  <li>تقييد معالجة البيانات</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#004705] mb-3">حقوق الخصوصية:</h3>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                  <li>إلغاء الاشتراك في الإشعارات</li>
                  <li>تعديل إعدادات الخصوصية</li>
                  <li>الاعتراض على معالجة البيانات</li>
                  <li>نقل البيانات إلى منصة أخرى</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 flex items-center">
              <span className="text-4xl text-[#FF8C00] mr-4">🍪</span>
              ملفات تعريف الارتباط (Cookies)
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              نستخدم ملفات تعريف الارتباط لتحسين تجربتك على المنصة، بما في ذلك:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
              <li>الحفاظ على جلسة تسجيل الدخول</li>
              <li>تذكر تفضيلاتك وإعداداتك</li>
              <li>تحليل استخدام المنصة لتحسين الخدمات</li>
              <li>عرض محتوى مخصص ومناسب لك</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 flex items-center">
              <span className="text-4xl text-[#FF8C00] mr-4">📞</span>
              التواصل معنا
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية، يمكنك التواصل معنا عبر:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="text-lg text-gray-700 space-y-2">
                <li><strong>البريد الإلكتروني:</strong> privacy@naebak.com</li>
                <li><strong>الهاتف:</strong> +20 123 456 7890</li>
                <li><strong>العنوان:</strong> القاهرة، مصر</li>
              </ul>
            </div>
          </section>

          <section className="bg-[#004705] text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <span className="text-4xl text-[#FF8C00] mr-4">🔄</span>
              تحديث السياسة
            </h2>
            <p className="text-lg leading-relaxed">
              قد نقوم بتحديث هذه السياسة من وقت لآخر لتعكس التغييرات في خدماتنا أو المتطلبات القانونية. 
              سنقوم بإشعارك بأي تغييرات مهمة عبر البريد الإلكتروني أو من خلال إشعار على المنصة.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
