# 📋 خطة العمل الشاملة - منصة نائبك (نظام Tags المرقم)

**تاريخ الإنشاء:** 6 أكتوبر 2025  
**آخر تحديث:** 6 أكتوبر 2025  
**الإصدار الحالي:** v1.0.0  
**الحالة:** ✅ البنية التحتية جاهزة | 🚧 الواجهات قيد التطوير

---

## 🎯 نظام الترقيم والإصدارات

### قواعد الترقيم

```
v[MAJOR].[MINOR].[PATCH]

MAJOR: تغييرات كبيرة أو إكمال مرحلة رئيسية
MINOR: إضافة ميزة جديدة أو صفحة كاملة
PATCH: إصلاح bug أو تحسين صغير
```

### مراحل التطوير

| المرحلة | Tag | الحالة | الوصف |
|---------|-----|--------|-------|
| **البنية التحتية** | v1.0.0 | ✅ مكتمل | Next.js 15 + Supabase + Vercel |
| **المكونات الأساسية** | v1.1.0 | 🔴 قيد العمل | Header, Footer, Banner, etc. |
| **نظام المصادقة** | v1.2.0 | ⏳ معلق | Login, Register, Auth |
| **الصفحات العامة** | v1.3.0 | ⏳ معلق | Landing, MPs, Candidates |
| **لوحة المواطن** | v1.4.0 | ⏳ معلق | Citizen Dashboard |
| **لوحة النائب/المرشح** | v1.5.0 | ⏳ معلق | MP/Candidate Dashboard |
| **لوحة المدير** | v1.6.0 | ⏳ معلق | Manager Dashboard |
| **لوحة الأدمن** | v1.7.0 | ⏳ معلق | Admin Dashboard |
| **الاختبار والتحسين** | v1.8.0 | ⏳ معلق | Testing & Optimization |
| **الإطلاق** | v2.0.0 | ⏳ معلق | Production Release |

---

## 📦 v1.0.0 - البنية التحتية ✅

**التاريخ:** 5 أكتوبر 2025  
**الحالة:** ✅ مكتمل

### ما تم إنجازه:
- [x] إنشاء مشروع Next.js 15
- [x] إعداد Tailwind CSS
- [x] إعداد TypeScript
- [x] ربط Supabase
- [x] إعداد GitHub Repository
- [x] ربط Vercel + CI/CD
- [x] إنشاء Schema قاعدة البيانات
- [x] إضافة البيانات الأولية (27 محافظة، المجالس، الأحزاب، إلخ)
- [x] نظام الإصدارات (VERSION, CHANGELOG.md, release.sh)

**الملفات المُضافة:**
- `package.json`
- `next.config.ts`
- `tailwind.config.ts`
- `tsconfig.json`
- `lib/supabase.ts`
- `lib/types.ts`
- `supabase/schema.sql`
- `VERSION`
- `CHANGELOG.md`
- `scripts/release.sh`

---

## 🧩 v1.1.0 - المكونات الأساسية المشتركة

**الأولوية:** 🔴 عالية جداً  
**التقدير:** 3-4 أيام  
**الحالة:** 🔴 قيد العمل

### v1.1.1 - إعداد الخطوط والألوان

**المهام:**
- [ ] تثبيت خط Tajawal من Google Fonts
- [ ] تخصيص `tailwind.config.ts` بالألوان الرسمية:
  ```typescript
  colors: {
    primary: '#004705',    // أخضر
    secondary: '#e86202',  // برتقالي
  }
  ```
- [ ] إضافة دعم RTL كامل في `globals.css`
- [ ] إنشاء `constants/colors.ts`

**الملفات:**
- `app/layout.tsx` (تحديث)
- `tailwind.config.ts` (تحديث)
- `app/globals.css` (تحديث)
- `constants/colors.ts` (جديد)

**ملاحظات مهمة:**
- ⚠️ **يجب استخدام خط Tajawal في جميع الصفحات بدون استثناء**
- ⚠️ **صفحات المصادقة (login, register) يجب أن تستخدم Tajawal أيضاً**

---

### v1.1.2 - مكون Header (الهيدر)

**المتطلبات:**
- [ ] خلفية بيضاء مع **ظل خفيف** (shadow)
- [ ] اليمين: لوجو أخضر قابل للنقر (يوجه للصفحة الرئيسية)
- [ ] الوسط: قائمة الروابط:
  - الرئيسية
  - النواب
  - المرشحين
  - الشكاوى
  - من نحن
  - اتصل بنا
- [ ] اليسار:
  - [ ] جرس الإشعارات (نمط Facebook) مع Badge لعدد الإشعارات غير المقروءة
  - [ ] عداد الزوار العشوائي (يتحدث كل 45 ثانية)
  - [ ] زر "تسجيل الدخول" (للزوار)
  - [ ] صورة المستخدم + قائمة منسدلة (للمستخدمين المسجلين)
- [ ] تصميم متجاوب (Hamburger Menu للموبايل)
- [ ] **المسافات البينية بين عناصر المينيو يجب أن تكون ثابتة ومتساوية**

**الربط بقاعدة البيانات:**
- [ ] جلب بيانات المستخدم من `Supabase Auth`
- [ ] جلب عدد الإشعارات غير المقروءة
- [ ] تطبيق منطق عداد الزوار من `visitor_counter_settings`

**الملفات:**
- `components/layout/Header.tsx` (جديد)
- `components/ui/NotificationBell.tsx` (جديد)
- `components/ui/VisitorCounter.tsx` (جديد)
- `components/ui/UserMenu.tsx` (جديد)

**ملاحظات مهمة:**
- ⚠️ **يجب إضافة ظل للهيدر الأبيض لتمييزه عن الخلفية**
- ⚠️ **المسافات يجب أن تكون متساوية بين جميع عناصر القائمة**

---

### v1.1.3 - مكون News Bar (شريط الأخبار)

