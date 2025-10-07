import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-extrabold text-center text-[#004705] mb-12 leading-tight">
          الشروط والأحكام
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 mb-8">
          <p className="text-lg text-gray-700 mb-6 text-center">
            آخر تحديث: 6 أكتوبر 2025
          </p>
          <p className="text-xl leading-relaxed text-gray-700 mb-6">
            مرحباً بك في منصة نائبك. باستخدامك لهذه المنصة، فإنك توافق على الالتزام بالشروط والأحكام التالية. 
            يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا.
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 border-b-2 border-[#FF8C00] pb-3">
              تعريفات أساسية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-[#004705] mb-2">المنصة:</h3>
                <p className="text-lg text-gray-700">تطبيق ومنصة "نائبك" الإلكترونية وجميع خدماتها المرتبطة.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-[#004705] mb-2">المستخدم:</h3>
                <p className="text-lg text-gray-700">أي شخص يستخدم المنصة، سواء كان مواطناً أو نائباً أو مرشحاً.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-[#004705] mb-2">النائب:</h3>
                <p className="text-lg text-gray-700">عضو في مجلس النواب أو مجلس الشيوخ أو مرشح لعضوية أحد المجلسين.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-[#004705] mb-2">الخدمات:</h3>
                <p className="text-lg text-gray-700">جميع الميزات والوظائف المتاحة على المنصة.</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 border-b-2 border-[#FF8C00] pb-3">
              قبول الشروط
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-lg text-gray-700 mb-4">
                باستخدامك للمنصة، فإنك تؤكد أنك:
              </p>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-3 ml-4">
                <li>تبلغ من العمر 18 عاماً على الأقل أو تحت إشراف ولي الأمر</li>
                <li>مواطن مصري أو مقيم قانوني في مصر</li>
                <li>تمتلك الأهلية القانونية للدخول في هذه الاتفاقية</li>
                <li>توافق على الالتزام بجميع الشروط والأحكام</li>
                <li>تتعهد بتقديم معلومات صحيحة ودقيقة</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 border-b-2 border-[#FF8C00] pb-3">
              استخدام المنصة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
                <h3 className="text-xl font-semibold text-green-800 mb-3">الاستخدام المسموح:</h3>
                <ul className="list-disc list-inside text-lg text-green-700 space-y-2">
                  <li>التواصل مع النواب والمرشحين</li>
                  <li>تقديم الشكاوى والاقتراحات</li>
                  <li>تقييم أداء النواب بصدق</li>
                  <li>المشاركة في النقاشات البناءة</li>
                  <li>الوصول إلى المعلومات العامة</li>
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
                <h3 className="text-xl font-semibold text-red-800 mb-3">الاستخدام المحظور:</h3>
                <ul className="list-disc list-inside text-lg text-red-700 space-y-2">
                  <li>نشر محتوى مسيء أو مهين</li>
                  <li>التحريض على العنف أو الكراهية</li>
                  <li>انتحال الشخصية أو التضليل</li>
                  <li>نشر معلومات كاذبة أو مضللة</li>
                  <li>انتهاك حقوق الآخرين</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 border-b-2 border-[#FF8C00] pb-3">
              الحسابات والتسجيل
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#004705] mb-3">متطلبات التسجيل:</h3>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-3 ml-4">
                  <li>تقديم معلومات شخصية صحيحة وحديثة</li>
                  <li>التحقق من الهوية باستخدام الرقم القومي</li>
                  <li>إنشاء كلمة مرور قوية وآمنة</li>
                  <li>الحفاظ على سرية بيانات الدخول</li>
                  <li>إشعارنا فوراً في حالة اختراق الحساب</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-lg text-yellow-800">
                  <strong>تنبيه:</strong> أنت مسؤول عن جميع الأنشطة التي تتم من خلال حسابك. 
                  يجب عليك الحفاظ على أمان بيانات الدخول الخاصة بك.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 border-b-2 border-[#FF8C00] pb-3">
              المحتوى والمسؤوليات
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#004705] mb-3">محتوى المستخدم:</h3>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
                  <li>أنت مسؤول عن جميع المحتوى الذي تنشره</li>
                  <li>يجب أن يكون المحتوى قانونياً ومناسباً</li>
                  <li>لا يجب أن ينتهك حقوق الملكية الفكرية</li>
                  <li>يجب أن يكون صادقاً وغير مضلل</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#004705] mb-3">حقوق المنصة:</h3>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
                  <li>مراجعة ومراقبة المحتوى المنشور</li>
                  <li>إزالة المحتوى المخالف دون إشعار مسبق</li>
                  <li>تعليق أو إغلاق الحسابات المخالفة</li>
                  <li>التعاون مع السلطات في حالة المخالفات القانونية</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 border-b-2 border-[#FF8C00] pb-3">
              الخصوصية والأمان
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                نحن ملتزمون بحماية خصوصيتك وأمان بياناتك. لمزيد من التفاصيل، يرجى مراجعة 
                <a href="/privacy-policy" className="text-[#004705] font-semibold hover:underline mx-1">
                  سياسة الخصوصية
                </a>
                الخاصة بنا.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">التزاماتنا:</h3>
                <ul className="list-disc list-inside text-lg text-blue-700 space-y-1 ml-4">
                  <li>حماية بياناتك الشخصية</li>
                  <li>استخدام تقنيات التشفير المتقدمة</li>
                  <li>عدم مشاركة معلوماتك مع أطراف ثالثة دون إذنك</li>
                  <li>الشفافية في كيفية استخدام بياناتك</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 border-b-2 border-[#FF8C00] pb-3">
              المسؤولية القانونية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h3 className="text-xl font-semibold text-red-800 mb-2">إخلاء المسؤولية:</h3>
                <ul className="list-disc list-inside text-lg text-red-700 space-y-2 ml-4">
                  <li>المنصة تقدم الخدمات "كما هي" دون ضمانات</li>
                  <li>لا نضمن دقة أو اكتمال المعلومات المقدمة من المستخدمين</li>
                  <li>لا نتحمل مسؤولية الأضرار الناتجة عن استخدام المنصة</li>
                  <li>المستخدم مسؤول عن التحقق من صحة المعلومات</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="text-xl font-semibold text-green-800 mb-2">التزاماتنا:</h3>
                <ul className="list-disc list-inside text-lg text-green-700 space-y-2 ml-4">
                  <li>بذل أقصى جهد لضمان استمرارية الخدمة</li>
                  <li>معالجة المشاكل التقنية في أسرع وقت ممكن</li>
                  <li>توفير دعم فني للمستخدمين</li>
                  <li>الحفاظ على معايير الجودة والأمان</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 border-b-2 border-[#FF8C00] pb-3">
              إنهاء الخدمة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#004705] mb-3">إنهاء من قبل المستخدم:</h3>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                  <li>يمكنك إلغاء حسابك في أي وقت</li>
                  <li>سيتم حذف بياناتك وفقاً لسياسة الخصوصية</li>
                  <li>قد تبقى بعض البيانات لأغراض قانونية</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#004705] mb-3">إنهاء من قبل المنصة:</h3>
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
                  <li>في حالة انتهاك الشروط والأحكام</li>
                  <li>عند استخدام المنصة لأغراض غير قانونية</li>
                  <li>في حالة عدم النشاط لفترة طويلة</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 border-b-2 border-[#FF8C00] pb-3">
              التواصل وحل النزاعات
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                في حالة وجود أي نزاع أو استفسار حول هذه الشروط، يرجى التواصل معنا أولاً لحل المشكلة ودياً.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="font-semibold text-[#004705] mb-2">البريد الإلكتروني</h4>
                    <p className="text-gray-700">legal@naebak.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#004705] mb-2">الهاتف</h4>
                    <p className="text-gray-700">+20 123 456 7890</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#004705] mb-2">العنوان</h4>
                    <p className="text-gray-700">القاهرة، مصر</p>
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                تخضع هذه الشروط للقانون المصري، وتختص المحاكم المصرية بنظر أي نزاعات قد تنشأ.
              </p>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 border-b-2 border-[#FF8C00] pb-3">
              تعديل الشروط
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إشعارك بأي تغييرات مهمة عبر:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
                  <li>إشعار على المنصة</li>
                  <li>رسالة بريد إلكتروني</li>
                  <li>رسالة نصية (في حالة التغييرات الجوهرية)</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <p className="text-lg text-yellow-800">
                  <strong>مهم:</strong> استمرارك في استخدام المنصة بعد التعديلات يعني موافقتك على الشروط الجديدة.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
