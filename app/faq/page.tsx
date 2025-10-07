'use client';

import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "ما هي منصة نائبك؟",
    answer: "منصة نائبك هي تطبيق إلكتروني يهدف إلى تحقيق تواصل فعال بين المواطن المصري وأعضاء مجلسي النواب والشيوخ، بالإضافة إلى المرشحين لعضوية هذه المجالس. تأسست المنصة في 6 أكتوبر 2025 لتكون الجسر الحيوي الذي يربط المواطن بنائبه.",
    category: "عام"
  },
  {
    id: 2,
    question: "كيف يمكنني التسجيل في المنصة؟",
    answer: "يمكنك التسجيل بسهولة عن طريق إدخال بياناتك الشخصية الأساسية مثل الاسم والبريد الإلكتروني ورقم الهاتف والرقم القومي للتحقق من الهوية. كما يمكنك التسجيل باستخدام حساب Google الخاص بك لتسهيل العملية.",
    category: "التسجيل"
  },
  {
    id: 3,
    question: "هل التسجيل في المنصة مجاني؟",
    answer: "نعم، التسجيل واستخدام جميع خدمات منصة نائبك مجاني تماماً. نحن نؤمن بأن التواصل مع النواب حق أساسي لكل مواطن ولا يجب أن يكون هناك أي حواجز مالية تمنع ذلك.",
    category: "التسجيل"
  },
  {
    id: 4,
    question: "كيف يمكنني العثور على نائبي؟",
    answer: "بعد التسجيل وإدخال عنوانك (المحافظة والمنطقة)، ستتمكن المنصة من تحديد النواب الذين يمثلون منطقتك في مجلسي النواب والشيوخ تلقائياً. ستجد معلومات شاملة عن كل نائب بما في ذلك السيرة الذاتية والبرنامج الانتخابي والإنجازات.",
    category: "الاستخدام"
  },
  {
    id: 5,
    question: "ما هي الخدمات التي تقدمها المنصة؟",
    answer: "تقدم المنصة عدة خدمات رئيسية: التعرف على النواب ومعلوماتهم، تقييم أداء النواب بالنجوم، إرسال رسائل مباشرة للنواب، تقديم الشكاوى ومتابعتها، تقديم الاقتراحات والآراء، والمشاركة في النقاشات حول القضايا المهمة.",
    category: "الخدمات"
  },
  {
    id: 6,
    question: "كيف يعمل نظام الشكاوى؟",
    answer: "عند تقديم شكوى، يتم إرسالها إلى جهة إدارية متخصصة تقوم بدراستها وإسنادها للنائب المناسب. يتم متابعة الشكوى بانتظام، وإذا لم يتم حلها في الوقت المحدد، يتم إسنادها لنائب آخر حتى يتم إيجاد حل جذري لها.",
    category: "الشكاوى"
  },
  {
    id: 7,
    question: "هل يمكنني تقييم أداء النائب؟",
    answer: "نعم، يمكنك تقييم أداء النواب باستخدام نظام النجوم (من 1 إلى 5 نجوم) بناءً على تجربتك الشخصية معهم. هذا التقييم يساعد المواطنين الآخرين في تكوين رأي حول أداء النواب ويشجع النواب على تحسين خدماتهم.",
    category: "التقييم"
  },
  {
    id: 8,
    question: "هل رسائلي للنواب خاصة وآمنة؟",
    answer: "نعم، جميع الرسائل والمراسلات محمية بأعلى معايير الأمان والتشفير. لا يمكن لأي شخص آخر غيرك والنائب المعني الاطلاع على محتوى الرسائل. نحن نلتزم بحماية خصوصيتك وسرية مراسلاتك.",
    category: "الأمان"
  },
  {
    id: 9,
    question: "ماذا لو لم يرد النائب على رسالتي؟",
    answer: "إذا لم يرد النائب على رسالتك خلال فترة معقولة، يمكنك تقديم شكوى حول عدم الاستجابة. كما يمكنك تقييم النائب بناءً على مدى استجابته. المنصة تتيح لك أيضاً التواصل مع نواب آخرين يمثلون منطقتك.",
    category: "التواصل"
  },
  {
    id: 10,
    question: "هل يمكنني حذف حسابي؟",
    answer: "نعم، يمكنك حذف حسابك في أي وقت من خلال إعدادات الحساب. عند الحذف، سيتم إزالة جميع بياناتك الشخصية وفقاً لسياسة الخصوصية الخاصة بنا، مع الاحتفاظ ببعض البيانات المطلوبة قانونياً لفترة محددة.",
    category: "الحساب"
  },
  {
    id: 11,
    question: "كيف أعرف أن النائب قرأ رسالتي؟",
    answer: "المنصة تتيح نظام إشعارات يخبرك عندما يقرأ النائب رسالتك. ستحصل على إشعار عبر البريد الإلكتروني أو داخل التطبيق عند قراءة الرسالة أو الرد عليها.",
    category: "التواصل"
  },
  {
    id: 12,
    question: "هل يمكنني تغيير تقييمي للنائب؟",
    answer: "نعم، يمكنك تعديل تقييمك للنائب في أي وقت بناءً على تجاربك الجديدة معه. نحن نؤمن بأن التقييم يجب أن يعكس الأداء الحالي والمستمر للنائب.",
    category: "التقييم"
  },
  {
    id: 13,
    question: "ما هي المعلومات المطلوبة للتسجيل؟",
    answer: "المعلومات المطلوبة تشمل: الاسم الكامل، البريد الإلكتروني، رقم الهاتف، العنوان (المحافظة والمنطقة)، والرقم القومي للتحقق من الهوية. هذه المعلومات ضرورية لضمان أن كل مستخدم مواطن حقيقي وتحديد النواب المناسبين له.",
    category: "التسجيل"
  },
  {
    id: 14,
    question: "هل يمكنني استخدام المنصة على الهاتف المحمول؟",
    answer: "نعم، المنصة مصممة لتعمل بشكل مثالي على جميع الأجهزة بما في ذلك الهواتف المحمولة والأجهزة اللوحية وأجهزة الكمبيوتر. التصميم متجاوب ويتكيف مع حجم شاشة جهازك.",
    category: "التقنية"
  },
  {
    id: 15,
    question: "كيف يتم حماية بياناتي الشخصية؟",
    answer: "نستخدم أحدث تقنيات التشفير والحماية لضمان أمان بياناتك. جميع البيانات محفوظة على خوادم آمنة ومحمية، ولا نشارك معلوماتك مع أطراف ثالثة إلا في الحالات المنصوص عليها في سياسة الخصوصية.",
    category: "الأمان"
  }
];

