
import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-[#004705] text-center mb-8">من نحن</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#004705] mb-4">نبذة عن منصة نائبك</h2>
        <p className="text-lg text-[#333333] leading-relaxed mb-4">
          منصة نائبك هي تطبيق يهدف إلى تحقيق تواصل وتفاعل فعال بين المواطن وأعضاء مجلسي الشيوخ والنواب، بالإضافة إلى المرشحين لعضوية هذه المجالس. نؤمن في إدارة نائبك بحق المواطن في معرفة من يمثله، وتقييم أدائه، وتقديم الاقتراحات، ونقل المشاكل إليه قبل وبعد توليه المنصب.
        </p>
        <p className="text-lg text-[#333333] leading-relaxed">
          نسعى لجعل المواطن شريكًا فاعلاً في العملية السياسية والتشريعية، ونقل نبض الشارع بقوة لمن يمثله في المجالس التشريعية، مما يسهم في تطوير المناخ التشريعي وأداء الحكومة بالتبعية.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#004705] mb-4">مفهوم 

عام: النائب</h2>
        <p className="text-lg text-[#333333] leading-relaxed">
          كلمة "النائب" تطلق على أي عضو في مجلس النواب أو مجلس الشيوخ، وكذلك على المرشحين لعضوية هذين المجلسين. عندما نتحدث عن "التواصل مع النواب"، فإننا نجمع بين الأعضاء والمرشحين في مجلسي الشيوخ والنواب.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#004705] mb-4">رؤيتنا</h2>
        <p className="text-lg text-[#333333] leading-relaxed">
          أن نكون الجسر الذي يربط المواطن بصانع القرار، لتعزيز الشفافية والمشاركة الفعالة في بناء مستقبل أفضل.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#004705] mb-4">رسالتنا</h2>
        <p className="text-lg text-[#333333] leading-relaxed">
          توفير منصة إلكترونية سهلة الاستخدام وآمنة، تمكن المواطنين من التعبير عن آرائهم، وتقديم شكواهم، وتقييم أداء ممثليهم، والمساهمة في العملية التشريعية والسياسية بوعي ومسؤولية.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#004705] mb-4">قيمنا الأساسية</h2>
        <ul className="list-disc list-inside text-lg text-[#333333] leading-relaxed space-y-2">
          <li><strong className="text-[#004705]">الشفافية:</strong> نؤمن بحق المواطن في معرفة كل ما يتعلق بممثليه وأدائهم.</li>
          <li><strong className="text-[#004705]">المشاركة:</strong> نشجع المواطنين على المشاركة الفعالة في الشأن العام.</li>
          <li><strong className="text-[#004705]">المسؤولية:</strong> نلتزم بتقديم منصة آمنة وموثوقة لخدمة المجتمع.</li>
          <li><strong className="text-[#004705]">التطوير المستمر:</strong> نسعى دائمًا لتحسين خدماتنا وتلبية احتياجات المستخدمين.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-[#004705] mb-4">بنية المشروع</h2>
        <p className="text-lg text-[#333333] leading-relaxed mb-4">
          يعتمد مشروع نائبك على سياسة محددة في الإنشاء، حيث يتم تطوير الواجهة الأمامية (Frontend) باستخدام Next.js ومكتباته المتقدمة لضمان احترافية عالية في الواجهات. أما الواجهة الخلفية (Backend) فتعتمد بشكل أساسي على Django.
        </p>
        <p className="text-lg text-[#333333] leading-relaxed mb-4">
          نتبع نظام الميكروسيرفس (Microservices)، حيث يتم إنشاء كل تطبيق داخلي في المشروع بشكل منفصل تمامًا، مع رابط Google Cloud Run خاص به، وقاعدة بيانات منفصلة، وإعدادات مستقلة. يتم بعد ذلك الربط بين هذه التطبيقات والتطبيق الرئيسي الذي يجمعها في واجهات موحدة لتقديم الخدمات للمستخدم.
        </p>
        <h3 className="text-2xl font-medium text-[#004705] mb-2">مراحل التطوير</h3>
        <p className="text-lg text-[#333333] leading-relaxed mb-4">
          يتم إنشاء التطبيقات على مرحلتين لضمان قوة البناء:
        </p>
        <ul className="list-disc list-inside text-lg text-[#333333] leading-relaxed space-y-2 mb-4">
          <li><strong className="text-[#004705]">المرحلة الأولى:</strong> إنشاء تطبيق لإدارة عمليات الدخول والخروج، العضويات، والصلاحيات، والدخول عبر المصادقة مع Google، وإدارة بيانات المستخدمين، واسترجاع كلمات السر المفقودة، بالإضافة إلى فحص فوري لكلمات السر وأسماء المستخدمين والبريد الإلكتروني أثناء التسجيل.</li>
          <li><strong className="text-[#004705]">المرحلة الثانية:</strong> بعد الانتهاء من التطبيق الرئيسي، يتم إنشاء تطبيقات أخرى مثل:</li>
          <ul className="list-circle list-inside ml-8 text-lg text-[#333333] leading-relaxed space-y-1">
            <li><strong className="text-[#004705]">تطبيق الرسائل:</strong> للتواصل المباشر بين المواطنين والنواب/المرشحين.</li>
            <li><strong className="text-[#004705]">تطبيق الشكاوى:</strong> لإرسال الشكاوى إلى الإدارة وتوجيهها للنواب.</li>
            <li><strong className="text-[#004705]">تطبيق عداد الزوار:</strong> لعرض عدد الزوار بشكل ديناميكي.</li>
            <li><strong className="text-[#004705]">تطبيق التقييمات:</strong> لتقييم أداء النواب/المرشحين.</li>
            <li><strong className="text-[#004705]">تطبيق شريط الأخبار:</strong> لعرض الأخبار الهامة.</li>
            <li><strong className="text-[#004705]">تطبيق التحكم في البنرات:</strong> لإدارة البنرات المختلفة في الموقع.</li>
          </ul>
        </ul>
        <p className="text-lg text-[#333333] leading-relaxed">
          نحرص على النشر المتزامن على Google Cloud Run و GitHub في كل مرحلة لضمان تتبع التطوير ورؤية كل شيء على الطبيعة.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-[#004705] mb-4">مواصفات عامة للموقع</h2>
        <ul className="list-disc list-inside text-lg text-[#333333] leading-relaxed space-y-2">
          <li><strong className="text-[#004705]">الهيدر والفوتر:</strong> يتم فصلهما في ملفات منفصلة وتضمينهما في جميع الصفحات لضمان الثبات والتناسق.</li>
          <li><strong className="text-[#004705]">الألوان:</strong> الألوان الأساسية هي الأبيض، الرمادي، البرتقالي، والأخضر. يمكن للادمن التحكم في درجات اللونين البرتقالي والأخضر من لوحة التحكم.</li>
          <li><strong className="text-[#004705]">لوحة التحكم:</strong> يتم تطوير لوحة التحكم باستخدام Next.js لتوفير مرونة وتحكم كامل في جميع جوانب الموقع.</li>
          <li><strong className="text-[#004705]">قواعد البيانات:</strong> نستخدم PostgreSQL، Celery، و Redis لضمان التعامل مع عدد كبير من الزوار والبيانات.</li>
          <li><strong className="text-[#004705]">الخدمات المصغرة:</strong> يتم استخدام Flask في الخدمات الصغيرة مثل عداد الزوار والإحصائيات وشريط الأخبار لمرونة أكبر.</li>
        </ul>
      </section>
    </div>
  );
}

