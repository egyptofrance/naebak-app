
import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-extrabold text-center text-[#004705] mb-12 leading-tight">
          منصة نائبك: صوتك يصل إلى من يمثلك
        </h1>

        <section className="mb-16 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-4xl font-bold text-[#004705] mb-6 text-center">نبذة عن المنصة</h2>
          <p className="text-xl leading-relaxed text-gray-700 mb-6 text-center">
            تأسست منصة نائبك في السادس من أكتوبر عام 2025، لتكون الجسر الحيوي الذي يربط المواطن المصري بنائبه في مجلسي النواب والشيوخ.
            نحن نؤمن بأن التواصل الفعال هو حجر الزاوية في بناء مجتمع ديمقراطي مزدهر، حيث لا يقتصر دور المواطن على الاختيار، بل يمتد إلى المشاركة الفاعلة والمستمرة.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold text-[#004705] mb-8 text-center">ماذا تقدم لك منصة نائبك؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center">
              <div className="text-5xl text-[#FF8C00] mb-4">🗳️</div>
              <h3 className="text-2xl font-semibold text-[#004705] mb-3">التعرف على نائبك</h3>
              <p className="text-lg text-gray-700">
                تتيح لك المنصة التعرف على نوابك ومرشحيك بشكل شامل، بما في ذلك معلوماتهم الشخصية، برامجهم الانتخابية، وإنجازاتهم، لتكون على دراية كاملة بمن يمثلك.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center">
              <div className="text-5xl text-[#FF8C00] mb-4">⭐</div>
              <h3 className="text-2xl font-semibold text-[#004705] mb-3">تقييم الأداء</h3>
              <p className="text-lg text-gray-700">
                يمكنك تقييم أداء نائبك بالنجوم، مما يعكس رأيك ويساهم في بناء صورة واضحة عن مدى فعاليته في خدمة المجتمع.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center">
              <div className="text-5xl text-[#FF8C00] mb-4">✉️</div>
              <h3 className="text-2xl font-semibold text-[#004705] mb-3">مراسلة مباشرة</h3>
              <p className="text-lg text-gray-700">
                تواصل مباشرة مع نائبك لتقديم الاقتراحات، نقل الآراء، ومناقشة القضايا التي تهمك، ليكون صوتك مسموعًا دائمًا.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center">
              <div className="text-5xl text-[#FF8C00] mb-4">📝</div>
              <h3 className="text-2xl font-semibold text-[#004705] mb-3">نظام الشكاوى الفعال</h3>
              <p className="text-lg text-gray-700">
                أرسل شكواك إلى جهة إدارية تقوم بإسنادها لنائب ومتابعتها. إذا لم يتم حلها، يتم إسنادها لنائب آخر حتى يتم إيجاد حل جذري لها.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center">
              <div className="text-5xl text-[#FF8C00] mb-4">🗣️</div>
              <h3 className="text-2xl font-semibold text-[#004705] mb-3">قناة اتصال ثنائية الاتجاه</h3>
              <p className="text-lg text-gray-700">
                نائبك ليست مجرد منصة لسماع الأخبار، بل هي قناتك المباشرة للتأثير وصنع التغيير، حيث يتمكن النواب من سماع صوتك بوضوح.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center">
              <div className="text-5xl text-[#FF8C00] mb-4">🌐</div>
              <h3 className="text-2xl font-semibold text-[#004705] mb-3">المشاركة السياسية</h3>
              <p className="text-lg text-gray-700">
                نمكنك من المشاركة بفاعلية في العملية السياسية والتشريعية، ونقل نبض الشارع بقوة لمن يمثلك في المجالس التشريعية.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center bg-white p-8 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-4xl font-bold text-[#004705] mb-6">رؤيتنا</h2>
          <p className="text-xl leading-relaxed text-gray-700">
            أن نكون المنصة الرائدة في تعزيز التواصل الديمقراطي والمشاركة المجتمعية بين المواطنين وممثليهم المنتخبين في مصر.
          </p>
        </section>
      </div>
    </div>
  );
}