const categories = ["الكل", "عام", "التسجيل", "الاستخدام", "الخدمات", "الشكاوى", "التقييم", "الأمان", "التواصل", "الحساب", "التقنية"];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = selectedCategory === "الكل" || item.category === selectedCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-extrabold text-center text-[#004705] mb-12 leading-tight">
          الأسئلة الشائعة
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 mb-12">
          <p className="text-xl leading-relaxed text-gray-700 text-center mb-8">
            هنا ستجد إجابات على أكثر الأسئلة شيوعاً حول منصة نائبك. إذا لم تجد إجابة لسؤالك، لا تتردد في التواصل معنا.
          </p>

          {/* شريط البحث */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث في الأسئلة الشائعة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200 pl-12"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* فلاتر الفئات */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#004705] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* عرض النتائج */}
        <div className="mb-6">
          <p className="text-lg text-gray-600 text-center">
            عرض {filteredFAQs.length} من {faqData.length} سؤال
          </p>
        </div>

        {/* قائمة الأسئلة */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="bg-white p-12 rounded-lg shadow-lg border border-gray-100 text-center">
              <div className="text-6xl text-gray-300 mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">لم يتم العثور على نتائج</h3>
              <p className="text-lg text-gray-500">جرب تغيير مصطلح البحث أو الفئة المختارة</p>
            </div>
          ) : (
            filteredFAQs.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-8 py-6 text-right hover:bg-gray-50 transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span className="bg-[#FF8C00] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-semibold text-[#004705]">{item.question}</h3>
                  </div>
                  <div className={`transform transition-transform duration-200 ${
                    openItems.includes(item.id) ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-6 h-6 text-[#004705]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  openItems.includes(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-200 pt-6">
                      <p className="text-lg text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* قسم المساعدة الإضافية */}
        <div className="mt-16 bg-[#004705] text-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              لم تجد إجابة لسؤالك؟
            </h2>
            <p className="text-xl leading-relaxed mb-8">
              فريق الدعم الخاص بنا جاهز لمساعدتك في أي وقت. تواصل معنا وسنكون سعداء للإجابة على جميع استفساراتك.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-[#FF8C00] hover:bg-[#FF7700] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                تواصل معنا
              </a>
              <a
                href="mailto:support@naebak.com"
                className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 border-2 border-white hover:text-[#004705] hover:bg-white"
              >
                أرسل بريد إلكتروني
              </a>
            </div>
          </div>
        </div>

        {/* نصائح سريعة */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 text-center">
            <h3 className="text-xl font-semibold text-[#004705] mb-3">ابدأ بسرعة</h3>
            <p className="text-gray-700">سجل حسابك واكتشف نوابك في دقائق معدودة</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 text-center">
            <h3 className="text-xl font-semibold text-[#004705] mb-3">آمن ومحمي</h3>
            <p className="text-gray-700">جميع بياناتك ومراسلاتك محمية بأعلى معايير الأمان</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 text-center">
            <h3 className="text-xl font-semibold text-[#004705] mb-3">متاح دائماً</h3>
            <p className="text-gray-700">استخدم المنصة من أي جهاز وفي أي وقت</p>
          </div>
        </div>
      </div>
    </div>
  );
}