**المتطلبات:**
- [ ] خلفية رمادية داكنة (#333)
- [ ] **خط برتقالي 2px فوقه**
- [ ] **خط برتقالي 4px تحته**
- [ ] **خط رمادي 2px تحت البرتقالي**
- [ ] نصوص عربية متحركة من اليسار لليمين (RTL)
- [ ] سرعة واتجاه قابلين للتحكم من لوحة الأدمن

**الربط بقاعدة البيانات:**
- [ ] جلب الأخبار الخمسة من `settings`:
  - `news_1`
  - `news_2`
  - `news_3`
  - `news_4`
  - `news_5`
- [ ] جلب `news_speed` و `news_direction` من `settings`

**الملفات:**
- `components/layout/NewsBar.tsx` (جديد)

**ملاحظات مهمة:**
- ⚠️ **يجب الالتزام بتصميم الشريط الإخباري بالضبط (الخطوط البرتقالية والرمادية)**

---

### v1.1.4 - مكون Banner (البانر)

**المتطلبات:**
- [ ] عرض صورة كاملة العرض **بدون اقتطاع من الأعلى أو الأسفل**
- [ ] **بدون نص أو أزرار فوق الصورة**
- [ ] دعم البانر الافتراضي (`sisi-banner.jpg`)
- [ ] دعم البانرات المخصصة حسب:
  - نوع الصفحة (`page_type`)
  - المحافظة (`governorate_id`)

**الربط بقاعدة البيانات:**
- [ ] جلب البانر المناسب من `banners_public`:
  ```sql
  SELECT * FROM banners_public
  WHERE page_type = ? 
    AND (governorate_id = ? OR governorate_id IS NULL)
    AND is_active = true
  ORDER BY governorate_id DESC NULLS LAST
  LIMIT 1
  ```
- [ ] العودة للبانر الافتراضي إذا لم يوجد مخصص

**الملفات:**
- `components/layout/Banner.tsx` (جديد)
- `lib/banners.ts` (جديد - دوال مساعدة)

**ملاحظات مهمة:**
- ⚠️ **البانر أحياناً يظهر كصورة مفقودة - يجب التأكد من معالجة حالة الخطأ وعرض بانر احتياطي**
- ⚠️ **يجب عدم اقتطاع الصورة - استخدام `object-fit: contain` بدلاً من `cover`**

---

### v1.1.5 - مكون Footer (الفوتر)

**المتطلبات:**
- [ ] خلفية خضراء داكنة (#004705)
- [ ] اليسار: لوجو أبيض
- [ ] اليمين: **5 أيقونات بيضاء فقط** (بدون نصوص):
  - Facebook
  - Twitter
  - YouTube
  - LinkedIn
  - Instagram
- [ ] الوسط: "جميع الحقوق محفوظة © نائبك"
- [ ] روابط إضافية في سطر منفصل:
  - الشروط والأحكام
  - سياسة الخصوصية
  - الأسئلة الشائعة

**الربط بقاعدة البيانات:**
- [ ] جلب روابط السوشيال ميديا من `settings`:
  - `social_facebook`
  - `social_twitter`
  - `social_youtube`
  - `social_linkedin`
  - `social_instagram`

**الملفات:**
- `components/layout/Footer.tsx` (جديد)

**ملاحظات مهمة:**
- ⚠️ **يجب إزالة أي نصوص من الفوتر والالتزام بالتصميم المرفق**
- ⚠️ **المسافات البينية بين الأيقونات يجب أن تكون متساوية**

---

### v1.1.6 - مكون Sidebar (القائمة الجانبية)

**المتطلبات:**
- [ ] قائمة عمودية للوحات التحكم
- [ ] أيقونات مع نصوص
- [ ] تمييز العنصر النشط (Active State)
- [ ] تصميم متجاوب (قابل للطي في الموبايل)

**أنواع القوائم حسب الدور:**

#### قائمة المواطن:
- لوحة المعلومات
- بياناتي
- رسائلي
- شكاواي
- تقييماتي

#### قائمة النائب/المرشح:
- لوحة المعلومات
- بياناتي
- رسائلي
- شكاواي
- إنجازاتي
- مناسباتي
- برنامجي الانتخابي
- بانري الشخصي
- نقاطي

#### قائمة المدير:
- لوحة المعلومات
- إنشاء حساب نائب/مرشح
- إدارة الحسابات
- طلبات الموافقات

#### قائمة الأدمن:
- لوحة المعلومات
- إدارة البنرات العامة
- إدارة الشكاوى
- إدارة الرسائل
- إدارة المحتوى (موافقات)
- إدارة المستخدمين
- إدارة المديرين
- إدارة التقييمات
- إدارة الإعدادات
- إدارة عداد الزوار
- إدارة الأخبار

**الملفات:**
- `components/layout/Sidebar.tsx` (جديد)
- `components/layout/SidebarItem.tsx` (جديد)

---

### v1.1.7 - مكونات UI المشتركة

**المطلوب إنشاؤها:**

```
components/ui/
├── Button.tsx          # أزرار بأنماط مختلفة (primary, secondary, outline, etc.)
├── Input.tsx           # حقول إدخال نصية
├── Textarea.tsx        # مربعات نصية كبيرة
├── Select.tsx          # قوائم منسدلة
├── Modal.tsx           # نوافذ منبثقة
├── Card.tsx            # بطاقات
├── Badge.tsx           # شارات (للإشعارات والحالات)
├── Alert.tsx           # تنبيهات (success, error, warning, info)
├── Loading.tsx         # مؤشرات التحميل (Spinner, Skeleton)
├── Pagination.tsx      # ترقيم الصفحات
├── Table.tsx           # جداول
├── FileUpload.tsx      # رفع الملفات
└── RatingStars.tsx     # نجوم التقييم (1-5)
```

**المتطلبات:**
- [ ] جميع المكونات يجب أن تدعم RTL
- [ ] استخدام ألوان النظام (primary, secondary)
- [ ] تصميم متجاوب
- [ ] Accessibility (ARIA labels)

**الملفات:**
- `components/ui/*.tsx` (13 ملف جديد)

---

### v1.1.8 - Layout الرئيسي

**المتطلبات:**
- [ ] إنشاء Layout مشترك يحتوي على:
  - Header
  - NewsBar (اختياري حسب الصفحة)
  - Banner (اختياري حسب الصفحة)
  - المحتوى الرئيسي
  - Footer

**الملفات:**
- `components/layout/MainLayout.tsx` (جديد)
- `components/layout/DashboardLayout.tsx` (جديد - للوحات التحكم)

---

## 🔐 v1.2.0 - نظام المصادقة والحماية

**الأولوية:** 🔴 عالية جداً  
**التقدير:** 2-3 أيام  
**الحالة:** ⏳ معلق

### v1.2.1 - إعداد Supabase Auth

**المهام:**
- [ ] تفعيل Email Authentication في Supabase Dashboard
- [ ] إعداد Email Templates (باللغة العربية):
  - رسالة الترحيب
  - رسالة تأكيد البريد الإلكتروني
  - رسالة استرجاع كلمة المرور
- [ ] إعداد Redirect URLs في Supabase:
  - `http://localhost:3000/auth/callback` (للتطوير)
  - `https://naebak-com.vercel.app/auth/callback` (للإنتاج)
- [ ] تخصيص رسائل الخطأ بالعربية

**الملفات:**
- لا توجد ملفات كود (إعدادات في Supabase Dashboard)

---

### v1.2.2 - Context للمصادقة

**المتطلبات:**
- [ ] إنشاء `AuthContext` للمستخدم الحالي
- [ ] الدوال المطلوبة:
  ```typescript
  - login(email, password)
  - logout()
  - register(userData)
  - resetPassword(email)
  - updateProfile(data)
  ```
- [ ] حفظ بيانات المستخدم:
  ```typescript
  {
    user: User,           // من Supabase Auth
    role: Role,           // من جدول users
    profile: Profile,     // من جدول profiles (للنائب/المرشح)
    loading: boolean,
    error: string | null
  }
  ```
- [ ] دالة `checkRole(allowedRoles: Role[])` للتحقق من الصلاحيات

**الملفات:**
- `contexts/AuthContext.tsx` (جديد)
- `hooks/useAuth.ts` (جديد)
- `lib/auth.ts` (جديد - دوال مساعدة)

---

### v1.2.3 - صفحة تسجيل الدخول

**المسار:** `/login`  
**الملف:** `app/login/page.tsx`

**المتطلبات:**
- [ ] **يجب أن تحتوي على Header و Footer**
- [ ] **يجب استخدام خط Tajawal**
- [ ] نموذج بسيط:
  - البريد الإلكتروني
  - كلمة المرور
  - زر "تسجيل الدخول" (أخضر)
- [ ] رابط "نسيت كلمة المرور؟"
- [ ] رابط "إنشاء حساب جديد"
- [ ] رسائل خطأ واضحة باللغة العربية
- [ ] Redirect حسب نوع المستخدم بعد الدخول:
  - Citizen → `/citizen`
  - MP/Candidate → `/mp`
  - Manager → `/manager`
  - Admin → `/admin`

**الربط بقاعدة البيانات:**
- [ ] استخدام `supabase.auth.signInWithPassword()`
- [ ] جلب `role_id` من جدول `users`
- [ ] Redirect إلى اللوحة المناسبة

**الملفات:**
- `app/login/page.tsx` (جديد)
- `components/auth/LoginForm.tsx` (جديد)

**ملاحظات مهمة:**
- ⚠️ **صفحات المصادقة كلها بدون هيدر وفوتر حالياً - يجب إضافتهما**
- ⚠️ **يجب استخدام خط Tajawal في صفحات المصادقة**

---

### v1.2.4 - صفحة التسجيل

**المسار:** `/register`  
**الملف:** `app/register/page.tsx`

**المتطلبات:**
- [ ] **يجب أن تحتوي على Header و Footer**
- [ ] **يجب استخدام خط Tajawal**
- [ ] اختيار نوع الحساب (Tabs):
  - مواطن
  - نائب
  - مرشح

#### نموذج المواطن:
- [ ] الاسم الأول
- [ ] الاسم الأخير
- [ ] البريد الإلكتروني
- [ ] كلمة المرور
- [ ] تأكيد كلمة المرور
- [ ] تاريخ الميلاد
- [ ] الجنس (ذكر/أنثى)
- [ ] المحافظة
- [ ] المدينة/القرية
- [ ] رقم الهاتف
- [ ] رقم الواتساب
- [ ] الوظيفة
- [ ] رفع الصورة الشخصية (اختياري)
- [ ] الموافقة على الشروط والأحكام

#### نموذج النائب/المرشح (إضافة للحقول السابقة):
- [ ] المجلس (نواب/شيوخ)
- [ ] الحزب أو مستقل
- [ ] الرمز الانتخابي
- [ ] الرقم الانتخابي
- [ ] الدائرة
- [ ] اللجنة

**الربط بقاعدة البيانات:**
- [ ] إنشاء حساب في `supabase.auth.signUp()`
- [ ] إضافة سجل في `users`
- [ ] إضافة سجل في `profiles` (للنائب/المرشح)
- [ ] رفع الصورة إلى `Storage` (bucket: `avatars`)
- [ ] للنائب/المرشح: `is_approved = false` (يحتاج موافقة الأدمن)

**الملفات:**
- `app/register/page.tsx` (جديد)
- `components/auth/RegisterForm.tsx` (جديد)
- `components/auth/CitizenForm.tsx` (جديد)
- `components/auth/MPCandidateForm.tsx` (جديد)

**ملاحظات مهمة:**
- ⚠️ **يجب إضافة Header و Footer**
- ⚠️ **يجب استخدام خط Tajawal**

---

### v1.2.5 - صفحة استرجاع كلمة المرور

**المسار:** `/forgot-password`  
**الملف:** `app/forgot-password/page.tsx`

**المتطلبات:**
- [ ] **يجب أن تحتوي على Header و Footer**
- [ ] **يجب استخدام خط Tajawal**
- [ ] نموذج إدخال البريد الإلكتروني
- [ ] زر "إرسال رابط الاسترجاع"
- [ ] رسالة نجاح بعد الإرسال

**المسار:** `/reset-password`  
**الملف:** `app/reset-password/page.tsx`

**المتطلبات:**
- [ ] نموذج إدخال كلمة المرور الجديدة
- [ ] تأكيد كلمة المرور
- [ ] زر "تغيير كلمة المرور"

**الربط بقاعدة البيانات:**
- [ ] استخدام `supabase.auth.resetPasswordForEmail()`
- [ ] استخدام `supabase.auth.updateUser()`

**الملفات:**
- `app/forgot-password/page.tsx` (جديد)
- `app/reset-password/page.tsx` (جديد)

**ملاحظات مهمة:**
- ⚠️ **يجب إضافة Header و Footer**
- ⚠️ **يجب استخدام خط Tajawal**

---

### v1.2.6 - Middleware للحماية

**الملف:** `middleware.ts`

**المتطلبات:**
- [ ] حماية المسارات الخاصة
- [ ] التحقق من الدور (Role-based Access)
- [ ] Redirect للمستخدمين غير المصرح لهم

**قائمة المسارات المحمية:**
```typescript
const protectedRoutes = {
  '/citizen/*': ['Citizen'],
  '/mp/*': ['MP', 'Candidate'],
  '/manager/*': ['Manager'],
  '/admin/*': ['Admin']
}
```

**الملفات:**
- `middleware.ts` (جديد)

---

## 🌐 v1.3.0 - الصفحات العامة

**الأولوية:** 🔴 عالية  
**التقدير:** 4-5 أيام  
**الحالة:** ⏳ معلق

### v1.3.1 - صفحة الهبوط (Landing Page)

**المسار:** `/`  
**الملف:** `app/page.tsx`

**المتطلبات:**
- [ ] Header
- [ ] Banner (البانر الافتراضي `sisi-banner.jpg`)
- [ ] NewsBar
- [ ] **لوجو كبير في الوسط** (أخضر)
- [ ] نص تعريفي:
  > "منصة نائبك منصة تفاعلية رقمية تتيح التواصل بين المواطن والنائب أو المرشح في مجلسي الشيوخ والنواب."
- [ ] **3 بطاقات بيضاء بظلال:**
  - المواطن (أيقونة + نص)
  - النائب (أيقونة + نص)
  - المرشح (أيقونة + نص)
- [ ] **3 أيقونات للتفاعلات:**
  - إرسال رسالة
  - تسجيل شكوى
  - تقييم نائب أو مرشح
- [ ] **زران:**
  - "تسجيل شكوى" (برتقالي #e86202)
  - "تسجيل دخول" (أخضر #004705)
- [ ] Footer

**الربط بقاعدة البيانات:**
- [ ] جلب البانر الافتراضي من `banners_public`
- [ ] جلب إحصاءات عامة:
  - عدد النواب
  - عدد المرشحين
  - عدد الشكاوى المحلولة

**الملفات:**
- `app/page.tsx` (تحديث)
- `components/home/HeroSection.tsx` (جديد)
- `components/home/RoleCards.tsx` (جديد)
- `components/home/InteractionIcons.tsx` (جديد)
- `components/home/CTAButtons.tsx` (جديد)

---

### v1.3.2 - صفحة من نحن

**المسار:** `/about`  
**الملف:** `app/about/page.tsx`

**المتطلبات:**
- [ ] Header
- [ ] نص تعريفي شامل عن المنصة
- [ ] الرؤية والرسالة والأهداف
- [ ] Footer

**الربط بقاعدة البيانات:**
- [ ] جلب المحتوى من `settings` (key: `about_content`)

**الملفات:**
- `app/about/page.tsx` (جديد)

---

### v1.3.3 - صفحة اتصل بنا

**المسار:** `/contact`  
**الملف:** `app/contact/page.tsx`

**المتطلبات:**
- [ ] Header
- [ ] عرض بيانات الاتصال:
  - العنوان
  - رقم الهاتف
  - البريد الإلكتروني
- [ ] نموذج إرسال رسالة للأدمن:
  - الاسم
  - البريد الإلكتروني
  - الموضوع
  - الرسالة
  - زر "إرسال"
- [ ] Footer

**الربط بقاعدة البيانات:**
- [ ] جلب بيانات الاتصال من `settings`:
  - `contact_address`
  - `contact_phone`
  - `contact_email`
- [ ] حفظ الرسالة في `messages`:
  ```sql
  INSERT INTO messages (from_user_id, to_user_id, body, is_approved)
  VALUES (?, admin_id, ?, NULL)
  ```

**الملفات:**
- `app/contact/page.tsx` (جديد)
- `components/contact/ContactForm.tsx` (جديد)

---

### v1.3.4 - صفحة الشروط والأحكام

**المسار:** `/terms`  
**الملف:** `app/terms/page.tsx`

**المتطلبات:**
- [ ] Header
- [ ] عرض نص الشروط والأحكام
- [ ] Footer

**الربط بقاعدة البيانات:**
- [ ] جلب المحتوى من `settings` (key: `terms_content`)

**الملفات:**
- `app/terms/page.tsx` (جديد)

---

### v1.3.5 - صفحة سياسة الخصوصية

**المسار:** `/privacy`  
**الملف:** `app/privacy/page.tsx`

**المتطلبات:**
- [ ] Header
- [ ] عرض نص سياسة الخصوصية
- [ ] Footer

**الربط بقاعدة البيانات:**
- [ ] جلب المحتوى من `settings` (key: `privacy_content`)

**الملفات:**
- `app/privacy/page.tsx` (جديد)

---

### v1.3.6 - صفحة الأسئلة الشائعة

**المسار:** `/faq`  
**الملف:** `app/faq/page.tsx`

**المتطلبات:**
- [ ] Header
- [ ] عرض الأسئلة والأجوبة بشكل Accordion
- [ ] Footer

**الربط بقاعدة البيانات:**
- [ ] جلب الأسئلة من `settings`:
  - `faq_1` إلى `faq_10`

**الملفات:**
- `app/faq/page.tsx` (جديد)
- `components/faq/FAQAccordion.tsx` (جديد)

---

### v1.3.7 - صفحة تصفح النواب

**المسار:** `/mps`  
**الملف:** `app/mps/page.tsx`

**المتطلبات:**
- [ ] Header
- [ ] Banner (حسب المحافظة المختارة)
- [ ] NewsBar
- [ ] **فلاتر:**
  - الاسم (بحث نصي)
  - المحافظة
  - المجلس
  - الجنس
  - الحزب
  - التقييم (من - إلى)
- [ ] **عرض الكروت (Grid):**
  - صورة النائب
  - الاسم
  - المحافظة والدائرة
  - الحزب
  - الرمز الانتخابي
  - الرقم الانتخابي
  - التقييم (نجوم + عدد المقيمين)
  - زر "إرسال رسالة" (برتقالي)
  - زر "عرض الملف الشخصي" (أخضر)
- [ ] Pagination (20 كارت لكل صفحة)
- [ ] Footer

**الربط بقاعدة البيانات:**
```sql
SELECT u.*, p.*, g.name as governorate, c.name as council, 
       pa.name as party, s.name as symbol,
       AVG(r.stars) as avg_rating, COUNT(r.id) as rating_count
FROM users u
JOIN profiles p ON u.id = p.user_id
JOIN governorates g ON u.governorate_id = g.id
JOIN councils c ON p.council_id = c.id
LEFT JOIN parties pa ON p.party_id = pa.id
LEFT JOIN symbols s ON p.electoral_symbol_id = s.id
LEFT JOIN ratings r ON u.id = r.target_user_id
WHERE u.role_id = (SELECT id FROM roles WHERE name = 'MP')
  AND u.is_approved = true
GROUP BY u.id
ORDER BY avg_rating DESC
LIMIT 20 OFFSET ?
```

**الملفات:**
- `app/mps/page.tsx` (جديد)
- `components/mps/MPFilters.tsx` (جديد)
- `components/mps/MPCard.tsx` (جديد)
- `components/mps/MPGrid.tsx` (جديد)

---

### v1.3.8 - صفحة تصفح المرشحين

**المسار:** `/candidates`  
**الملف:** `app/candidates/page.tsx`

**المتطلبات:**
- [ ] نفس متطلبات صفحة النواب
- [ ] الفرق: `role_id = Candidate`

**الملفات:**
- `app/candidates/page.tsx` (جديد)
- (استخدام نفس المكونات من صفحة النواب)

---

### v1.3.9 - صفحة الشكاوى العامة

**المسار:** `/complaints`  
**الملف:** `app/complaints/page.tsx`

**المتطلبات:**
- [ ] Header
- [ ] Banner (حسب المحافظة)
- [ ] NewsBar
- [ ] **فلاتر:**
  - المحافظة
  - نوع الشكوى
  - الحالة
- [ ] **عرض الشكاوى (Cards):**
  - عنوان الشكوى
  - نص الشكوى (مختصر - أول 200 حرف)
  - المحافظة
  - النوع
  - الحالة (Badge ملون)
  - تاريخ الإرسال
  - اسم المواطن (أو "مجهول" إذا لم يوافق)
  - زر "عرض التفاصيل"
- [ ] Pagination (10 شكاوى لكل صفحة)
- [ ] Footer

**الربط بقاعدة البيانات:**
```sql
SELECT c.*, u.first_name, u.last_name, g.name as governorate, ct.name as type
FROM complaints c
LEFT JOIN users u ON c.citizen_id = u.id
JOIN governorates g ON c.governorate_id = g.id
JOIN complaint_types ct ON c.type_id = ct.id
WHERE c.agree_publish_public = true
ORDER BY c.created_at DESC
LIMIT 10 OFFSET ?
```

**الملفات:**
- `app/complaints/page.tsx` (جديد)
- `components/complaints/ComplaintFilters.tsx` (جديد)
- `components/complaints/ComplaintCard.tsx` (جديد)

---

### v1.3.10 - صفحة تفاصيل الشكوى العامة

**المسار:** `/complaints/[id]`  
**الملف:** `app/complaints/[id]/page.tsx`

**المتطلبات:**
- [ ] Header
- [ ] عرض تفاصيل الشكوى كاملة:
  - العنوان
  - النص الكامل
  - المحافظة
  - النوع
  - الحالة
  - تاريخ الإرسال
  - اسم المواطن (أو "مجهول")
- [ ] المرفقات (إن وجدت) - عرض الصور والملفات
- [ ] سجل الردود والتعليقات
- [ ] نموذج إضافة تعليق (للمواطنين والنواب المسجلين)
- [ ] Footer

**الربط بقاعدة البيانات:**
```sql
-- الشكوى
SELECT * FROM complaints WHERE id = ? AND agree_publish_public = true

-- المرفقات
SELECT * FROM complaint_attachments WHERE complaint_id = ?

-- الردود
SELECT ca.*, u.first_name, u.last_name, r.name as role
FROM complaint_actions ca
JOIN users u ON ca.actor_user_id = u.id
JOIN roles r ON u.role_id = r.id
WHERE ca.complaint_id = ?
ORDER BY ca.created_at ASC
```

**الملفات:**
- `app/complaints/[id]/page.tsx` (جديد)
- `components/complaints/ComplaintDetails.tsx` (جديد)
- `components/complaints/ComplaintAttachments.tsx` (جديد)
- `components/complaints/ComplaintActions.tsx` (جديد)
- `components/complaints/CommentForm.tsx` (جديد)

---

### v1.3.11 - صفحة الملف الشخصي للنائب/المرشح (عامة)

**المسار:** `/profile/[id]`  
**الملف:** `app/profile/[id]/page.tsx`

**المتطلبات:**
- [ ] Header
- [ ] **صورة البانر الشخصي** (من `banners_profile`)
- [ ] **الصورة الشخصية** (دائرية، فوق البانر)
- [ ] **المعلومات الأساسية:**
  - الاسم
  - المحافظة
  - الحزب
  - المجلس
  - الدائرة
  - اللجنة
- [ ] **Tabs:**
  - عنّي (البيانات الأساسية)
  - الإنجازات
  - المناسبات
  - البرنامج الانتخابي
  - التقييم
- [ ] **زر "إرسال رسالة"** (برتقالي، ثابت في الأعلى)
- [ ] Footer

**الربط بقاعدة البيانات:**
```sql
-- بيانات المستخدم
SELECT u.*, p.*, g.name as governorate, c.name as council,
       pa.name as party, s.name as symbol
FROM users u
JOIN profiles p ON u.id = p.user_id
JOIN governorates g ON u.governorate_id = g.id
JOIN councils c ON p.council_id = c.id
LEFT JOIN parties pa ON p.party_id = pa.id
LEFT JOIN symbols s ON p.electoral_symbol_id = s.id
WHERE u.id = ?

-- البانر الشخصي
SELECT * FROM banners_profile WHERE user_id = ? ORDER BY created_at DESC LIMIT 1

-- المحتوى (حسب النوع)
SELECT * FROM contents 
WHERE user_id = ? AND type = ? AND is_approved = true
ORDER BY created_at DESC

-- التقييمات
SELECT AVG(stars) as avg_rating, COUNT(*) as rating_count
FROM ratings
WHERE target_user_id = ?
```

**الملفات:**
- `app/profile/[id]/page.tsx` (جديد)
- `components/profile/ProfileHeader.tsx` (جديد)
- `components/profile/ProfileBanner.tsx` (جديد)
- `components/profile/ProfileTabs.tsx` (جديد)
- `components/profile/AboutTab.tsx` (جديد)
- `components/profile/AchievementsTab.tsx` (جديد)
- `components/profile/EventsTab.tsx` (جديد)
- `components/profile/ProgramTab.tsx` (جديد)
- `components/profile/RatingTab.tsx` (جديد)

---

## 👤 v1.4.0 - لوحة تحكم المواطن

**الأولوية:** 🟡 متوسطة  
**التقدير:** 3-4 أيام  
**الحالة:** ⏳ معلق

### v1.4.1 - Layout لوحة المواطن

**المسار:** `/citizen`  
**الملف:** `app/citizen/layout.tsx`

**المتطلبات:**
- [ ] Sidebar + المحتوى الرئيسي
- [ ] عناصر Sidebar:
  - لوحة المعلومات
  - بياناتي
  - رسائلي
  - شكاواي
  - تقييماتي

**الملفات:**
- `app/citizen/layout.tsx` (جديد)

---

### v1.4.2 - لوحة المعلومات

**المسار:** `/citizen`  
**الملف:** `app/citizen/page.tsx`

**المتطلبات:**
- [ ] **إحصاءات سريعة (Cards):**
  - عدد الرسائل (الوارد/الصادر)
  - عدد الشكاوى (حسب الحالة)
  - عدد التقييمات المضافة
- [ ] **آخر الرسائل** (5 رسائل)
- [ ] **آخر الشكاوى** (5 شكاوى)

**الربط بقاعدة البيانات:**
```sql
-- إحصاءات
SELECT 
  (SELECT COUNT(*) FROM messages WHERE from_user_id = ?) as sent_messages,
  (SELECT COUNT(*) FROM messages WHERE to_user_id = ?) as received_messages,
  (SELECT COUNT(*) FROM complaints WHERE citizen_id = ?) as total_complaints,
  (SELECT COUNT(*) FROM ratings WHERE rater_user_id = ?) as total_ratings
```

**الملفات:**
- `app/citizen/page.tsx` (جديد)
- `components/citizen/StatsCards.tsx` (جديد)
- `components/citizen/RecentMessages.tsx` (جديد)
- `components/citizen/RecentComplaints.tsx` (جديد)

---

### v1.4.3 - صفحة بياناتي

**المسار:** `/citizen/profile`  
**الملف:** `app/citizen/profile/page.tsx`

**المتطلبات:**
- [ ] عرض البيانات الحالية
- [ ] نموذج التعديل:
  - الاسم الأول
  - الاسم الأخير
  - تاريخ الميلاد
  - الجنس
  - المحافظة
  - المدينة/القرية
  - رقم الهاتف
  - رقم الواتساب
  - الوظيفة
- [ ] رفع/تغيير الصورة الشخصية
- [ ] زر "حفظ التغييرات"

**الربط بقاعدة البيانات:**
```sql
UPDATE users 
SET first_name = ?, last_name = ?, dob = ?, gender = ?,
    governorate_id = ?, city = ?, village = ?, phone = ?,
    whatsapp = ?, job_title = ?, avatar = ?, updated_at = NOW()
WHERE id = ?
```

**الملفات:**
- `app/citizen/profile/page.tsx` (جديد)
- `components/citizen/ProfileForm.tsx` (جديد)

---

### v1.4.4 - صفحة الرسائل

**المسار:** `/citizen/messages`  
**الملف:** `app/citizen/messages/page.tsx`

**المتطلبات:**
- [ ] **Tabs:**
  - الوارد
  - الصادر
- [ ] **جدول الرسائل:**
  - من/إلى
  - نص الرسالة (مختصر - أول 50 حرف)
  - الحالة (معلق/مقبول/مرفوض)
  - التاريخ
  - زر "عرض"
- [ ] زر "رسالة جديدة" (أخضر)
- [ ] Pagination (20 رسالة لكل صفحة)

**الربط بقاعدة البيانات:**
```sql
-- الوارد
SELECT m.*, u.first_name, u.last_name
FROM messages m
JOIN users u ON m.from_user_id = u.id
WHERE m.to_user_id = ?
ORDER BY m.created_at DESC
LIMIT 20 OFFSET ?

-- الصادر
SELECT m.*, u.first_name, u.last_name
FROM messages m
JOIN users u ON m.to_user_id = u.id
WHERE m.from_user_id = ?
ORDER BY m.created_at DESC
LIMIT 20 OFFSET ?
```

**الملفات:**
- `app/citizen/messages/page.tsx` (جديد)
- `components/citizen/MessagesTabs.tsx` (جديد)
- `components/citizen/MessagesTable.tsx` (جديد)

---

### v1.4.5 - صفحة إرسال رسالة جديدة

**المسار:** `/citizen/messages/new`  
**الملف:** `app/citizen/messages/new/page.tsx`

**المتطلبات:**
- [ ] اختيار المستلم (نائب أو مرشح) - Select مع بحث
- [ ] نص الرسالة (Textarea - 500 حرف كحد أقصى)
- [ ] عداد الأحرف المتبقية
- [ ] زر "إرسال" (أخضر)
- [ ] رسالة تنبيه: "الرسالة تحتاج موافقة الأدمن قبل الإرسال"

**الربط بقاعدة البيانات:**
```sql
INSERT INTO messages (from_user_id, to_user_id, body, is_approved, created_at)
VALUES (?, ?, ?, false, NOW())
```

**الملفات:**
- `app/citizen/messages/new/page.tsx` (جديد)
- `components/citizen/NewMessageForm.tsx` (جديد)

---

### v1.4.6 - صفحة الشكاوى

**المسار:** `/citizen/complaints`  
**الملف:** `app/citizen/complaints/page.tsx`

**المتطلبات:**
- [ ] **جدول الشكاوى:**
  - العنوان
  - النوع
  - المحافظة
  - الحالة (Badge ملون)
  - المسند إليه
  - التاريخ
  - زر "عرض"
- [ ] زر "شكوى جديدة" (برتقالي)
- [ ] Pagination (10 شكاوى لكل صفحة)

**الربط بقاعدة البيانات:**
```sql
SELECT c.*, ct.name as type, g.name as governorate,
       u.first_name, u.last_name
FROM complaints c
JOIN complaint_types ct ON c.type_id = ct.id
JOIN governorates g ON c.governorate_id = g.id
LEFT JOIN users u ON c.assigned_to = u.id
WHERE c.citizen_id = ?
ORDER BY c.created_at DESC
LIMIT 10 OFFSET ?
```

**الملفات:**
- `app/citizen/complaints/page.tsx` (جديد)
- `components/citizen/ComplaintsTable.tsx` (جديد)

---

### v1.4.7 - صفحة إرسال شكوى جديدة

**المسار:** `/citizen/complaints/new`  
**الملف:** `app/citizen/complaints/new/page.tsx`

**المتطلبات:**
- [ ] العنوان (Input - 100 حرف)
- [ ] نص الشكوى (Textarea - 1500 حرف)
- [ ] نوع الشكوى (Select)
- [ ] المحافظة (Select)
- [ ] رفع مرفقات (حتى 10 ملفات - صور أو PDF)
- [ ] Checkbox: "أوافق على النشر العام"
- [ ] زر "إرسال" (برتقالي)

**الربط بقاعدة البيانات:**
```sql
-- الشكوى
INSERT INTO complaints (citizen_id, title, body, type_id, governorate_id, 
                        agree_publish_public, status, created_at)
VALUES (?, ?, ?, ?, ?, ?, 'new', NOW())

-- المرفقات
INSERT INTO complaint_attachments (complaint_id, file_path)
VALUES (?, ?)
```

**الملفات:**
- `app/citizen/complaints/new/page.tsx` (جديد)
- `components/citizen/NewComplaintForm.tsx` (جديد)

---

### v1.4.8 - صفحة تفاصيل الشكوى

**المسار:** `/citizen/complaints/[id]`  
**الملف:** `app/citizen/complaints/[id]/page.tsx`

**المتطلبات:**
- [ ] عرض تفاصيل الشكوى
- [ ] المرفقات (عرض الصور والملفات)
- [ ] سجل الإجراءات والردود (Timeline)
- [ ] نموذج الرد (إذا كانت الحالة تسمح)

**الربط بقاعدة البيانات:**
```sql
-- الشكوى
SELECT * FROM complaints WHERE id = ? AND citizen_id = ?

-- المرفقات
SELECT * FROM complaint_attachments WHERE complaint_id = ?

-- الإجراءات
SELECT ca.*, u.first_name, u.last_name, r.name as role
FROM complaint_actions ca
JOIN users u ON ca.actor_user_id = u.id
JOIN roles r ON u.role_id = r.id
WHERE ca.complaint_id = ?
ORDER BY ca.created_at ASC
```

**الملفات:**
- `app/citizen/complaints/[id]/page.tsx` (جديد)
- `components/citizen/ComplaintDetailsView.tsx` (جديد)
- `components/citizen/ComplaintTimeline.tsx` (جديد)

---

### v1.4.9 - صفحة التقييمات

**المسار:** `/citizen/ratings`  
**الملف:** `app/citizen/ratings/page.tsx`

**المتطلبات:**
- [ ] **جدول التقييمات:**
  - اسم النائب/المرشح
  - التقييم (نجوم)
  - التاريخ
  - زر "تعديل"
- [ ] زر "تقييم جديد" (أخضر)
- [ ] Pagination

**الربط بقاعدة البيانات:**
```sql
SELECT r.*, u.first_name, u.last_name
FROM ratings r
JOIN users u ON r.target_user_id = u.id
WHERE r.rater_user_id = ?
ORDER BY r.created_at DESC
LIMIT 20 OFFSET ?
```

**الملفات:**
- `app/citizen/ratings/page.tsx` (جديد)
- `components/citizen/RatingsTable.tsx` (جديد)

---

### v1.4.10 - صفحة إضافة تقييم

**المسار:** `/citizen/ratings/new`  
**الملف:** `app/citizen/ratings/new/page.tsx`

**المتطلبات:**
- [ ] اختيار النائب/المرشح (Select مع بحث)
- [ ] اختيار عدد النجوم (1-5) - مكون RatingStars
- [ ] زر "حفظ" (أخضر)
- [ ] التحقق من عدم وجود تقييم سابق لنفس النائب

**الربط بقاعدة البيانات:**
```sql
-- التحقق
SELECT COUNT(*) FROM ratings 
WHERE rater_user_id = ? AND target_user_id = ?

-- الإضافة
INSERT INTO ratings (rater_user_id, target_user_id, stars, created_at)
VALUES (?, ?, ?, NOW())
```

**الملفات:**
- `app/citizen/ratings/new/page.tsx` (جديد)
- `components/citizen/NewRatingForm.tsx` (جديد)

---

## 🎖️ v1.5.0 - لوحة تحكم النائب/المرشح

**الأولوية:** 🔴 عالية  
**التقدير:** 5-6 أيام  
**الحالة:** ⏳ معلق

### v1.5.1 - Layout لوحة النائب/المرشح

**المسار:** `/mp`  
**الملف:** `app/mp/layout.tsx`

**المتطلبات:**
- [ ] Sidebar + المحتوى الرئيسي
- [ ] عناصر Sidebar:
  - لوحة المعلومات
  - بياناتي
  - رسائلي
  - شكاواي
  - إنجازاتي
  - مناسباتي
  - برنامجي الانتخابي
  - بانري الشخصي
  - نقاطي

**الملفات:**
- `app/mp/layout.tsx` (جديد)

---

### v1.5.2 - لوحة المعلومات

**المسار:** `/mp`  
**الملف:** `app/mp/page.tsx`

**المتطلبات:**
- [ ] **إحصاءات (Cards):**
  - عدد الرسائل
  - عدد الشكاوى المسندة
  - النقاط المكتسبة
  - متوسط التقييم
- [ ] **آخر الرسائل** (5 رسائل)
- [ ] **آخر الشكاوى** (5 شكاوى)

**الربط بقاعدة البيانات:**
```sql
SELECT 
  (SELECT COUNT(*) FROM messages WHERE to_user_id = ?) as received_messages,
  (SELECT COUNT(*) FROM complaints WHERE assigned_to = ?) as assigned_complaints,
  (SELECT SUM(points_awarded) FROM complaints WHERE assigned_to = ?) as total_points,
  (SELECT AVG(stars) FROM ratings WHERE target_user_id = ?) as avg_rating
```

**الملفات:**
- `app/mp/page.tsx` (جديد)
- `components/mp/MPStatsCards.tsx` (جديد)

---

### v1.5.3 - صفحة بياناتي

**المسار:** `/mp/profile`  
**الملف:** `app/mp/profile/page.tsx`

**المتطلبات:**
- [ ] عرض البيانات من `users` + `profiles`
- [ ] نموذج التعديل (جميع الحقول)
- [ ] رفع/تغيير الصورة الشخصية
- [ ] **ملاحظة:** التعديلات تحتاج موافقة الأدمن
- [ ] رسالة تنبيه: "التعديلات ستُرسل للأدمن للموافقة"
- [ ] زر "حفظ التغييرات"

**الربط بقاعدة البيانات:**
```sql
-- إنشاء طلب موافقة
INSERT INTO approval_requests (user_id, type, data, status, created_at)
VALUES (?, 'profile_update', ?, 'pending', NOW())
```

**الملفات:**
- `app/mp/profile/page.tsx` (جديد)
- `components/mp/MPProfileForm.tsx` (جديد)

---

### v1.5.4 - صفحة الرسائل

**المسار:** `/mp/messages`  
**الملف:** `app/mp/messages/page.tsx`

**المتطلبات:**
- [ ] نفس متطلبات صفحة رسائل المواطن
- [ ] إمكانية الرد على الرسائل
- [ ] الرد أيضاً يحتاج موافقة الأدمن

**الملفات:**
- `app/mp/messages/page.tsx` (جديد)
- (استخدام نفس المكونات من لوحة المواطن)

---

### v1.5.5 - صفحة الشكاوى المسندة

**المسار:** `/mp/complaints`  
**الملف:** `app/mp/complaints/page.tsx`

**المتطلبات:**
- [ ] **جدول الشكاوى:**
  - العنوان
  - النوع
  - المواطن
  - الحالة (Badge ملون)
  - تاريخ الإسناد
  - تاريخ الاستحقاق
  - النقاط المحتملة
  - زر "عرض والرد"
- [ ] **فلاتر حسب الحالة:**
  - الكل
  - جديدة
  - قيد المعالجة
  - معلقة
  - محلولة
- [ ] Pagination (10 شكاوى لكل صفحة)

**الربط بقاعدة البيانات:**
```sql
SELECT c.*, u.first_name, u.last_name, ct.name as type, g.name as governorate
FROM complaints c
JOIN users u ON c.citizen_id = u.id
JOIN complaint_types ct ON c.type_id = ct.id
JOIN governorates g ON c.governorate_id = g.id
WHERE c.assigned_to = ?
ORDER BY c.due_date ASC, c.created_at DESC
LIMIT 10 OFFSET ?
```

**الملفات:**
- `app/mp/complaints/page.tsx` (جديد)
- `components/mp/AssignedComplaintsTable.tsx` (جديد)

---

### v1.5.6 - صفحة تفاصيل الشكوى والرد

**المسار:** `/mp/complaints/[id]`  
**الملف:** `app/mp/complaints/[id]/page.tsx`

**المتطلبات:**
- [ ] عرض تفاصيل الشكوى
- [ ] المرفقات
- [ ] سجل الإجراءات (Timeline)
- [ ] **نموذج الرد:**
  - نص الرد (Textarea)
  - تغيير الحالة (Select):
    - قبول
    - رفض
    - تعليق
    - حل
  - تاريخ التعليق (إذا اختار "تعليق")
- [ ] زر "إرسال الرد" (أخضر)

**الربط بقاعدة البيانات:**
```sql
-- إضافة إجراء
INSERT INTO complaint_actions (complaint_id, actor_user_id, action, note, created_at)
VALUES (?, ?, ?, ?, NOW())

-- تحديث حالة الشكوى
UPDATE complaints 
SET status = ?, hold_until = ?, updated_at = NOW()
WHERE id = ?
```

**الملفات:**
- `app/mp/complaints/[id]/page.tsx` (جديد)
- `components/mp/ComplaintResponseForm.tsx` (جديد)

---

### v1.5.7 - صفحة الإنجازات

**المسار:** `/mp/achievements`  
**الملف:** `app/mp/achievements/page.tsx`

**المتطلبات:**
- [ ] **جدول الإنجازات:**
  - العنوان
  - الحالة (معلق/مقبول/مرفوض)
  - التاريخ
  - زر "عرض/تعديل"
- [ ] زر "إضافة إنجاز" (أخضر)
- [ ] Pagination

**الربط بقاعدة البيانات:**
```sql
SELECT * FROM contents
WHERE user_id = ? AND type = 'achievement'
ORDER BY created_at DESC
LIMIT 10 OFFSET ?
```

**الملفات:**
- `app/mp/achievements/page.tsx` (جديد)
- `components/mp/AchievementsTable.tsx` (جديد)

---

### v1.5.8 - صفحة إضافة/تعديل إنجاز

**المسار:** `/mp/achievements/new`  
**الملف:** `app/mp/achievements/new/page.tsx`

**المتطلبات:**
- [ ] العنوان (Input - 100 حرف)
- [ ] النص (Textarea - 500 حرف)
- [ ] رفع صورة (اختياري)
- [ ] زر "حفظ" (أخضر)
- [ ] رسالة تنبيه: "الإنجاز يحتاج موافقة الأدمن قبل النشر"

**الربط بقاعدة البيانات:**
```sql
INSERT INTO contents (user_id, type, title, body, image_path, is_approved, created_at)
VALUES (?, 'achievement', ?, ?, ?, false, NOW())
```

**الملفات:**
- `app/mp/achievements/new/page.tsx` (جديد)
- `app/mp/achievements/[id]/edit/page.tsx` (جديد)
- `components/mp/AchievementForm.tsx` (جديد)

---

### v1.5.9 - صفحة المناسبات

**المسار:** `/mp/events`  
**الملف:** `app/mp/events/page.tsx`

**المتطلبات:**
- [ ] نفس متطلبات صفحة الإنجازات
- [ ] `type = 'event'`

**الملفات:**
- `app/mp/events/page.tsx` (جديد)
- `app/mp/events/new/page.tsx` (جديد)
- `app/mp/events/[id]/edit/page.tsx` (جديد)
- (استخدام نفس المكونات من الإنجازات)

---

### v1.5.10 - صفحة البرنامج الانتخابي

**المسار:** `/mp/program`  
**الملف:** `app/mp/program/page.tsx`

**المتطلبات:**
- [ ] نفس متطلبات صفحة الإنجازات
- [ ] `type = 'program'`

**الملفات:**
- `app/mp/program/page.tsx` (جديد)
- `app/mp/program/new/page.tsx` (جديد)
- `app/mp/program/[id]/edit/page.tsx` (جديد)
- (استخدام نفس المكونات من الإنجازات)

---

### v1.5.11 - صفحة البانر الشخصي

**المسار:** `/mp/banner`  
**الملف:** `app/mp/banner/page.tsx`

**المتطلبات:**
- [ ] عرض البانر الحالي (إن وجد)
- [ ] زر "رفع بانر جديد"
- [ ] معاينة قبل الحفظ
- [ ] **ملاحظة:** لا يحتاج موافقة الأدمن (يُنشر مباشرة)
- [ ] زر "حفظ" (أخضر)

**الربط بقاعدة البيانات:**
```sql
-- جلب البانر الحالي
SELECT * FROM banners_profile WHERE user_id = ? ORDER BY created_at DESC LIMIT 1

-- رفع بانر جديد
INSERT INTO banners_profile (user_id, image_path, created_at)
VALUES (?, ?, NOW())
```

**الملفات:**
- `app/mp/banner/page.tsx` (جديد)
- `components/mp/BannerUpload.tsx` (جديد)

---

### v1.5.12 - صفحة النقاط

**المسار:** `/mp/points`  
**الملف:** `app/mp/points/page.tsx`

**المتطلبات:**
- [ ] عرض إجمالي النقاط (Card كبير)
- [ ] **جدول تفصيلي:**
  - عنوان الشكوى
  - النقاط المكتسبة
  - التاريخ
- [ ] **رسم بياني** للنقاط عبر الوقت (Line Chart)
- [ ] Pagination

**الربط بقاعدة البيانات:**
```sql
-- إجمالي النقاط
SELECT SUM(points_awarded) as total_points
FROM complaints
WHERE assigned_to = ?

-- تفاصيل النقاط
SELECT title, points_awarded, updated_at
FROM complaints
WHERE assigned_to = ? AND points_awarded > 0
ORDER BY updated_at DESC
LIMIT 20 OFFSET ?
```

**الملفات:**
- `app/mp/points/page.tsx` (جديد)
- `components/mp/PointsChart.tsx` (جديد)
- `components/mp/PointsTable.tsx` (جديد)

---

## 👔 v1.6.0 - لوحة تحكم المدير

**الأولوية:** 🟡 متوسطة  
**التقدير:** 3-4 أيام  
**الحالة:** ⏳ معلق

### v1.6.1 - Layout لوحة المدير

**المسار:** `/manager`  
**الملف:** `app/manager/layout.tsx`

**المتطلبات:**
- [ ] Sidebar + المحتوى الرئيسي
- [ ] عناصر Sidebar:
  - لوحة المعلومات
  - إنشاء حساب نائب/مرشح
  - إدارة الحسابات
  - طلبات الموافقات

**الملفات:**
- `app/manager/layout.tsx` (جديد)

---

### v1.6.2 - لوحة المعلومات

**المسار:** `/manager`  
**الملف:** `app/manager/page.tsx`

**المتطلبات:**
- [ ] **إحصاءات:**
  - عدد النواب
  - عدد المرشحين
  - عدد الطلبات المعلقة

**الملفات:**
- `app/manager/page.tsx` (جديد)

---

### v1.6.3 - صفحة إنشاء حساب نائب/مرشح

**المسار:** `/manager/accounts/new`  
**الملف:** `app/manager/accounts/new/page.tsx`

**المتطلبات:**
- [ ] نموذج كامل لإنشاء الحساب
- [ ] نفس حقول صفحة التسجيل
- [ ] إرسال للأدمن للموافقة
- [ ] زر "إنشاء الحساب" (أخضر)

**الربط بقاعدة البيانات:**
```sql
-- إنشاء المستخدم
INSERT INTO users (...) VALUES (...)

-- إنشاء الملف الشخصي
INSERT INTO profiles (...) VALUES (...)

-- إنشاء طلب موافقة
INSERT INTO approval_requests (user_id, type, status, created_at)
VALUES (?, 'account_creation', 'pending', NOW())
```

**الملفات:**
- `app/manager/accounts/new/page.tsx` (جديد)
- `components/manager/CreateAccountForm.tsx` (جديد)

---

### v1.6.4 - صفحة إدارة الحسابات

**المسار:** `/manager/accounts`  
**الملف:** `app/manager/accounts/page.tsx`

**المتطلبات:**
- [ ] **جدول الحسابات:**
  - الاسم
  - النوع (نائب/مرشح)
  - المحافظة
  - الحزب
  - الحالة (نشط/معلق/مرفوض)
  - زر "تعديل"
- [ ] بحث وفلاتر
- [ ] Pagination (20 حساب لكل صفحة)
- [ ] **لا يمكن الحذف**

**الربط بقاعدة البيانات:**
```sql
SELECT u.*, p.*, g.name as governorate, pa.name as party
FROM users u
JOIN profiles p ON u.id = p.user_id
JOIN governorates g ON u.governorate_id = g.id
LEFT JOIN parties pa ON p.party_id = pa.id
WHERE u.role_id IN (
  SELECT id FROM roles WHERE name IN ('MP', 'Candidate')
)
ORDER BY u.created_at DESC
LIMIT 20 OFFSET ?
```

**الملفات:**
- `app/manager/accounts/page.tsx` (جديد)
- `components/manager/AccountsTable.tsx` (جديد)

---

### v1.6.5 - صفحة تعديل حساب

**المسار:** `/manager/accounts/[id]/edit`  
**الملف:** `app/manager/accounts/[id]/edit/page.tsx`

**المتطلبات:**
- [ ] نموذج تعديل البيانات
- [ ] إرسال للأدمن للموافقة
- [ ] **لا يمكن الحذف**
- [ ] زر "حفظ التعديلات" (أخضر)

**الربط بقاعدة البيانات:**
```sql
-- إنشاء طلب موافقة
INSERT INTO approval_requests (user_id, type, data, status, created_at)
VALUES (?, 'account_update', ?, 'pending', NOW())
```

**الملفات:**
- `app/manager/accounts/[id]/edit/page.tsx` (جديد)
- `components/manager/EditAccountForm.tsx` (جديد)

---

### v1.6.6 - صفحة طلبات الموافقات

**المسار:** `/manager/approvals`  
**الملف:** `app/manager/approvals/page.tsx`

**المتطلبات:**
- [ ] **جدول الطلبات:**
  - نوع الطلب (إنشاء/تعديل)
  - الحساب
  - التاريخ
  - الحالة (معلق/مقبول/مرفوض)
  - زر "عرض"
- [ ] Pagination

**الربط بقاعدة البيانات:**
```sql
SELECT ar.*, u.first_name, u.last_name
FROM approval_requests ar
JOIN users u ON ar.user_id = u.id
ORDER BY ar.created_at DESC
LIMIT 20 OFFSET ?
```

**الملفات:**
- `app/manager/approvals/page.tsx` (جديد)
- `components/manager/ApprovalsTable.tsx` (جديد)

---

## 🛡️ v1.7.0 - لوحة تحكم الأدمن

**الأولوية:** 🔴 عالية  
**التقدير:** 6-7 أيام  
**الحالة:** ⏳ معلق

### v1.7.1 - Layout لوحة الأدمن

**المسار:** `/admin`  
**الملف:** `app/admin/layout.tsx`

**المتطلبات:**
- [ ] Sidebar + المحتوى الرئيسي
- [ ] عناصر Sidebar:
  - لوحة المعلومات
  - إدارة البنرات العامة
  - إدارة الشكاوى
  - إدارة الرسائل
  - إدارة المحتوى (موافقات)
  - إدارة المستخدمين
  - إدارة المديرين
  - إدارة التقييمات
  - إدارة الإعدادات
  - إدارة عداد الزوار
  - إدارة الأخبار

**الملفات:**
- `app/admin/layout.tsx` (جديد)

---

### v1.7.2 - لوحة المعلومات

**المسار:** `/admin`  
**الملف:** `app/admin/page.tsx`

**المتطلبات:**
- [ ] **إحصاءات شاملة (Cards):**
  - عدد المستخدمين (حسب النوع)
  - عدد الشكاوى (حسب الحالة)
  - عدد الرسائل المعلقة
  - عدد طلبات الموافقة
  - إجمالي النقاط الممنوحة
- [ ] **رسوم بيانية:**
  - الشكاوى عبر الوقت (Line Chart)
  - الشكاوى حسب المحافظة (Bar Chart)
  - الشكاوى حسب النوع (Pie Chart)
- [ ] **آخر الأنشطة** (Timeline)

**الربط بقاعدة البيانات:**
```sql
-- إحصاءات
SELECT 
  (SELECT COUNT(*) FROM users WHERE role_id = ?) as count_by_role,
  (SELECT COUNT(*) FROM complaints WHERE status = ?) as count_by_status,
  (SELECT COUNT(*) FROM messages WHERE is_approved IS NULL) as pending_messages,
  (SELECT COUNT(*) FROM approval_requests WHERE status = 'pending') as pending_approvals,
  (SELECT SUM(points_awarded) FROM complaints) as total_points
```

**الملفات:**
- `app/admin/page.tsx` (جديد)
- `components/admin/AdminStatsCards.tsx` (جديد)
- `components/admin/AdminCharts.tsx` (جديد)
- `components/admin/RecentActivities.tsx` (جديد)

---

### v1.7.3 - صفحة إدارة البنرات العامة

**المسار:** `/admin/banners`  
**الملف:** `app/admin/banners/page.tsx`

**المتطلبات:**
- [ ] **جدول البنرات:**
  - الصورة (معاينة صغيرة)
  - نوع الصفحة (landing/mps/candidates/complaints)
  - المحافظة (أو "عام")
  - افتراضي؟ (Badge)
  - نشط؟ (Toggle)
  - أزرار (تعديل/حذف/تفعيل)
- [ ] زر "رفع بانر جديد" (أخضر)
- [ ] فلاتر (نوع الصفحة، المحافظة)
- [ ] Pagination

**الربط بقاعدة البيانات:**
```sql
SELECT bp.*, g.name as governorate
FROM banners_public bp
LEFT JOIN governorates g ON bp.governorate_id = g.id
ORDER BY bp.created_at DESC
LIMIT 20 OFFSET ?
```

**الملفات:**
- `app/admin/banners/page.tsx` (جديد)
- `components/admin/BannersTable.tsx` (جديد)

---

### v1.7.4 - صفحة رفع بانر جديد

**المسار:** `/admin/banners/new`  
**الملف:** `app/admin/banners/new/page.tsx`

**المتطلبات:**
- [ ] اختيار نوع الصفحة (Select)
- [ ] اختيار المحافظة (Select - اختياري، "عام" للكل)
- [ ] رفع الصورة (FileUpload)
- [ ] معاينة الصورة
- [ ] Checkbox: "تعيين كافتراضي"
- [ ] Checkbox: "تفعيل مباشرة"
- [ ] زر "حفظ" (أخضر)

**الربط بقاعدة البيانات:**
```sql
INSERT INTO banners_public (page_type, governorate_id, image_path, 
                             uploaded_by, is_default, is_active, created_at)
VALUES (?, ?, ?, ?, ?, ?, NOW())
```

**الملفات:**
- `app/admin/banners/new/page.tsx` (جديد)
- `app/admin/banners/[id]/edit/page.tsx` (جديد)
- `components/admin/BannerForm.tsx` (جديد)

---

### v1.7.5 - صفحة إدارة الشكاوى

**المسار:** `/admin/complaints`  
**الملف:** `app/admin/complaints/page.tsx`

**المتطلبات:**
- [ ] **جدول الشكاوى:**
  - العنوان
  - المواطن
  - النوع
  - المحافظة
  - الحالة (Badge ملون)
  - المسند إليه
  - النقاط
  - التاريخ
  - أزرار (عرض/إسناد/أرشفة/حذف)
- [ ] **فلاتر متقدمة:**
  - المحافظة
  - النوع
  - الحالة
  - المسند إليه
  - تاريخ من - إلى
- [ ] Pagination (20 شكوى لكل صفحة)

**الربط بقاعدة البيانات:**
```sql
SELECT c.*, u1.first_name as citizen_first, u1.last_name as citizen_last,
       u2.first_name as assignee_first, u2.last_name as assignee_last,
       ct.name as type, g.name as governorate
FROM complaints c
JOIN users u1 ON c.citizen_id = u1.id
LEFT JOIN users u2 ON c.assigned_to = u2.id
JOIN complaint_types ct ON c.type_id = ct.id
JOIN governorates g ON c.governorate_id = g.id
ORDER BY c.created_at DESC
LIMIT 20 OFFSET ?
```

**الملفات:**
- `app/admin/complaints/page.tsx` (جديد)
- `components/admin/ComplaintsFilters.tsx` (جديد)
- `components/admin/ComplaintsTable.tsx` (جديد)

---

### v1.7.6 - صفحة تفاصيل الشكوى وإدارتها

**المسار:** `/admin/complaints/[id]`  
**الملف:** `app/admin/complaints/[id]/page.tsx`

**المتطلبات:**
- [ ] عرض تفاصيل الشكوى
- [ ] المرفقات
- [ ] سجل الإجراءات (Timeline)
- [ ] **نموذج الإسناد:**
  - اختيار نائب/مرشح (Select)
  - تحديد تاريخ الاستحقاق (Date Picker)
  - تحديد النقاط المحتملة (Number Input)
  - زر "إسناد" (أخضر)
- [ ] **نموذج تغيير الحالة:**
  - اختيار الحالة الجديدة (Select)
  - ملاحظة (Textarea)
  - زر "تحديث الحالة"
- [ ] **نموذج منح النقاط:**
  - عدد النقاط (Number Input)
  - زر "منح النقاط"
- [ ] زر "أرشفة" (رمادي)
- [ ] زر "حذف" (أحمر)

**الربط بقاعدة البيانات:**
```sql
-- إسناد الشكوى
UPDATE complaints 
SET assigned_to = ?, assigned_by = ?, assigned_at = NOW(), 
    due_date = ?, status = 'assigned'
WHERE id = ?

-- تغيير الحالة
UPDATE complaints SET status = ?, updated_at = NOW() WHERE id = ?

-- منح النقاط
UPDATE complaints SET points_awarded = ?, updated_at = NOW() WHERE id = ?
```

**الملفات:**
- `app/admin/complaints/[id]/page.tsx` (جديد)
- `components/admin/ComplaintManagement.tsx` (جديد)
- `components/admin/AssignComplaintForm.tsx` (جديد)
- `components/admin/ChangeStatusForm.tsx` (جديد)
- `components/admin/AwardPointsForm.tsx` (جديد)

---

### v1.7.7 - صفحة إدارة الرسائل

**المسار:** `/admin/messages`  
**الملف:** `app/admin/messages/page.tsx`

**المتطلبات:**
- [ ] **جدول الرسائل المعلقة:**
  - من
  - إلى
  - نص الرسالة (مختصر)
  - التاريخ
  - أزرار (قبول/رفض)
- [ ] فلاتر
- [ ] Pagination (20 رسالة لكل صفحة)

**الربط بقاعدة البيانات:**
```sql
SELECT m.*, u1.first_name as from_first, u1.last_name as from_last,
       u2.first_name as to_first, u2.last_name as to_last
FROM messages m
JOIN users u1 ON m.from_user_id = u1.id
JOIN users u2 ON m.to_user_id = u2.id
WHERE m.is_approved IS NULL
ORDER BY m.created_at DESC
LIMIT 20 OFFSET ?
```

**الملفات:**
- `app/admin/messages/page.tsx` (جديد)
- `components/admin/PendingMessagesTable.tsx` (جديد)

---

### v1.7.8 - صفحة الموافقات على المحتوى

**المسار:** `/admin/approvals`  
**الملف:** `app/admin/approvals/page.tsx`

**المتطلبات:**
- [ ] **Tabs:**
  - المحتوى (إنجازات، مناسبات، برامج)
  - الحسابات (إنشاء، تعديل)
- [ ] **جدول المحتوى المعلق:**
  - النوع (إنجاز/مناسبة/برنامج)
  - المستخدم
  - العنوان
  - التاريخ
  - أزرار (عرض/قبول/رفض)
- [ ] Pagination

**الربط بقاعدة البيانات:**
```sql
-- المحتوى
SELECT c.*, u.first_name, u.last_name
FROM contents c
JOIN users u ON c.user_id = u.id
WHERE c.is_approved IS NULL
ORDER BY c.created_at DESC
LIMIT 20 OFFSET ?

-- الحسابات
SELECT ar.*, u.first_name, u.last_name
FROM approval_requests ar
JOIN users u ON ar.user_id = u.id
WHERE ar.status = 'pending'
ORDER BY ar.created_at DESC
LIMIT 20 OFFSET ?
```

**الملفات:**
- `app/admin/approvals/page.tsx` (جديد)
- `components/admin/ContentApprovals.tsx` (جديد)
- `components/admin/AccountApprovals.tsx` (جديد)

---

### v1.7.9 - صفحة إدارة المستخدمين

**المسار:** `/admin/users`  
**الملف:** `app/admin/users/page.tsx`

**المتطلبات:**
- [ ] **جدول المستخدمين:**
  - الاسم
  - النوع (مواطن/نائب/مرشح)
  - البريد الإلكتروني
  - المحافظة
  - الحالة (نشط/معطل)
  - تاريخ التسجيل
  - أزرار (عرض/تعديل/تعطيل/حذف)
- [ ] **فلاتر متقدمة:**
  - النوع
  - المحافظة
  - الحالة
  - تاريخ التسجيل
- [ ] Pagination (50 مستخدم لكل صفحة)
- [ ] زر "تصدير البيانات" (Backup) - CSV/JSON
- [ ] زر "استيراد البيانات" (Restore)

**الربط بقاعدة البيانات:**
```sql
SELECT u.*, r.name as role, g.name as governorate
FROM users u
JOIN roles r ON u.role_id = r.id
JOIN governorates g ON u.governorate_id = g.id
ORDER BY u.created_at DESC
LIMIT 50 OFFSET ?
```

**الملفات:**
- `app/admin/users/page.tsx` (جديد)
- `components/admin/UsersFilters.tsx` (جديد)
- `components/admin/UsersTable.tsx` (جديد)
- `components/admin/ExportImportButtons.tsx` (جديد)

---

### v1.7.10 - صفحة إدارة المديرين

**المسار:** `/admin/managers`  
**الملف:** `app/admin/managers/page.tsx`

**المتطلبات:**
- [ ] **جدول المديرين:**
  - الاسم
  - البريد الإلكتروني
  - الحالة (نشط/معطل)
  - تاريخ الإنشاء
  - أزرار (تعطيل/حذف)
- [ ] زر "إضافة مدير جديد" (أخضر)

**الربط بقاعدة البيانات:**
```sql
SELECT * FROM users
WHERE role_id = (SELECT id FROM roles WHERE name = 'Manager')
ORDER BY created_at DESC
```

**الملفات:**
- `app/admin/managers/page.tsx` (جديد)
- `app/admin/managers/new/page.tsx` (جديد)
- `components/admin/ManagersTable.tsx` (جديد)

---

### v1.7.11 - صفحة إدارة التقييمات

**المسار:** `/admin/ratings`  
**الملف:** `app/admin/ratings/page.tsx`

**المتطلبات:**
- [ ] **جدول النواب/المرشحين:**
  - الاسم
  - المتوسط الحالي (نجوم)
  - عدد المقيمين
  - القيم الابتدائية (base_count, base_score)
  - زر "تعديل القيم"
- [ ] Pagination

**الربط بقاعدة البيانات:**
```sql
SELECT u.*, 
       AVG(r.stars) as avg_rating, 
       COUNT(r.id) as rating_count,
       r.base_count, r.base_score
FROM users u
LEFT JOIN ratings r ON u.id = r.target_user_id
WHERE u.role_id IN (SELECT id FROM roles WHERE name IN ('MP', 'Candidate'))
GROUP BY u.id
ORDER BY avg_rating DESC
LIMIT 20 OFFSET ?
```

**الملفات:**
- `app/admin/ratings/page.tsx` (جديد)
- `components/admin/RatingsTable.tsx` (جديد)
- `components/admin/EditBaseRatingModal.tsx` (جديد)

---

### v1.7.12 - صفحة إدارة الإعدادات

**المسار:** `/admin/settings`  
**الملف:** `app/admin/settings/page.tsx`

**المتطلبات:**
- [ ] **Tabs:**
  - بيانات الاتصال
  - روابط السوشيال ميديا
  - النصوص الثابتة
  - الأسئلة الشائعة

#### بيانات الاتصال:
- [ ] العنوان (Input)
- [ ] رقم الهاتف (Input)
- [ ] البريد الإلكتروني (Input)

#### روابط السوشيال ميديا:
- [ ] Facebook (Input)
- [ ] Twitter (Input)
- [ ] YouTube (Input)
- [ ] LinkedIn (Input)
- [ ] Instagram (Input)

#### النصوص الثابتة:
- [ ] نص "من نحن" (Textarea)
- [ ] نص "الشروط والأحكام" (Textarea)
- [ ] نص "سياسة الخصوصية" (Textarea)

#### الأسئلة الشائعة:
- [ ] 10 أسئلة وأجوبة (Input + Textarea لكل سؤال)

- [ ] زر "حفظ جميع الإعدادات" (أخضر)

**الربط بقاعدة البيانات:**
```sql
UPDATE settings SET value = ? WHERE key = ?
```

**الملفات:**
- `app/admin/settings/page.tsx` (جديد)
- `components/admin/ContactSettings.tsx` (جديد)
- `components/admin/SocialSettings.tsx` (جديد)
- `components/admin/ContentSettings.tsx` (جديد)
- `components/admin/FAQSettings.tsx` (جديد)

---

### v1.7.13 - صفحة إدارة عداد الزوار

**المسار:** `/admin/visitor-counter`  
**الملف:** `app/admin/visitor-counter/page.tsx`

**المتطلبات:**
- [ ] الحد الأدنى للعدد (Number Input)
- [ ] الحد الأقصى للعدد (Number Input)
- [ ] الفترة الزمنية للتغيير بالثواني (Number Input - افتراضي 45)
- [ ] معاينة مباشرة للعداد
- [ ] زر "حفظ" (أخضر)

**الربط بقاعدة البيانات:**
```sql
UPDATE visitor_counter_settings 
SET min_value = ?, max_value = ?, change_interval_seconds = ?
WHERE id = 1
```

**الملفات:**
- `app/admin/visitor-counter/page.tsx` (جديد)
- `components/admin/VisitorCounterSettings.tsx` (جديد)

---

### v1.7.14 - صفحة إدارة الأخبار

**المسار:** `/admin/news`  
**الملف:** `app/admin/news/page.tsx`

**المتطلبات:**
- [ ] 5 حقول نصية للأخبار (Textarea - 200 حرف لكل خبر)
- [ ] اختيار السرعة (Select):
  - بطيء
  - متوسط
  - سريع
- [ ] اختيار الاتجاه (Radio):
  - يمين ← يسار
  - يسار ← يمين
- [ ] معاينة مباشرة للشريط الإخباري
- [ ] زر "حفظ" (أخضر)

**الربط بقاعدة البيانات:**
```sql
UPDATE settings SET value = ? WHERE key IN ('news_1', 'news_2', 'news_3', 'news_4', 'news_5', 'news_speed', 'news_direction')
```

**الملفات:**
- `app/admin/news/page.tsx` (جديد)
- `components/admin/NewsSettings.tsx` (جديد)

---

## 🧪 v1.8.0 - الاختبار والتحسين

**الأولوية:** 🔴 عالية جداً  
**التقدير:** 3-4 أيام  
**الحالة:** ⏳ معلق

### v1.8.1 - اختبار الوظائف (Functional Testing)

**المهام:**
- [ ] اختبار جميع نماذج الإدخال
- [ ] اختبار عمليات CRUD
- [ ] اختبار الفلاتر والبحث
- [ ] اختبار Pagination
- [ ] اختبار رفع الملفات
- [ ] اختبار الإشعارات

---

### v1.8.2 - اختبار الصلاحيات (Authorization Testing)

**المهام:**
- [ ] التحقق من Middleware
- [ ] اختبار الوصول غير المصرح به
- [ ] اختبار Role-based Access

---

### v1.8.3 - اختبار الأداء (Performance Testing)

**المهام:**
- [ ] تحسين الاستعلامات (Query Optimization)
- [ ] إضافة Indexes في قاعدة البيانات
- [ ] تطبيق Lazy Loading للصور
- [ ] تطبيق Code Splitting
- [ ] تحسين حجم الحزمة (Bundle Size)

---

### v1.8.4 - اختبار التوافق (Compatibility Testing)

**المهام:**
- [ ] اختبار على Chrome
- [ ] اختبار على Firefox
- [ ] اختبار على Safari
- [ ] اختبار على Edge
- [ ] اختبار على الموبايل (iOS/Android)

---

### v1.8.5 - اختبار الأمان (Security Testing)

**المهام:**
- [ ] تفعيل RLS في Supabase
- [ ] اختبار SQL Injection
- [ ] اختبار XSS
- [ ] اختبار CSRF
- [ ] تأمين رفع الملفات (File Upload Security)
- [ ] تشفير البيانات الحساسة

---

### v1.8.6 - اختبار تجربة المستخدم (UX Testing)

**المهام:**
- [ ] مراجعة التصميم
- [ ] تحسين الرسائل التوضيحية
- [ ] إضافة Loading States
- [ ] إضافة Error Handling
- [ ] تحسين Navigation

---

### v1.8.7 - إصلاح الأخطاء (Bug Fixing)

**المهام:**
- [ ] جمع قائمة الأخطاء
- [ ] ترتيب حسب الأولوية
- [ ] إصلاح الأخطاء الحرجة
- [ ] إصلاح الأخطاء المتوسطة
- [ ] إصلاح الأخطاء البسيطة

---

## 🚀 v2.0.0 - الإطلاق النهائي

**الأولوية:** 🔴 عالية جداً  
**التقدير:** 2-3 أيام  
**الحالة:** ⏳ معلق

### v2.0.1 - إعداد البيئة الإنتاجية

**المهام:**
- [ ] مراجعة متغيرات البيئة في Vercel
- [ ] تفعيل HTTPS
- [ ] إعداد Custom Domain (إن وجد)
- [ ] إعداد SSL Certificate

---

### v2.0.2 - إعداد قاعدة البيانات للإنتاج

**المهام:**
- [ ] تفعيل جميع RLS Policies
- [ ] تفعيل Triggers
- [ ] إنشاء Indexes للأداء
- [ ] إعداد Backup تلقائي يومي
- [ ] اختبار Restore

---

### v2.0.3 - إعداد Storage

**المهام:**
- [ ] تنظيم Buckets:
  - `avatars` (صور المستخدمين)
  - `profile_banners` (بنرات الملفات الشخصية)
  - `public_banners` (البنرات العامة)
  - `complaint_attachments` (مرفقات الشكاوى)
  - `content_images` (صور المحتوى)
- [ ] تفعيل Storage Policies
- [ ] تحديد حجم الملفات المسموح

---

### v2.0.4 - إعداد Email

**المهام:**
- [ ] إعداد SMTP مخصص (SendGrid/Resend)
- [ ] تخصيص Email Templates
- [ ] اختبار إرسال الرسائل

---

### v2.0.5 - إضافة البيانات الأولية للإنتاج

**المهام:**
- [ ] إضافة حساب الأدمن الرئيسي
- [ ] إضافة البانر الافتراضي (`sisi-banner.jpg`)
- [ ] إضافة الإعدادات الأساسية
- [ ] إضافة الأخبار الافتراضية
- [ ] إضافة نصوص الصفحات الثابتة

---

### v2.0.6 - إعداد المراقبة والتحليلات

**المهام:**
- [ ] إضافة Google Analytics
- [ ] إعداد Error Tracking (Sentry)
- [ ] إعداد Monitoring (Vercel Analytics)
- [ ] إعداد Logs

---

### v2.0.7 - التوثيق النهائي

**المهام:**
- [ ] توثيق API
- [ ] دليل المستخدم (User Manual)
- [ ] دليل الأدمن (Admin Manual)
- [ ] دليل المطور (Developer Guide)

---

### v2.0.8 - الإطلاق التجريبي (Soft Launch)

**المهام:**
- [ ] إطلاق لمجموعة محدودة
- [ ] جمع الملاحظات
- [ ] إجراء التحسينات

---

### v2.0.9 - الإطلاق الرسمي (Official Launch)

**المهام:**
- [ ] الإعلان عن الإطلاق
- [ ] مراقبة الأداء
- [ ] الدعم الفني

---

## 📌 ملاحظات مهمة جداً

### ⚠️ المشاكل المعروفة التي يجب إصلاحها:

1. **البانر الرئيسي:**
   - الصورة أحياناً تظهر كصورة مفقودة
   - **الحل:** إضافة معالجة للأخطاء وعرض بانر احتياطي

2. **صفحات المصادقة:**
   - بدون هيدر وفوتر
   - لا تستخدم خط Tajawal
   - **الحل:** إضافة Header و Footer لجميع صفحات المصادقة واستخدام Tajawal

3. **المسافات البينية:**
   - المسافات بين عناصر المينيو الرئيسية غير ثابتة
   - **الحل:** استخدام Flexbox مع `justify-content: space-between`

4. **الفوتر:**
   - يحتوي على نصوص زائدة
   - المسافات بين الأيقونات غير متساوية
   - **الحل:** إزالة النصوص الزائدة والالتزام بالتصميم المرفق

5. **الشريط الإخباري:**
   - التصميم لا يطابق المواصفات
   - **الحل:** الالتزام بالخطوط البرتقالية والرمادية بالضبط

6. **الهيدر الأبيض:**
   - بدون ظل
   - **الحل:** إضافة `box-shadow` للهيدر

7. **استخدام React/Vite بدلاً من Next.js:**
   - ⚠️ **خطأ جسيم وغير مقبول**
   - **الحل:** الالتزام بـ Next.js 15 وآخر إصدار منه واستخدام مكتباته

---

### 🎯 الأولويات:

1. **المرحلة 1 و 2:** يجب البدء بهما فوراً (المكونات والمصادقة)
2. **المرحلة 3:** الصفحات العامة (الواجهة الأساسية)
3. **المرحلة 5 و 7:** لوحات النائب والأدمن (الوظائف الأساسية)
4. **المرحلة 4 و 6:** لوحات المواطن والمدير (يمكن تأجيلها قليلاً)

---

### 📊 التقديرات الزمنية:

- **العمل بدوام كامل (8 ساعات/يوم):** 6-8 أسابيع
- **العمل بدوام جزئي (4 ساعات/يوم):** 12-16 أسبوع
- **العمل مع فريق (2-3 مطورين):** 3-4 أسابيع

---

### 🔄 كيفية إنشاء إصدار جديد:

```bash
# بعد إكمال مرحلة أو ميزة
cd /path/to/naebak-app

# إنشاء إصدار patch (1.1.0 → 1.1.1)
./scripts/release.sh patch "إصلاح مشكلة البانر المفقود"

# إنشاء إصدار minor (1.1.0 → 1.2.0)
./scripts/release.sh minor "إضافة نظام المصادقة الكامل"

# إنشاء إصدار major (1.9.0 → 2.0.0)
./scripts/release.sh major "الإطلاق الرسمي للإنتاج"

# Push إلى GitHub
git push origin main
git push origin v1.x.x

# النشر التلقائي على Vercel! 🎉
```

---

**آخر تحديث:** 6 أكتوبر 2025  
**الحالة:** جاهز للتنفيذ 🚀
