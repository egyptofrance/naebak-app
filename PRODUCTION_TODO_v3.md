# 📋 خطة التطوير الإنتاجية - منصة نائبك

**تاريخ الإنشاء:** 6 أكتوبر 2025  
**آخر تحديث:** 6 أكتوبر 2025  
**الإصدار الحالي:** v1.0.0  
**الحالة:** ✅ البنية التحتية جاهزة | 🚧 الواجهات قيد التطوير

---

## 📌 ملاحظة مهمة

هذا الملف محدّث ليتوافق بالكامل مع **قاعدة البيانات الموجودة** في `NAEBAKPlatform_FullDocumentation.md` والتي تم تنفيذها بالفعل على Supabase.

**قاعدة البيانات تحتوي على:**
- ✅ 16 جدول (14 أساسي + `news` + `notifications`)
- ✅ حقل `auth_id` في `users` (مربوط بـ Supabase Auth)
- ✅ حقل `slug` في `profiles` (للروابط الصديقة)
- ✅ جدول `news` منفصل (بدلاً من settings)
- ✅ جدول `notifications` كامل
- ✅ 7 Triggers & Functions
- ✅ RLS Policies كاملة
- ✅ 4 Storage Buckets

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
| **نظام الإشعارات** | v1.8.0 | ⏳ معلق | Notifications System |
| **الاختبار والتحسين** | v1.9.0 | ⏳ معلق | Testing & Optimization |
| **الإطلاق** | v2.0.0 | ⏳ معلق | Production Release |

---

## 📦 v1.0.0 - البنية التحتية ✅

**التاريخ:** 6 أكتوبر 2025  
**الحالة:** ✅ مكتمل

### ما تم إنجازه:

#### 1. إعداد المشروع
- [x] إنشاء مشروع Next.js 15.1.3
- [x] إعداد Tailwind CSS
- [x] إعداد TypeScript
- [x] إعداد ESLint & Prettier

#### 2. ربط Supabase
- [x] إنشاء مشروع Supabase
- [x] إعداد `lib/supabase.ts`
- [x] إضافة المتغيرات البيئية:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_JWT_SECRET`

#### 3. قاعدة البيانات (16 جدول)

##### الجداول المرجعية (6 جداول):
- [x] `roles` - الأدوار الخمسة (admin, manager, citizen, mp, candidate)
- [x] `governorates` - 27 محافظة مصرية
- [x] `councils` - مجلسي النواب والشيوخ
- [x] `parties` - الأحزاب السياسية + "مستقل"
- [x] `symbols` - الرموز الانتخابية
- [x] `complaint_types` - 10 أنواع شكاوى

##### الجداول الأساسية (10 جداول):
- [x] `users` - المستخدمون (مع `auth_id` مربوط بـ Supabase Auth)
- [x] `profiles` - ملفات النواب/المرشحين (مع `slug` للروابط)
- [x] `messages` - الرسائل
- [x] `complaints` - الشكاوى
- [x] `complaint_attachments` - مرفقات الشكاوى
- [x] `complaint_actions` - سجل إجراءات الشكاوى
- [x] `ratings` - التقييمات
- [x] `contents` - المحتوى (إنجازات، مناسبات، برامج)
- [x] `banners_public` - البنرات العامة
- [x] `banners_profile` - بنرات الملفات الشخصية
- [x] `news` - الأخبار (جدول منفصل)
- [x] `news_settings` - إعدادات الشريط الإخباري
- [x] `notifications` - الإشعارات
- [x] `settings` - الإعدادات العامة
- [x] `visitor_counter_settings` - إعدادات عداد الزوار

#### 4. Triggers & Functions
- [x] `auto_update_timestamp()` - تحديث updated_at تلقائياً
- [x] `generate_slug_arabic()` - إنشاء slug عربي فريد
- [x] `award_points_on_resolved_complaint()` - منح النقاط عند حل الشكوى
- [x] `auto_approve_admin_content()` - موافقة تلقائية لمحتوى الأدمن
- [x] `auto_delete_related_profile()` - حذف الملف الشخصي عند حذف المستخدم
- [x] `keep_complaint_action_log()` - تسجيل إجراءات الشكاوى
- [x] `add_notification()` - إضافة إشعار

#### 5. RLS Policies
- [x] تفعيل RLS على جميع الجداول الحساسة
- [x] Policies للقراءة والكتابة حسب الأدوار
- [x] Policies للـ Storage Buckets

#### 6. Storage Buckets
- [x] `avatars` - صور المستخدمين
- [x] `banners` - البنرات (عامة وشخصية)
- [x] `complaints_files` - مرفقات الشكاوى
- [x] `contents_images` - صور المحتوى

#### 7. البيانات الأولية
- [x] 27 محافظة مصرية
- [x] مجلسي النواب والشيوخ
- [x] الأحزاب السياسية
- [x] الرموز الانتخابية
- [x] أنواع الشكاوى (10 أنواع)
- [x] الأدوار الخمسة

#### 8. النشر والإصدارات
- [x] إعداد GitHub Repository
- [x] ربط Vercel + CI/CD
- [x] نظام الإصدارات:
  - `VERSION`
  - `CHANGELOG.md`
  - `scripts/release.sh`
- [x] إنشاء Tag v1.0.0

---

## 🧩 v1.1.0 - المكونات الأساسية المشتركة

**الأولوية:** 🔴 عالية جداً  
**التقدير:** 4-5 أيام  
**الحالة:** 🔴 قيد العمل

---

### v1.1.1 - إعداد الخطوط والألوان والأنماط

**التقدير:** 2-3 ساعات

#### المهام:
- [ ] تثبيت خط Tajawal من Google Fonts
- [ ] تخصيص `tailwind.config.ts` بالألوان الرسمية:
  ```typescript
  colors: {
    primary: '#004705',    // أخضر
    secondary: '#e86202',  // برتقالي
    gray: {
      dark: '#333333',     // رمادي داكن
      light: '#f5f5f5',    // رمادي فاتح
    }
  }
  ```
- [ ] إضافة دعم RTL كامل في `globals.css`
- [ ] إنشاء `constants/colors.ts`
- [ ] إنشاء `constants/fonts.ts`

#### الملفات:
- `app/layout.tsx` (تحديث - إضافة Tajawal)
- `tailwind.config.ts` (تحديث - الألوان)
- `app/globals.css` (تحديث - RTL)
- `constants/colors.ts` (جديد)
- `constants/fonts.ts` (جديد)

#### ملاحظات مهمة:
- ⚠️ **يجب استخدام خط Tajawal في جميع الصفحات بدون استثناء**
- ⚠️ **صفحات المصادقة (login, register) يجب أن تستخدم Tajawal أيضاً**
- ⚠️ **يجب تطبيق RTL على جميع الصفحات**

---

### v1.1.2 - مكون Header (الهيدر)

**التقدير:** 1 يوم

#### المتطلبات:
- [ ] خلفية بيضاء مع **ظل خفيف** (shadow)
- [ ] اليمين: لوجو أخضر قابل للنقر (يوجه للصفحة الرئيسية)
- [ ] الوسط: قائمة الروابط:
  - الرئيسية (`/`)
  - النواب (`/mps`)
  - المرشحين (`/candidates`)
  - الشكاوى (`/complaints`)
  - من نحن (`/about`)
  - اتصل بنا (`/contact`)
- [ ] اليسار:
  - [ ] جرس الإشعارات (نمط Facebook) مع Badge لعدد الإشعارات غير المقروءة
  - [ ] عداد الزوار العشوائي (يتحدث كل 45 ثانية)
  - [ ] زر "تسجيل الدخول" (للزوار)
  - [ ] صورة المستخدم + قائمة منسدلة (للمستخدمين المسجلين)
- [ ] تصميم متجاوب (Hamburger Menu للموبايل)
- [ ] **المسافات البينية بين عناصر المينيو يجب أن تكون ثابتة ومتساوية**

#### الربط بقاعدة البيانات:

##### 1. بيانات المستخدم:
```typescript
// جلب المستخدم الحالي
const { data: { user } } = await supabase.auth.getUser();

// جلب بيانات المستخدم من جدول users
const { data: userData } = await supabase
  .from('users')
  .select('id, first_name, last_name, avatar, role_id')
  .eq('auth_id', user.id)
  .single();
```

##### 2. عدد الإشعارات غير المقروءة:
```typescript
// جلب عدد الإشعارات غير المقروءة من جدول notifications
const { count } = await supabase
  .from('notifications')
  .select('*', { count: 'exact', head: true })
  .eq('user_id', userData.id)
  .eq('is_read', false);
```

##### 3. عداد الزوار:
```typescript
// جلب إعدادات عداد الزوار من visitor_counter_settings
const { data: settings } = await supabase
  .from('visitor_counter_settings')
  .select('min_value, max_value, change_interval_seconds')
  .single();

// توليد رقم عشوائي بين min_value و max_value
// تحديثه كل change_interval_seconds ثانية
```

#### الملفات:
- `components/layout/Header.tsx` (جديد)
- `components/ui/NotificationBell.tsx` (جديد)
- `components/ui/VisitorCounter.tsx` (جديد)
- `components/ui/UserMenu.tsx` (جديد)
- `components/ui/Logo.tsx` (جديد)
- `lib/notifications.ts` (جديد - دوال مساعدة)

#### ملاحظات مهمة:
- ⚠️ **يجب إضافة ظل للهيدر الأبيض لتمييزه عن الخلفية**
- ⚠️ **المسافات يجب أن تكون متساوية بين جميع عناصر القائمة**
- ⚠️ **استخدام `flex` مع `justify-between` و `gap-4` للمسافات**

---

### v1.1.3 - مكون News Bar (شريط الأخبار)

**التقدير:** 4-5 ساعات

#### المتطلبات:
- [ ] خلفية رمادية داكنة (#333333)
- [ ] **خط برتقالي 2px فوقه**
- [ ] **خط برتقالي 4px تحته**
- [ ] **خط رمادي 2px تحت البرتقالي**
- [ ] نصوص عربية متحركة (حسب الاتجاه المحدد)
- [ ] سرعة واتجاه قابلين للتحكم من لوحة الأدمن

#### الربط بقاعدة البيانات:

##### 1. جلب الأخبار النشطة:
```typescript
// جلب جميع الأخبار النشطة من جدول news
const { data: newsItems } = await supabase
  .from('news')
  .select('id, text')
  .eq('is_active', true)
  .order('created_at', { ascending: false });
```

##### 2. جلب إعدادات الشريط:
```typescript
// جلب إعدادات السرعة والاتجاه من news_settings
const { data: settings } = await supabase
  .from('news_settings')
  .select('direction, speed_seconds')
  .single();

// direction: 'ltr' أو 'rtl'
// speed_seconds: عدد الثواني لإكمال دورة واحدة
```

#### الملفات:
- `components/layout/NewsBar.tsx` (جديد)
- `lib/news.ts` (جديد - دوال مساعدة)

#### ملاحظات مهمة:
- ⚠️ **يجب الالتزام بتصميم الشريط الإخباري بالضبط (الخطوط البرتقالية والرمادية)**
- ⚠️ **استخدام CSS Animation لتحريك النصوص**
- ⚠️ **دعم RTL و LTR حسب الإعدادات**

---

### v1.1.4 - مكون Banner (البانر)

**التقدير:** 4-5 ساعات

#### المتطلبات:
- [ ] عرض صورة كاملة العرض **بدون اقتطاع من الأعلى أو الأسفل**
- [ ] **بدون نص أو أزرار فوق الصورة**
- [ ] دعم البانر الافتراضي (`sisi-banner.jpg`)
- [ ] دعم البانرات المخصصة حسب:
  - نوع الصفحة (`page_type`)
  - المحافظة (`governorate_id`)
- [ ] معالجة حالة فشل تحميل الصورة (fallback)

#### الربط بقاعدة البيانات:

##### 1. جلب البانر المناسب:
```typescript
// جلب البانر من banners_public حسب نوع الصفحة والمحافظة
const { data: banner } = await supabase
  .from('banners_public')
  .select('id, image_path, is_default')
  .eq('page_type', pageType) // 'landing', 'candidates', 'mps', 'complaints'
  .eq('is_active', true)
  .or(`governorate_id.eq.${governorateId},governorate_id.is.null`)
  .order('governorate_id', { ascending: false, nullsFirst: false })
  .limit(1)
  .single();

// إذا لم يوجد، استخدم البانر الافتراضي
if (!banner) {
  const { data: defaultBanner } = await supabase
    .from('banners_public')
    .select('id, image_path')
    .eq('is_default', true)
    .eq('is_active', true)
    .single();
}
```

##### 2. الحصول على رابط الصورة:
```typescript
// الحصول على رابط الصورة من Storage
const { data: publicUrl } = supabase
  .storage
  .from('banners')
  .getPublicUrl(banner.image_path);
```

#### الملفات:
- `components/layout/Banner.tsx` (جديد)
- `lib/banners.ts` (جديد - دوال مساعدة)

#### ملاحظات مهمة:
- ⚠️ **البانر أحياناً يظهر كصورة مفقودة - يجب معالجة حالة الخطأ وعرض بانر احتياطي**
- ⚠️ **يجب عدم اقتطاع الصورة - استخدام `object-fit: contain` أو `cover` حسب التصميم**
- ⚠️ **إضافة `onError` handler لعرض البانر الافتراضي عند الفشل**

---

### v1.1.5 - مكون Footer (الفوتر)

**التقدير:** 4-5 ساعات

#### المتطلبات:
- [ ] خلفية خضراء داكنة (#004705)
- [ ] **شعار نائبك في الأعلى (أبيض)**
- [ ] **أيقونات التواصل الاجتماعي فقط** (بدون نصوص زائدة):
  - Facebook
  - Twitter
  - Instagram
  - YouTube
  - WhatsApp
- [ ] **المسافات البينية بين الأيقونات يجب أن تكون متساوية**
- [ ] **الالتزام بالتصميم المرفق بدون إضافات**
- [ ] روابط سريعة:
  - الرئيسية
  - النواب
  - المرشحين
  - الشكاوى
  - من نحن
  - اتصل بنا
  - سياسة الخصوصية
  - شروط الاستخدام
- [ ] حقوق النشر في الأسفل

#### الربط بقاعدة البيانات:

##### 1. جلب روابط التواصل الاجتماعي:
```typescript
// جلب روابط التواصل من جدول settings
const { data: socialLinks } = await supabase
  .from('settings')
  .select('key, value')
  .in('key', [
    'facebook_url',
    'twitter_url',
    'instagram_url',
    'youtube_url',
    'whatsapp_number'
  ]);
```

##### 2. جلب معلومات الاتصال:
```typescript
// جلب معلومات الاتصال من settings
const { data: contactInfo } = await supabase
  .from('settings')
  .select('key, value')
  .in('key', [
    'contact_email',
    'contact_phone',
    'contact_address'
  ]);
```

#### الملفات:
- `components/layout/Footer.tsx` (جديد)
- `components/ui/SocialIcon.tsx` (جديد)

#### ملاحظات مهمة:
- ⚠️ **شيل الكلام الزائد من الفوتر والتزم بالتصميم المرفق**
- ⚠️ **المسافات البينية بين الأيقونات لازم تكون متساوية**
- ⚠️ **استخدام `flex` مع `gap-6` للمسافات المتساوية**

---

### v1.1.6 - مكون Sidebar (القائمة الجانبية)

**التقدير:** 3-4 ساعات

#### المتطلبات:
- [ ] قائمة جانبية للموبايل (Drawer)
- [ ] نفس روابط Header
- [ ] زر إغلاق
- [ ] تأثير Overlay عند الفتح
- [ ] Animation سلسة

#### الملفات:
- `components/layout/Sidebar.tsx` (جديد)
- `components/ui/Drawer.tsx` (جديد)

---

### v1.1.7 - مكونات UI الأساسية

**التقدير:** 1 يوم

#### المكونات المطلوبة:
- [ ] `Button.tsx` - أزرار بأنماط مختلفة
- [ ] `Input.tsx` - حقول إدخال
- [ ] `Textarea.tsx` - مناطق نصية
- [ ] `Select.tsx` - قوائم منسدلة
- [ ] `Card.tsx` - بطاقات
- [ ] `Badge.tsx` - شارات (للإشعارات، الحالات)
- [ ] `Avatar.tsx` - صور المستخدمين
- [ ] `Modal.tsx` - نوافذ منبثقة
- [ ] `Toast.tsx` - إشعارات مؤقتة
- [ ] `Spinner.tsx` - مؤشر التحميل
- [ ] `Pagination.tsx` - ترقيم الصفحات
- [ ] `Tabs.tsx` - تبويبات
- [ ] `Accordion.tsx` - قوائم قابلة للطي

#### الملفات:
- `components/ui/Button.tsx`
- `components/ui/Input.tsx`
- `components/ui/Textarea.tsx`
- `components/ui/Select.tsx`
- `components/ui/Card.tsx`
- `components/ui/Badge.tsx`
- `components/ui/Avatar.tsx`
- `components/ui/Modal.tsx`
- `components/ui/Toast.tsx`
- `components/ui/Spinner.tsx`
- `components/ui/Pagination.tsx`
- `components/ui/Tabs.tsx`
- `components/ui/Accordion.tsx`

---

### v1.1.8 - Layout الرئيسي

**التقدير:** 2-3 ساعات

#### المتطلبات:
- [ ] دمج جميع المكونات السابقة
- [ ] Header
- [ ] NewsBar
- [ ] Banner (اختياري حسب الصفحة)
- [ ] المحتوى الرئيسي
- [ ] Footer
- [ ] Sidebar (للموبايل)

#### الملفات:
- `components/layout/MainLayout.tsx` (جديد)
- `app/layout.tsx` (تحديث)

---

### ✅ إكمال v1.1.0

**بعد إكمال جميع المهام:**
```bash
# تحديث VERSION
echo "1.1.0" > VERSION

# تحديث CHANGELOG.md
# إضافة قسم [1.1.0] مع جميع التغييرات

# Commit
git add .
git commit -m "Release v1.1.0: المكونات الأساسية المشتركة"

# إنشاء Tag
git tag -a v1.1.0 -m "Release v1.1.0: المكونات الأساسية المشتركة"

# Push
git push origin main
git push origin v1.1.0

# النشر التلقائي على Vercel! 🎉
```

---

## 🔐 v1.2.0 - نظام المصادقة والحماية

**الأولوية:** 🔴 عالية جداً  
**التقدير:** 3-4 أيام  
**الحالة:** ⏳ معلق

---

### v1.2.1 - إعداد Supabase Auth

**التقدير:** 2-3 ساعات

#### المهام:
- [ ] تفعيل Email/Password Provider في Supabase
- [ ] إعداد Redirect URLs:
  - `http://localhost:3000/api/auth/callback`
  - `https://naebak-com.vercel.app/api/auth/callback`
- [ ] إعداد Email Templates (ترحيب، إعادة تعيين كلمة المرور)
- [ ] إعداد `@supabase/auth-helpers-nextjs`

#### الملفات:
- `lib/auth.ts` (جديد - دوال المصادقة)
- `middleware.ts` (جديد - حماية الصفحات)

---

### v1.2.2 - صفحة تسجيل الدخول

**التقدير:** 4-5 ساعات

#### المتطلبات:
- [ ] **يجب أن تحتوي على Header و Footer**
- [ ] **يجب استخدام خط Tajawal**
- [ ] نموذج تسجيل دخول:
  - [ ] حقل البريد الإلكتروني
  - [ ] حقل كلمة المرور
  - [ ] زر "تسجيل الدخول"
  - [ ] رابط "نسيت كلمة المرور؟"
  - [ ] رابط "إنشاء حساب جديد"
- [ ] معالجة الأخطاء
- [ ] مؤشر تحميل أثناء المصادقة

#### الربط بقاعدة البيانات:

##### 1. تسجيل الدخول:
```typescript
// تسجيل الدخول باستخدام Supabase Auth
const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
});

if (data.user) {
  // جلب بيانات المستخدم من جدول users
  const { data: userData } = await supabase
    .from('users')
    .select('id, role_id, first_name, last_name')
    .eq('auth_id', data.user.id)
    .single();
  
  // التوجيه حسب الدور
  const { data: role } = await supabase
    .from('roles')
    .select('name')
    .eq('id', userData.role_id)
    .single();
  
  // redirect to dashboard based on role
}
```

#### الملفات:
- `app/(auth)/login/page.tsx` (جديد)
- `components/auth/LoginForm.tsx` (جديد)

#### ملاحظات مهمة:
- ⚠️ **صفحات المصادقة بدون هيدر وفوتر - يجب إضافتهم**
- ⚠️ **يجب استخدام خط Tajawal في جميع صفحات المصادقة**

---

### v1.2.3 - صفحة إنشاء حساب

**التقدير:** 5-6 ساعات

#### المتطلبات:
- [ ] **يجب أن تحتوي على Header و Footer**
- [ ] **يجب استخدام خط Tajawal**
- [ ] نموذج تسجيل:
  - [ ] الاسم الأول
  - [ ] الاسم الأخير
  - [ ] البريد الإلكتروني
  - [ ] كلمة المرور
  - [ ] تأكيد كلمة المرور
  - [ ] رقم الهاتف
  - [ ] رقم الواتساب
  - [ ] المحافظة (قائمة منسدلة)
  - [ ] المدينة
  - [ ] القرية
  - [ ] تاريخ الميلاد
  - [ ] الجنس (ذكر/أنثى)
  - [ ] الوظيفة
  - [ ] موافقة على الشروط والأحكام
- [ ] التحقق من صحة البيانات
- [ ] معالجة الأخطاء

#### الربط بقاعدة البيانات:

##### 1. إنشاء حساب:
```typescript
// 1. إنشاء مستخدم في Supabase Auth
const { data: authData, error: authError } = await supabase.auth.signUp({
  email: email,
  password: password,
});

if (authData.user) {
  // 2. إنشاء سجل في جدول users
  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({
      auth_id: authData.user.id,
      role_id: 3, // citizen role
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      whatsapp: whatsapp,
      governorate_id: governorateId,
      city: city,
      village: village,
      dob: dob,
      gender: gender,
      job_title: jobTitle,
    })
    .select()
    .single();
  
  // 3. إرسال بريد تأكيد (تلقائي من Supabase)
}
```

##### 2. جلب المحافظات:
```typescript
// جلب قائمة المحافظات من جدول governorates
const { data: governorates } = await supabase
  .from('governorates')
  .select('id, name')
  .order('name');
```

#### الملفات:
- `app/(auth)/register/page.tsx` (جديد)
- `components/auth/RegisterForm.tsx` (جديد)

---

### v1.2.4 - صفحة نسيت كلمة المرور

**التقدير:** 2-3 ساعات

#### المتطلبات:
- [ ] **يجب أن تحتوي على Header و Footer**
- [ ] **يجب استخدام خط Tajawal**
- [ ] نموذج إعادة تعيين:
  - [ ] حقل البريد الإلكتروني
  - [ ] زر "إرسال رابط إعادة التعيين"
- [ ] صفحة إعادة تعيين كلمة المرور الجديدة

#### الربط بقاعدة البيانات:

##### 1. إرسال رابط إعادة التعيين:
```typescript
// إرسال بريد إعادة تعيين كلمة المرور
const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: `${window.location.origin}/auth/reset-password`,
});
```

##### 2. تحديث كلمة المرور:
```typescript
// تحديث كلمة المرور
const { error } = await supabase.auth.updateUser({
  password: newPassword,
});
```

#### الملفات:
- `app/(auth)/forgot-password/page.tsx` (جديد)
- `app/(auth)/reset-password/page.tsx` (جديد)

---

### v1.2.5 - Middleware للحماية

**التقدير:** 3-4 ساعات

#### المتطلبات:
- [ ] حماية جميع صفحات Dashboard
- [ ] التحقق من تسجيل الدخول
- [ ] التحقق من الأدوار (Role-Based Access Control)
- [ ] إعادة توجيه غير المصرح لهم

#### الربط بقاعدة البيانات:

##### 1. التحقق من المستخدم:
```typescript
// في middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  // التحقق من الجلسة
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    // إعادة توجيه لصفحة تسجيل الدخول
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // جلب دور المستخدم
  const { data: userData } = await supabase
    .from('users')
    .select('role_id')
    .eq('auth_id', session.user.id)
    .single();
  
  const { data: role } = await supabase
    .from('roles')
    .select('name')
    .eq('id', userData.role_id)
    .single();
  
  // التحقق من الصلاحيات حسب المسار
  const path = req.nextUrl.pathname;
  
  if (path.startsWith('/admin') && role.name !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  
  if (path.startsWith('/manager') && !['admin', 'manager'].includes(role.name)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
  
  // ... المزيد من الفحوصات
  
  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/manager/:path*', '/citizen/:path*', '/mp/:path*', '/candidate/:path*'],
};
```

#### الملفات:
- `middleware.ts` (جديد)
- `lib/permissions.ts` (جديد - دوال التحقق من الصلاحيات)

---

### v1.2.6 - صفحة Dashboard المركزية

**التقدير:** 2-3 ساعات

#### المتطلبات:
- [ ] صفحة `/dashboard` تقوم بالتوجيه التلقائي حسب الدور:
  - Admin → `/admin`
  - Manager → `/manager`
  - Citizen → `/citizen`
  - MP → `/mp`
  - Candidate → `/candidate`

#### الربط بقاعدة البيانات:

```typescript
// في app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  useEffect(() => {
    async function redirectToDashboard() {
      // جلب المستخدم الحالي
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }
      
      // جلب دور المستخدم
      const { data: userData } = await supabase
        .from('users')
        .select('role_id')
        .eq('auth_id', user.id)
        .single();
      
      const { data: role } = await supabase
        .from('roles')
        .select('name')
        .eq('id', userData.role_id)
        .single();
      
      // التوجيه حسب الدور
      switch (role.name) {
        case 'admin':
          router.push('/admin');
          break;
        case 'manager':
          router.push('/manager');
          break;
        case 'citizen':
          router.push('/citizen');
          break;
        case 'mp':
          router.push('/mp');
          break;
        case 'candidate':
          router.push('/candidate');
          break;
        default:
          router.push('/');
      }
    }
    
    redirectToDashboard();
  }, [router, supabase]);
  
  return <div>جاري التحميل...</div>;
}
```

#### الملفات:
- `app/dashboard/page.tsx` (جديد)

---

### ✅ إكمال v1.2.0

**بعد إكمال جميع المهام:**
```bash
./scripts/release.sh minor "نظام المصادقة والحماية"
git push origin main && git push origin v1.2.0
```

---

## 🌐 v1.3.0 - الصفحات العامة

**الأولوية:** 🔴 عالية  
**التقدير:** 5-7 أيام  
**الحالة:** ⏳ معلق

---

### v1.3.1 - الصفحة الرئيسية (Landing Page)

**التقدير:** 2-3 أيام

#### المتطلبات:

##### 1. البانر الرئيسي:
- [ ] عرض بانر من `banners_public` (page_type = 'landing')
- [ ] معالجة حالة فشل التحميل

##### 2. قسم "من نحن":
- [ ] نص تعريفي بالمنصة
- [ ] الأهداف
- [ ] الرؤية

##### 3. قسم الإحصائيات:
- [ ] عدد النواب
- [ ] عدد المرشحين
- [ ] عدد الشكاوى المحلولة
- [ ] عدد المستخدمين

##### 4. قسم "كيف تعمل المنصة":
- [ ] خطوات استخدام المنصة (3-4 خطوات)
- [ ] أيقونات توضيحية

##### 5. قسم النواب المميزين:
- [ ] عرض 6-8 نواب حسب التقييم
- [ ] الاسم، الصورة، المحافظة، التقييم، عدد النقاط

##### 6. قسم الشكاوى الأخيرة:
- [ ] عرض 5-6 شكاوى تم حلها مؤخراً
- [ ] العنوان، النوع، الحالة، التاريخ

##### 7. قسم الأخبار:
- [ ] عرض آخر 3 أخبار/إنجازات

##### 8. Call to Action:
- [ ] زر "ابدأ الآن" (للتسجيل)
- [ ] زر "تصفح النواب"

#### الربط بقاعدة البيانات:

##### 1. الإحصائيات:
```typescript
// عدد النواب
const { count: mpsCount } = await supabase
  .from('users')
  .select('*', { count: 'exact', head: true })
  .eq('role_id', 4); // mp role

// عدد المرشحين
const { count: candidatesCount } = await supabase
  .from('users')
  .select('*', { count: 'exact', head: true })
  .eq('role_id', 5); // candidate role

// عدد الشكاوى المحلولة
const { count: resolvedCount } = await supabase
  .from('complaints')
  .select('*', { count: 'exact', head: true })
  .in('status', ['resolved', 'accepted']);

// عدد المستخدمين
const { count: usersCount } = await supabase
  .from('users')
  .select('*', { count: 'exact', head: true });
```

##### 2. النواب المميزين:
```typescript
// جلب النواب حسب التقييم والنقاط
const { data: topMPs } = await supabase
  .from('users')
  .select(`
    id,
    first_name,
    last_name,
    avatar,
    total_points,
    governorate_id,
    governorates (name),
    profiles (slug)
  `)
  .eq('role_id', 4)
  .order('total_points', { ascending: false })
  .limit(8);

// جلب متوسط التقييم لكل نائب
for (const mp of topMPs) {
  const { data: ratings } = await supabase
    .from('ratings')
    .select('stars')
    .eq('target_user_id', mp.id);
  
  const avgRating = ratings.length > 0
    ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
    : 0;
  
  mp.avgRating = avgRating;
}
```

##### 3. الشكاوى الأخيرة:
```typescript
// جلب الشكاوى المحلولة مؤخراً
const { data: recentComplaints } = await supabase
  .from('complaints')
  .select(`
    id,
    title,
    status,
    created_at,
    type_id,
    complaint_types (name)
  `)
  .in('status', ['resolved', 'accepted'])
  .order('created_at', { ascending: false })
  .limit(6);
```

#### الملفات:
- `app/page.tsx` (تحديث)
- `components/home/Hero.tsx` (جديد)
- `components/home/AboutSection.tsx` (جديد)
- `components/home/StatsSection.tsx` (جديد)
- `components/home/HowItWorksSection.tsx` (جديد)
- `components/home/TopMPsSection.tsx` (جديد)
- `components/home/RecentComplaintsSection.tsx` (جديد)
- `components/home/NewsSection.tsx` (جديد)
- `components/home/CTASection.tsx` (جديد)

---

### v1.3.2 - صفحة النواب

**التقدير:** 1-2 أيام

#### المتطلبات:
- [ ] البانر (page_type = 'mps')
- [ ] فلترة حسب:
  - [ ] المحافظة
  - [ ] المجلس (نواب/شيوخ)
  - [ ] الحزب
  - [ ] البحث بالاسم
- [ ] عرض بطاقات النواب:
  - [ ] الصورة
  - [ ] الاسم
  - [ ] المحافظة
  - [ ] المجلس
  - [ ] الحزب/مستقل
  - [ ] التقييم
  - [ ] عدد النقاط
  - [ ] زر "عرض الملف الشخصي"
- [ ] ترقيم الصفحات (Pagination)

#### الربط بقاعدة البيانات:

```typescript
// جلب النواب مع الفلترة
let query = supabase
  .from('users')
  .select(`
    id,
    first_name,
    last_name,
    avatar,
    total_points,
    governorate_id,
    governorates (name),
    profiles (
      slug,
      council_id,
      councils (name),
      party_id,
      parties (name),
      is_independent
    )
  `)
  .eq('role_id', 4); // mp role

// تطبيق الفلاتر
if (governorateId) {
  query = query.eq('governorate_id', governorateId);
}

if (councilId) {
  query = query.eq('profiles.council_id', councilId);
}

if (partyId) {
  query = query.eq('profiles.party_id', partyId);
}

if (searchTerm) {
  query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`);
}

// الترتيب والترقيم
const { data: mps, count } = await query
  .order('total_points', { ascending: false })
  .range(start, end);
```

#### الملفات:
- `app/mps/page.tsx` (جديد)
- `components/mps/MPCard.tsx` (جديد)
- `components/mps/MPFilters.tsx` (جديد)

---

### v1.3.3 - صفحة المرشحين

**التقدير:** 1-2 أيام

#### المتطلبات:
- [ ] نفس متطلبات صفحة النواب
- [ ] البانر (page_type = 'candidates')
- [ ] إضافة فلتر "الرمز الانتخابي"

#### الربط بقاعدة البيانات:

```typescript
// نفس استعلام النواب مع تغيير role_id إلى 5
let query = supabase
  .from('users')
  .select(`
    id,
    first_name,
    last_name,
    avatar,
    total_points,
    governorate_id,
    governorates (name),
    profiles (
      slug,
      council_id,
      councils (name),
      party_id,
      parties (name),
      is_independent,
      electoral_symbol_id,
      symbols (name, icon_path),
      electoral_number
    )
  `)
  .eq('role_id', 5); // candidate role

// ... نفس الفلاتر
```

#### الملفات:
- `app/candidates/page.tsx` (جديد)
- `components/candidates/CandidateCard.tsx` (جديد)
- `components/candidates/CandidateFilters.tsx` (جديد)

---

### v1.3.4 - الملف الشخصي للنائب/المرشح

**التقدير:** 2-3 أيام

#### المتطلبات:

##### 1. البانر الشخصي:
- [ ] عرض بانر من `banners_profile`
- [ ] بانر افتراضي إذا لم يوجد

##### 2. معلومات أساسية:
- [ ] الصورة الشخصية
- [ ] الاسم الكامل
- [ ] المحافظة
- [ ] المجلس
- [ ] الحزب/مستقل
- [ ] الرمز الانتخابي (للمرشحين)
- [ ] الرقم الانتخابي (للمرشحين)
- [ ] الدائرة
- [ ] اللجنة
- [ ] التقييم (نجوم)
- [ ] عدد النقاط
- [ ] معلومات الاتصال (هاتف، واتساب، بريد)

##### 3. تبويبات:
- [ ] **الإنجازات** - عرض contents من نوع 'achievement'
- [ ] **المناسبات** - عرض contents من نوع 'event'
- [ ] **البرنامج الانتخابي** - عرض contents من نوع 'program'
- [ ] **التقييمات** - عرض جميع التقييمات

##### 4. أزرار التفاعل:
- [ ] زر "إرسال رسالة" (للمواطنين المسجلين)
- [ ] زر "تقييم" (للمواطنين المسجلين)
- [ ] زر "مشاركة الملف الشخصي"

#### الربط بقاعدة البيانات:

##### 1. جلب بيانات النائب/المرشح:
```typescript
// استخدام slug للوصول للملف الشخصي
// مثال: /profile/ahmed-mohamed

const { data: profile } = await supabase
  .from('profiles')
  .select(`
    *,
    users (
      id,
      first_name,
      last_name,
      avatar,
      total_points,
      phone,
      whatsapp,
      email,
      governorate_id,
      governorates (name)
    ),
    councils (name),
    parties (name),
    symbols (name, icon_path)
  `)
  .eq('slug', slug)
  .single();
```

##### 2. جلب البانر الشخصي:
```typescript
const { data: banner } = await supabase
  .from('banners_profile')
  .select('image_path')
  .eq('user_id', profile.user_id)
  .single();

// الحصول على رابط الصورة
const { data: publicUrl } = supabase
  .storage
  .from('banners')
  .getPublicUrl(banner.image_path);
```

##### 3. جلب المحتوى (الإنجازات، المناسبات، البرامج):
```typescript
const { data: contents } = await supabase
  .from('contents')
  .select('*')
  .eq('user_id', profile.user_id)
  .eq('is_approved', true)
  .order('created_at', { ascending: false });

// تقسيم المحتوى حسب النوع
const achievements = contents.filter(c => c.type === 'achievement');
const events = contents.filter(c => c.type === 'event');
const programs = contents.filter(c => c.type === 'program');
```

##### 4. جلب التقييمات:
```typescript
const { data: ratings } = await supabase
  .from('ratings')
  .select(`
    id,
    stars,
    created_at,
    rater_user_id,
    users (first_name, last_name, avatar)
  `)
  .eq('target_user_id', profile.user_id)
  .order('created_at', { ascending: false });

// حساب متوسط التقييم
const avgRating = ratings.length > 0
  ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
  : 0;
```

##### 5. إرسال رسالة:
```typescript
// عند الضغط على "إرسال رسالة"
const { data: message, error } = await supabase
  .from('messages')
  .insert({
    from_user_id: currentUserId,
    to_user_id: profile.user_id,
    body: messageBody,
    is_approved: false, // تحتاج موافقة الأدمن
  })
  .select()
  .single();

// إضافة إشعار للأدمن
await supabase.rpc('add_notification', {
  target_user: adminId,
  n_type: 'content_pending_approval',
  n_ref: message.id,
  n_title: 'رسالة جديدة تحتاج موافقة',
  n_body: `رسالة من ${currentUserName} إلى ${profile.users.first_name}`,
});
```

##### 6. إضافة تقييم:
```typescript
// عند الضغط على "تقييم"
const { data: rating, error } = await supabase
  .from('ratings')
  .insert({
    rater_user_id: currentUserId,
    target_user_id: profile.user_id,
    stars: selectedStars, // 1-5
  })
  .select()
  .single();
```

#### الملفات:
- `app/profile/[slug]/page.tsx` (جديد)
- `components/profile/ProfileHeader.tsx` (جديد)
- `components/profile/ProfileBanner.tsx` (جديد)
- `components/profile/ProfileInfo.tsx` (جديد)
- `components/profile/ProfileTabs.tsx` (جديد)
- `components/profile/ContentCard.tsx` (جديد)
- `components/profile/RatingCard.tsx` (جديد)
- `components/profile/SendMessageModal.tsx` (جديد)
- `components/profile/RateModal.tsx` (جديد)

---

### v1.3.5 - صفحة الشكاوى العامة

**التقدير:** 1-2 أيام

#### المتطلبات:
- [ ] البانر (page_type = 'complaints')
- [ ] عرض الشكاوى العامة فقط (agree_publish_public = true)
- [ ] فلترة حسب:
  - [ ] نوع الشكوى
  - [ ] المحافظة
  - [ ] الحالة
- [ ] عرض بطاقات الشكاوى:
  - [ ] العنوان
  - [ ] النوع
  - [ ] المحافظة
  - [ ] الحالة
  - [ ] التاريخ
  - [ ] زر "عرض التفاصيل"
- [ ] ترقيم الصفحات

#### الربط بقاعدة البيانات:

```typescript
// جلب الشكاوى العامة
let query = supabase
  .from('complaints')
  .select(`
    id,
    title,
    body,
    status,
    created_at,
    type_id,
    complaint_types (name),
    governorate_id,
    governorates (name)
  `)
  .eq('agree_publish_public', true);

// تطبيق الفلاتر
if (typeId) {
  query = query.eq('type_id', typeId);
}

if (governorateId) {
  query = query.eq('governorate_id', governorateId);
}

if (status) {
  query = query.eq('status', status);
}

// الترتيب والترقيم
const { data: complaints, count } = await query
  .order('created_at', { ascending: false })
  .range(start, end);
```

#### الملفات:
- `app/complaints/page.tsx` (جديد)
- `components/complaints/ComplaintCard.tsx` (جديد)
- `components/complaints/ComplaintFilters.tsx` (جديد)

---

### v1.3.6 - صفحة تفاصيل الشكوى

**التقدير:** 4-5 ساعات

#### المتطلبات:
- [ ] عرض تفاصيل الشكوى الكاملة
- [ ] المرفقات (صور، ملفات)
- [ ] سجل الإجراءات (من `complaint_actions`)
- [ ] الردود

#### الربط بقاعدة البيانات:

```typescript
// جلب تفاصيل الشكوى
const { data: complaint } = await supabase
  .from('complaints')
  .select(`
    *,
    complaint_types (name),
    governorates (name),
    citizen:citizen_id (first_name, last_name, avatar),
    assigned:assigned_to (first_name, last_name, avatar),
    complaint_attachments (*),
    complaint_actions (
      *,
      actor:actor_user_id (first_name, last_name, avatar)
    )
  `)
  .eq('id', complaintId)
  .eq('agree_publish_public', true)
  .single();
```

#### الملفات:
- `app/complaints/[id]/page.tsx` (جديد)
- `components/complaints/ComplaintDetails.tsx` (جديد)
- `components/complaints/ComplaintActions.tsx` (جديد)

---

### v1.3.7 - صفحة "من نحن"

**التقدير:** 3-4 ساعات

#### المتطلبات:
- [ ] نبذة عن المنصة
- [ ] الأهداف
- [ ] الرؤية
- [ ] الرسالة
- [ ] الفريق (اختياري)

#### الملفات:
- `app/about/page.tsx` (جديد)

---

### v1.3.8 - صفحة "اتصل بنا"

**التقدير:** 3-4 ساعات

#### المتطلبات:
- [ ] نموذج اتصال:
  - [ ] الاسم
  - [ ] البريد الإلكتروني
  - [ ] الموضوع
  - [ ] الرسالة
- [ ] معلومات الاتصال (من `settings`)
- [ ] روابط التواصل الاجتماعي

#### الربط بقاعدة البيانات:

```typescript
// جلب معلومات الاتصال
const { data: contactInfo } = await supabase
  .from('settings')
  .select('key, value')
  .in('key', [
    'contact_email',
    'contact_phone',
    'contact_address',
    'facebook_url',
    'twitter_url',
    'instagram_url',
    'youtube_url',
    'whatsapp_number'
  ]);
```

#### الملفات:
- `app/contact/page.tsx` (جديد)
- `components/contact/ContactForm.tsx` (جديد)

---

### ✅ إكمال v1.3.0

```bash
./scripts/release.sh minor "الصفحات العامة"
git push origin main && git push origin v1.3.0
```

---

## 👤 v1.4.0 - لوحة تحكم المواطن

**الأولوية:** 🔴 عالية  
**التقدير:** 4-5 أيام  
**الحالة:** ⏳ معلق

---

### v1.4.1 - لوحة التحكم الرئيسية

**التقدير:** 1 يوم

#### المتطلبات:
- [ ] إحصائيات سريعة:
  - [ ] عدد الرسائل المرسلة
  - [ ] عدد الشكاوى المقدمة
  - [ ] عدد الشكاوى المحلولة
  - [ ] عدد التقييمات المعطاة
- [ ] آخر الأنشطة
- [ ] روابط سريعة:
  - [ ] إرسال رسالة جديدة
  - [ ] تقديم شكوى جديدة
  - [ ] تصفح النواب
  - [ ] تصفح المرشحين

#### الربط بقاعدة البيانات:

```typescript
// جلب إحصائيات المواطن
const userId = currentUser.id;

// عدد الرسائل
const { count: messagesCount } = await supabase
  .from('messages')
  .select('*', { count: 'exact', head: true })
  .eq('from_user_id', userId);

// عدد الشكاوى
const { count: complaintsCount } = await supabase
  .from('complaints')
  .select('*', { count: 'exact', head: true })
  .eq('citizen_id', userId);

// عدد الشكاوى المحلولة
const { count: resolvedCount } = await supabase
  .from('complaints')
  .select('*', { count: 'exact', head: true })
  .eq('citizen_id', userId)
  .in('status', ['resolved', 'accepted']);

// عدد التقييمات
const { count: ratingsCount } = await supabase
  .from('ratings')
  .select('*', { count: 'exact', head: true })
  .eq('rater_user_id', userId);
```

#### الملفات:
- `app/citizen/page.tsx` (جديد)
- `components/citizen/DashboardStats.tsx` (جديد)
- `components/citizen/RecentActivity.tsx` (جديد)

---

### v1.4.2 - صفحة الرسائل

**التقدير:** 1 يوم

#### المتطلبات:
- [ ] قائمة الرسائل المرسلة
- [ ] حالة الرسالة (معلقة/مقبولة/مرفوضة)
- [ ] الردود (إن وجدت)
- [ ] زر "إرسال رسالة جديدة"
- [ ] نموذج إرسال رسالة:
  - [ ] اختيار المستلم (نائب/مرشح)
  - [ ] نص الرسالة (حد أقصى 500 حرف)

#### الربط بقاعدة البيانات:

##### 1. جلب الرسائل:
```typescript
const { data: messages } = await supabase
  .from('messages')
  .select(`
    *,
    to_user:to_user_id (first_name, last_name, avatar)
  `)
  .eq('from_user_id', userId)
  .order('created_at', { ascending: false });
```

##### 2. إرسال رسالة جديدة:
```typescript
const { data: message, error } = await supabase
  .from('messages')
  .insert({
    from_user_id: userId,
    to_user_id: recipientId,
    body: messageBody,
    is_approved: false,
  })
  .select()
  .single();

// إشعار للأدمن
await supabase.rpc('add_notification', {
  target_user: adminId,
  n_type: 'content_pending_approval',
  n_ref: message.id,
  n_title: 'رسالة جديدة تحتاج موافقة',
  n_body: `رسالة من ${currentUserName} إلى ${recipientName}`,
});
```

#### الملفات:
- `app/citizen/messages/page.tsx` (جديد)
- `components/citizen/MessagesList.tsx` (جديد)
- `components/citizen/SendMessageModal.tsx` (جديد)

---

### v1.4.3 - صفحة الشكاوى

**التقدير:** 1-2 أيام

#### المتطلبات:
- [ ] قائمة الشكاوى المقدمة
- [ ] فلترة حسب الحالة
- [ ] عرض تفاصيل كل شكوى:
  - [ ] العنوان
  - [ ] النوع
  - [ ] الحالة
  - [ ] المكلف (إن وجد)
  - [ ] التاريخ
  - [ ] المرفقات
  - [ ] سجل الإجراءات
- [ ] زر "تقديم شكوى جديدة"
- [ ] نموذج تقديم شكوى:
  - [ ] العنوان (حد أقصى 100 حرف)
  - [ ] الوصف (حد أقصى 1500 حرف)
  - [ ] نوع الشكوى
  - [ ] المحافظة
  - [ ] رفع مرفقات (صور، ملفات)
  - [ ] الموافقة على النشر العام (checkbox)

#### الربط بقاعدة البيانات:

##### 1. جلب الشكاوى:
```typescript
const { data: complaints } = await supabase
  .from('complaints')
  .select(`
    *,
    complaint_types (name),
    governorates (name),
    assigned:assigned_to (first_name, last_name, avatar),
    complaint_attachments (*),
    complaint_actions (
      *,
      actor:actor_user_id (first_name, last_name)
    )
  `)
  .eq('citizen_id', userId)
  .order('created_at', { ascending: false });
```

##### 2. تقديم شكوى جديدة:
```typescript
// 1. إنشاء الشكوى
const { data: complaint, error } = await supabase
  .from('complaints')
  .insert({
    citizen_id: userId,
    title: title,
    body: body,
    type_id: typeId,
    governorate_id: governorateId,
    agree_publish_public: agreePublish,
    status: 'new',
  })
  .select()
  .single();

// 2. رفع المرفقات
for (const file of files) {
  // رفع الملف إلى Storage
  const fileName = `${complaint.id}/${file.name}`;
  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from('complaints_files')
    .upload(fileName, file);
  
  // إضافة سجل في complaint_attachments
  await supabase
    .from('complaint_attachments')
    .insert({
      complaint_id: complaint.id,
      file_path: fileName,
    });
}

// 3. إشعار للأدمن
await supabase.rpc('add_notification', {
  target_user: adminId,
  n_type: 'new_complaint',
  n_ref: complaint.id,
  n_title: 'شكوى جديدة',
  n_body: `شكوى جديدة من ${currentUserName}: ${complaint.title}`,
});
```

#### الملفات:
- `app/citizen/complaints/page.tsx` (جديد)
- `components/citizen/ComplaintsList.tsx` (جديد)
- `components/citizen/ComplaintDetails.tsx` (جديد)
- `components/citizen/NewComplaintModal.tsx` (جديد)

---

### v1.4.4 - صفحة التقييمات

**التقدير:** 4-5 ساعات

#### المتطلبات:
- [ ] قائمة التقييمات المعطاة
- [ ] إمكانية تعديل التقييم
- [ ] إمكانية حذف التقييم

#### الربط بقاعدة البيانات:

```typescript
// جلب التقييمات
const { data: ratings } = await supabase
  .from('ratings')
  .select(`
    *,
    target:target_user_id (first_name, last_name, avatar)
  `)
  .eq('rater_user_id', userId)
  .order('created_at', { ascending: false});
```

#### الملفات:
- `app/citizen/ratings/page.tsx` (جديد)
- `components/citizen/RatingsList.tsx` (جديد)

---

### v1.4.5 - صفحة الملف الشخصي

**التقدير:** 1 يوم

#### المتطلبات:
- [ ] عرض المعلومات الشخصية
- [ ] تعديل المعلومات:
  - [ ] الاسم الأول والأخير
  - [ ] رقم الهاتف
  - [ ] رقم الواتساب
  - [ ] المحافظة
  - [ ] المدينة
  - [ ] القرية
  - [ ] تاريخ الميلاد
  - [ ] الجنس
  - [ ] الوظيفة
- [ ] تغيير الصورة الشخصية
- [ ] تغيير كلمة المرور

#### الربط بقاعدة البيانات:

##### 1. تحديث المعلومات:
```typescript
const { data, error } = await supabase
  .from('users')
  .update({
    first_name: firstName,
    last_name: lastName,
    phone: phone,
    whatsapp: whatsapp,
    governorate_id: governorateId,
    city: city,
    village: village,
    dob: dob,
    gender: gender,
    job_title: jobTitle,
  })
  .eq('id', userId)
  .select()
  .single();
```

##### 2. تحديث الصورة الشخصية:
```typescript
// رفع الصورة إلى Storage
const fileName = `${userId}/avatar.jpg`;
const { data: uploadData, error: uploadError } = await supabase
  .storage
  .from('avatars')
  .upload(fileName, file, { upsert: true });

// تحديث مسار الصورة في users
await supabase
  .from('users')
  .update({ avatar: fileName })
  .eq('id', userId);
```

##### 3. تغيير كلمة المرور:
```typescript
const { error } = await supabase.auth.updateUser({
  password: newPassword,
});
```

#### الملفات:
- `app/citizen/profile/page.tsx` (جديد)
- `components/citizen/ProfileForm.tsx` (جديد)
- `components/citizen/AvatarUpload.tsx` (جديد)
- `components/citizen/ChangePasswordForm.tsx` (جديد)

---

### ✅ إكمال v1.4.0

```bash
./scripts/release.sh minor "لوحة تحكم المواطن"
git push origin main && git push origin v1.4.0
```

---

## 🎖️ v1.5.0 - لوحة تحكم النائب/المرشح

**الأولوية:** 🔴 عالية  
**التقدير:** 5-6 أيام  
**الحالة:** ⏳ معلق

---

### v1.5.1 - لوحة التحكم الرئيسية

**التقدير:** 1 يوم

#### المتطلبات:
- [ ] إحصائيات سريعة:
  - [ ] عدد الرسائل الواردة
  - [ ] عدد الشكاوى المكلف بها
  - [ ] عدد الشكاوى المحلولة
  - [ ] إجمالي النقاط
  - [ ] متوسط التقييم
- [ ] آخر الرسائل (5 رسائل)
- [ ] آخر الشكاوى (5 شكاوى)
- [ ] روابط سريعة

#### الربط بقاعدة البيانات:

```typescript
const userId = currentUser.id;

// عدد الرسائل الواردة
const { count: messagesCount } = await supabase
  .from('messages')
  .select('*', { count: 'exact', head: true })
  .eq('to_user_id', userId)
  .eq('is_approved', true);

// عدد الشكاوى المكلف بها
const { count: complaintsCount } = await supabase
  .from('complaints')
  .select('*', { count: 'exact', head: true })
  .eq('assigned_to', userId);

// عدد الشكاوى المحلولة
const { count: resolvedCount } = await supabase
  .from('complaints')
  .select('*', { count: 'exact', head: true })
  .eq('assigned_to', userId)
  .in('status', ['resolved', 'accepted']);

// إجمالي النقاط
const { data: userData } = await supabase
  .from('users')
  .select('total_points')
  .eq('id', userId)
  .single();

// متوسط التقييم
const { data: ratings } = await supabase
  .from('ratings')
  .select('stars')
  .eq('target_user_id', userId);

const avgRating = ratings.length > 0
  ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
  : 0;
```

#### الملفات:
- `app/mp/page.tsx` (جديد)
- `app/candidate/page.tsx` (جديد - نفس المحتوى)
- `components/mp/DashboardStats.tsx` (جديد)

---

### v1.5.2 - إدارة الملف الشخصي

**التقدير:** 1-2 أيام

#### المتطلبات:
- [ ] تعديل المعلومات الأساسية
- [ ] تعديل معلومات الملف الشخصي:
  - [ ] المجلس
  - [ ] الحزب/مستقل
  - [ ] الرمز الانتخابي (للمرشحين)
  - [ ] الرقم الانتخابي (للمرشحين)
  - [ ] الدائرة
  - [ ] اللجنة
- [ ] تغيير الصورة الشخصية
- [ ] تغيير البانر الشخصي
- [ ] معاينة الملف الشخصي العام

#### الربط بقاعدة البيانات:

##### 1. تحديث معلومات الملف الشخصي:
```typescript
// تحديث users
await supabase
  .from('users')
  .update({
    first_name: firstName,
    last_name: lastName,
    phone: phone,
    whatsapp: whatsapp,
    email: email,
    governorate_id: governorateId,
    city: city,
    village: village,
    dob: dob,
    gender: gender,
    job_title: jobTitle,
  })
  .eq('id', userId);

// تحديث profiles
await supabase
  .from('profiles')
  .update({
    council_id: councilId,
    party_id: partyId,
    is_independent: isIndependent,
    electoral_symbol_id: symbolId,
    electoral_number: electoralNumber,
    district: district,
    committee: committee,
  })
  .eq('user_id', userId);
```

##### 2. تحديث البانر الشخصي:
```typescript
// رفع البانر إلى Storage
const fileName = `${userId}/banner.jpg`;
const { data: uploadData, error: uploadError } = await supabase
  .storage
  .from('banners')
  .upload(fileName, file, { upsert: true });

// تحديث banners_profile
await supabase
  .from('banners_profile')
  .upsert({
    user_id: userId,
    image_path: fileName,
  });
```

#### الملفات:
- `app/mp/profile/page.tsx` (جديد)
- `app/candidate/profile/page.tsx` (جديد)
- `components/mp/ProfileForm.tsx` (جديد)
- `components/mp/BannerUpload.tsx` (جديد)

---

### v1.5.3 - إدارة المحتوى (إنجازات، مناسبات، برامج)

**التقدير:** 1-2 أيام

#### المتطلبات:
- [ ] قائمة المحتوى المنشور
- [ ] فلترة حسب النوع (إنجاز/مناسبة/برنامج)
- [ ] حالة الموافقة (معلق/مقبول/مرفوض)
- [ ] زر "إضافة محتوى جديد"
- [ ] نموذج إضافة محتوى:
  - [ ] النوع
  - [ ] العنوان (حد أقصى 100 حرف)
  - [ ] الوصف (حد أقصى 500 حرف)
  - [ ] رفع صورة
- [ ] تعديل المحتوى
- [ ] حذف المحتوى

#### الربط بقاعدة البيانات:

##### 1. جلب المحتوى:
```typescript
const { data: contents } = await supabase
  .from('contents')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });
```

##### 2. إضافة محتوى جديد:
```typescript
// 1. رفع الصورة إلى Storage
const fileName = `${userId}/${Date.now()}_${file.name}`;
const { data: uploadData, error: uploadError } = await supabase
  .storage
  .from('contents_images')
  .upload(fileName, file);

// 2. إنشاء المحتوى
const { data: content, error } = await supabase
  .from('contents')
  .insert({
    user_id: userId,
    type: type, // 'achievement', 'event', 'program'
    title: title,
    body: body,
    image_path: fileName,
    is_approved: false, // يحتاج موافقة الأدمن
  })
  .select()
  .single();

// 3. إشعار للأدمن
await supabase.rpc('add_notification', {
  target_user: adminId,
  n_type: 'content_pending_approval',
  n_ref: content.id,
  n_title: 'محتوى جديد يحتاج موافقة',
  n_body: `${contentTypeArabic} جديد من ${currentUserName}: ${content.title}`,
});
```

##### 3. تعديل المحتوى:
```typescript
const { data, error } = await supabase
  .from('contents')
  .update({
    title: title,
    body: body,
    // إذا تم تغيير الصورة، رفع صورة جديدة
  })
  .eq('id', contentId)
  .eq('user_id', userId)
  .select()
  .single();
```

##### 4. حذف المحتوى:
```typescript
// 1. حذف الصورة من Storage
await supabase
  .storage
  .from('contents_images')
  .remove([content.image_path]);

// 2. حذف المحتوى
await supabase
  .from('contents')
  .delete()
  .eq('id', contentId)
  .eq('user_id', userId);
```

#### الملفات:
- `app/mp/contents/page.tsx` (جديد)
- `app/candidate/contents/page.tsx` (جديد)
- `components/mp/ContentsList.tsx` (جديد)
- `components/mp/NewContentModal.tsx` (جديد)
- `components/mp/EditContentModal.tsx` (جديد)

---

### v1.5.4 - صندوق الوارد (الرسائل)

**التقدير:** 1 يوم

#### المتطلبات:
- [ ] قائمة الرسائل الواردة (المقبولة فقط)
- [ ] عرض تفاصيل الرسالة
- [ ] الرد على الرسالة
- [ ] حذف الرسالة

#### الربط بقاعدة البيانات:

##### 1. جلب الرسائل الواردة:
```typescript
const { data: messages } = await supabase
  .from('messages')
  .select(`
    *,
    from_user:from_user_id (first_name, last_name, avatar)
  `)
  .eq('to_user_id', userId)
  .eq('is_approved', true)
  .order('created_at', { ascending: false });
```

##### 2. الرد على رسالة:
```typescript
const { data: reply, error } = await supabase
  .from('messages')
  .insert({
    from_user_id: userId,
    to_user_id: originalMessage.from_user_id,
    body: replyBody,
    is_approved: false, // يحتاج موافقة الأدمن
  })
  .select()
  .single();

// إشعار للأدمن
await supabase.rpc('add_notification', {
  target_user: adminId,
  n_type: 'content_pending_approval',
  n_ref: reply.id,
  n_title: 'رد على رسالة يحتاج موافقة',
  n_body: `رد من ${currentUserName}`,
});
```

#### الملفات:
- `app/mp/messages/page.tsx` (جديد)
- `app/candidate/messages/page.tsx` (جديد)
- `components/mp/MessagesList.tsx` (جديد)
- `components/mp/MessageDetails.tsx` (جديد)
- `components/mp/ReplyModal.tsx` (جديد)

---

### v1.5.5 - إدارة الشكاوى

**التقدير:** 2-3 أيام

#### المتطلبات:
- [ ] قائمة الشكاوى المكلف بها
- [ ] فلترة حسب الحالة
- [ ] عرض تفاصيل الشكوى:
  - [ ] المعلومات الأساسية
  - [ ] المرفقات
  - [ ] سجل الإجراءات
- [ ] إجراءات على الشكوى:
  - [ ] الرد (reply)
  - [ ] التعليق (hold)
  - [ ] الرفض (reject)
  - [ ] القبول (accept)
  - [ ] الحل (resolve)
- [ ] كل إجراء يتطلب ملاحظة

#### الربط بقاعدة البيانات:

##### 1. جلب الشكاوى:
```typescript
const { data: complaints } = await supabase
  .from('complaints')
  .select(`
    *,
    complaint_types (name),
    governorates (name),
    citizen:citizen_id (first_name, last_name, avatar, phone, whatsapp),
    complaint_attachments (*),
    complaint_actions (
      *,
      actor:actor_user_id (first_name, last_name)
    )
  `)
  .eq('assigned_to', userId)
  .order('created_at', { ascending: false});
```

##### 2. اتخاذ إجراء على الشكوى:
```typescript
// 1. تحديث حالة الشكوى
const { data: complaint, error } = await supabase
  .from('complaints')
  .update({
    status: newStatus, // 'responded', 'on_hold', 'rejected', 'accepted', 'resolved'
    points_awarded: newStatus === 'resolved' ? 1 : 0, // منح نقطة عند الحل
  })
  .eq('id', complaintId)
  .select()
  .single();

// 2. إضافة سجل في complaint_actions
await supabase
  .from('complaint_actions')
  .insert({
    complaint_id: complaintId,
    actor_user_id: userId,
    action: action, // 'reply', 'hold', 'reject', 'accept', 'resolve'
    note: note,
  });

// 3. إشعار للمواطن
await supabase.rpc('add_notification', {
  target_user: complaint.citizen_id,
  n_type: 'complaint_status_changed',
  n_ref: complaintId,
  n_title: 'تحديث على شكواك',
  n_body: `تم ${actionArabic} شكواك: ${complaint.title}`,
});

// 4. إذا كان الإجراء "حل"، يتم منح النقاط تلقائياً عبر Trigger
// award_points_on_resolved_complaint()
```

#### الملفات:
- `app/mp/complaints/page.tsx` (جديد)
- `app/candidate/complaints/page.tsx` (جديد)
- `components/mp/ComplaintsList.tsx` (جديد)
- `components/mp/ComplaintDetails.tsx` (جديد)
- `components/mp/ComplaintActionModal.tsx` (جديد)

---

### v1.5.6 - صفحة التقييمات

**التقدير:** 4-5 ساعات

#### المتطلبات:
- [ ] عرض جميع التقييمات
- [ ] متوسط التقييم (نجوم)
- [ ] عدد التقييمات
- [ ] قائمة التقييمات مع:
  - [ ] اسم المقيّم
  - [ ] عدد النجوم
  - [ ] التاريخ

#### الربط بقاعدة البيانات:

```typescript
const { data: ratings } = await supabase
  .from('ratings')
  .select(`
    *,
    rater:rater_user_id (first_name, last_name, avatar)
  `)
  .eq('target_user_id', userId)
  .order('created_at', { ascending: false});

// حساب متوسط التقييم
const avgRating = ratings.length > 0
  ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
  : 0;
```

#### الملفات:
- `app/mp/ratings/page.tsx` (جديد)
- `app/candidate/ratings/page.tsx` (جديد)
- `components/mp/RatingsList.tsx` (جديد)

---

### ✅ إكمال v1.5.0

```bash
./scripts/release.sh minor "لوحة تحكم النائب/المرشح"
git push origin main && git push origin v1.5.0
```

---

## 👨‍💼 v1.6.0 - لوحة تحكم المدير

**الأولوية:** 🟡 متوسطة  
**التقدير:** 3-4 أيام  
**الحالة:** ⏳ معلق

---

### v1.6.1 - لوحة التحكم الرئيسية

**التقدير:** 4-5 ساعات

#### المتطلبات:
- [ ] إحصائيات سريعة:
  - [ ] عدد النواب
  - [ ] عدد المرشحين
  - [ ] عدد الحسابات المعلقة (تحتاج موافقة)
- [ ] آخر الأنشطة
- [ ] روابط سريعة

#### الربط بقاعدة البيانات:

```typescript
// عدد النواب
const { count: mpsCount } = await supabase
  .from('users')
  .select('*', { count: 'exact', head: true })
  .eq('role_id', 4);

// عدد المرشحين
const { count: candidatesCount } = await supabase
  .from('users')
  .select('*', { count: 'exact', head: true })
  .eq('role_id', 5);

// عدد الحسابات المعلقة
// (يمكن إضافة حقل is_approved في users أو استخدام جدول منفصل)
```

#### الملفات:
- `app/manager/page.tsx` (جديد)
- `components/manager/DashboardStats.tsx` (جديد)

---

### v1.6.2 - إنشاء حساب نائب/مرشح

**التقدير:** 1-2 أيام

#### المتطلبات:
- [ ] نموذج إنشاء حساب:
  - [ ] نوع الحساب (نائب/مرشح)
  - [ ] الاسم الأول والأخير
  - [ ] البريد الإلكتروني
  - [ ] كلمة المرور
  - [ ] رقم الهاتف
  - [ ] رقم الواتساب
  - [ ] المحافظة
  - [ ] المدينة
  - [ ] القرية
  - [ ] تاريخ الميلاد
  - [ ] الجنس
  - [ ] الوظيفة
  - [ ] المجلس
  - [ ] الحزب/مستقل
  - [ ] الرمز الانتخابي (للمرشحين)
  - [ ] الرقم الانتخابي (للمرشحين)
  - [ ] الدائرة
  - [ ] اللجنة
  - [ ] رفع صورة شخصية
- [ ] **الحساب يُنشأ بحالة "معلق" ويحتاج موافقة الأدمن**

#### الربط بقاعدة البيانات:

```typescript
// 1. إنشاء مستخدم في Supabase Auth
const { data: authData, error: authError } = await supabase.auth.signUp({
  email: email,
  password: password,
});

// 2. إنشاء سجل في users
const { data: userData, error: userError } = await supabase
  .from('users')
  .insert({
    auth_id: authData.user.id,
    role_id: accountType === 'mp' ? 4 : 5,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
    whatsapp: whatsapp,
    governorate_id: governorateId,
    city: city,
    village: village,
    dob: dob,
    gender: gender,
    job_title: jobTitle,
    avatar: avatarPath,
    // is_approved: false, // إذا أضفنا هذا الحقل
  })
  .select()
  .single();

// 3. إنشاء سجل في profiles
const { data: profileData, error: profileError } = await supabase
  .from('profiles')
  .insert({
    user_id: userData.id,
    council_id: councilId,
    party_id: partyId,
    is_independent: isIndependent,
    electoral_symbol_id: symbolId,
    electoral_number: electoralNumber,
    district: district,
    committee: committee,
    // slug يتم إنشاؤه تلقائياً عبر Trigger generate_slug_arabic()
  })
  .select()
  .single();

// 4. إشعار للأدمن
await supabase.rpc('add_notification', {
  target_user: adminId,
  n_type: 'content_pending_approval',
  n_ref: userData.id,
  n_title: 'حساب جديد يحتاج موافقة',
  n_body: `حساب ${accountTypeArabic} جديد: ${firstName} ${lastName}`,
});
```

#### الملفات:
- `app/manager/accounts/new/page.tsx` (جديد)
- `components/manager/NewAccountForm.tsx` (جديد)

---

### v1.6.3 - إدارة الحسابات

**التقدير:** 1-2 أيام

#### المتطلبات:
- [ ] قائمة جميع النواب والمرشحين
- [ ] فلترة حسب:
  - [ ] النوع (نائب/مرشح)
  - [ ] المحافظة
  - [ ] المجلس
  - [ ] الحزب
  - [ ] الحالة (معلق/مقبول)
- [ ] تعديل الحساب
- [ ] حذف الحساب (soft delete)
- [ ] **التعديلات تحتاج موافقة الأدمن**

#### الربط بقاعدة البيانات:

##### 1. جلب الحسابات:
```typescript
let query = supabase
  .from('users')
  .select(`
    *,
    governorates (name),
    profiles (
      *,
      councils (name),
      parties (name),
      symbols (name, icon_path)
    )
  `)
  .in('role_id', [4, 5]); // mp & candidate

// تطبيق الفلاتر...

const { data: accounts, count } = await query
  .order('created_at', { ascending: false })
  .range(start, end);
```

##### 2. تعديل حساب:
```typescript
// نفس عملية الإنشاء، لكن مع update بدلاً من insert
// ويتم إرسال إشعار للأدمن للموافقة على التعديلات
```

#### الملفات:
- `app/manager/accounts/page.tsx` (جديد)
- `app/manager/accounts/[id]/edit/page.tsx` (جديد)
- `components/manager/AccountsList.tsx` (جديد)
- `components/manager/EditAccountForm.tsx` (جديد)

---

### ✅ إكمال v1.6.0

```bash
./scripts/release.sh minor "لوحة تحكم المدير"
git push origin main && git push origin v1.6.0
```

---

## 👑 v1.7.0 - لوحة تحكم الأدمن

**الأولوية:** 🔴 عالية جداً  
**التقدير:** 5-7 أيام  
**الحالة:** ⏳ معلق

---

### v1.7.1 - لوحة التحكم الرئيسية

**التقدير:** 1 يوم

#### المتطلبات:
- [ ] إحصائيات شاملة:
  - [ ] إجمالي المستخدمين (حسب الدور)
  - [ ] إجمالي الرسائل (معلقة/مقبولة/مرفوضة)
  - [ ] إجمالي الشكاوى (حسب الحالة)
  - [ ] إجمالي المحتوى (معلق/مقبول/مرفوض)
  - [ ] عدد الحسابات المعلقة
- [ ] رسوم بيانية:
  - [ ] الشكاوى حسب النوع
  - [ ] الشكاوى حسب المحافظة
  - [ ] الشكاوى حسب الحالة
  - [ ] المستخدمين حسب الدور
- [ ] آخر الأنشطة
- [ ] روابط سريعة

#### الربط بقاعدة البيانات:

```typescript
// إحصائيات شاملة من جميع الجداول
// استخدام count() لكل جدول
```

#### الملفات:
- `app/admin/page.tsx` (جديد)
- `components/admin/DashboardStats.tsx` (جديد)
- `components/admin/Charts.tsx` (جديد)

---

### v1.7.2 - قائمة الموافقات (Approval Queue)

**التقدير:** 2-3 أيام

#### المتطلبات:
- [ ] صفحة مركزية لجميع العناصر المعلقة:
  - [ ] الرسائل المعلقة
  - [ ] المحتوى المعلق (إنجازات، مناسبات، برامج)
  - [ ] الحسابات المعلقة (من المدير)
  - [ ] التعديلات المعلقة على الحسابات
- [ ] لكل عنصر:
  - [ ] عرض التفاصيل
  - [ ] زر "قبول"
  - [ ] زر "رفض" (مع سبب اختياري)
- [ ] فلترة حسب النوع
- [ ] البحث

#### الربط بقاعدة البيانات:

##### 1. جلب الرسائل المعلقة:
```typescript
const { data: pendingMessages } = await supabase
  .from('messages')
  .select(`
    *,
    from_user:from_user_id (first_name, last_name, avatar),
    to_user:to_user_id (first_name, last_name, avatar)
  `)
  .eq('is_approved', false)
  .order('created_at', { ascending: false });
```

##### 2. جلب المحتوى المعلق:
```typescript
const { data: pendingContents } = await supabase
  .from('contents')
  .select(`
    *,
    user:user_id (first_name, last_name, avatar)
  `)
  .eq('is_approved', false)
  .order('created_at', { ascending: false });
```

##### 3. الموافقة على رسالة:
```typescript
const { data, error } = await supabase
  .from('messages')
  .update({
    is_approved: true,
  })
  .eq('id', messageId)
  .select()
  .single();

// إشعار للمرسل
await supabase.rpc('add_notification', {
  target_user: message.from_user_id,
  n_type: 'content_approved',
  n_ref: messageId,
  n_title: 'تم قبول رسالتك',
  n_body: `تم قبول رسالتك إلى ${recipientName}`,
});

// إشعار للمستلم
await supabase.rpc('add_notification', {
  target_user: message.to_user_id,
  n_type: 'new_message',
  n_ref: messageId,
  n_title: 'رسالة جديدة',
  n_body: `رسالة جديدة من ${senderName}`,
});
```

##### 4. رفض رسالة:
```typescript
const { data, error } = await supabase
  .from('messages')
  .delete()
  .eq('id', messageId);

// إشعار للمرسل
await supabase.rpc('add_notification', {
  target_user: message.from_user_id,
  n_type: 'content_rejected',
  n_ref: messageId,
  n_title: 'تم رفض رسالتك',
  n_body: rejectionReason || 'تم رفض رسالتك',
});
```

##### 5. الموافقة على محتوى:
```typescript
const { data, error } = await supabase
  .from('contents')
  .update({
    is_approved: true,
    approved_by: adminId,
    approved_at: new Date().toISOString(),
  })
  .eq('id', contentId)
  .select()
  .single();

// إشعار للناشر
await supabase.rpc('add_notification', {
  target_user: content.user_id,
  n_type: 'content_approved',
  n_ref: contentId,
  n_title: 'تم قبول محتواك',
  n_body: `تم قبول ${contentTypeArabic}: ${content.title}`,
});
```

#### الملفات:
- `app/admin/approvals/page.tsx` (جديد)
- `components/admin/ApprovalQueue.tsx` (جديد)
- `components/admin/MessageApproval.tsx` (جديد)
- `components/admin/ContentApproval.tsx` (جديد)

---

### v1.7.3 - إدارة المستخدمين

**التقدير:** 1-2 أيام

#### المتطلبات:
- [ ] قائمة جميع المستخدمين
- [ ] فلترة حسب الدور
- [ ] البحث بالاسم أو البريد
- [ ] عرض تفاصيل المستخدم
- [ ] تعديل المستخدم (CRUD كامل)
- [ ] حذف المستخدم
- [ ] تغيير دور المستخدم
- [ ] تعطيل/تفعيل الحساب

#### الربط بقاعدة البيانات:

```typescript
// جلب جميع المستخدمين
const { data: users, count } = await supabase
  .from('users')
  .select(`
    *,
    roles (name),
    governorates (name),
    profiles (*)
  `)
  .order('created_at', { ascending: false })
  .range(start, end);

// تعديل دور المستخدم
await supabase
  .from('users')
  .update({ role_id: newRoleId })
  .eq('id', userId);

// حذف مستخدم (وسيتم حذف profile تلقائياً عبر Trigger)
await supabase
  .from('users')
  .delete()
  .eq('id', userId);
```

#### الملفات:
- `app/admin/users/page.tsx` (جديد)
- `app/admin/users/[id]/page.tsx` (جديد)
- `components/admin/UsersList.tsx` (جديد)
- `components/admin/UserDetails.tsx` (جديد)
- `components/admin/EditUserModal.tsx` (جديد)

---

### v1.7.4 - إدارة الشكاوى

**التقدير:** 1-2 أيام

#### المتطلبات:
- [ ] قائمة جميع الشكاوى
- [ ] فلترة حسب:
  - [ ] الحالة
  - [ ] النوع
  - [ ] المحافظة
  - [ ] المكلف
- [ ] البحث
- [ ] عرض تفاصيل الشكوى
- [ ] **تكليف شكوى لنائب/مرشح**
- [ ] تغيير حالة الشكوى
- [ ] حذف الشكوى

#### الربط بقاعدة البيانات:

##### 1. تكليف شكوى:
```typescript
const { data, error } = await supabase
  .from('complaints')
  .update({
    assigned_to: mpId,
    assigned_by: adminId,
    assigned_at: new Date().toISOString(),
    status: 'assigned',
  })
  .eq('id', complaintId)
  .select()
  .single();

// إضافة سجل في complaint_actions
await supabase
  .from('complaint_actions')
  .insert({
    complaint_id: complaintId,
    actor_user_id: adminId,
    action: 'reassign',
    note: `تم تكليف ${mpName}`,
  });

// إشعار للنائب/المرشح
await supabase.rpc('add_notification', {
  target_user: mpId,
  n_type: 'new_complaint',
  n_ref: complaintId,
  n_title: 'شكوى جديدة مكلف بها',
  n_body: `تم تكليفك بشكوى: ${complaint.title}`,
});

// إشعار للمواطن
await supabase.rpc('add_notification', {
  target_user: complaint.citizen_id,
  n_type: 'complaint_status_changed',
  n_ref: complaintId,
  n_title: 'تحديث على شكواك',
  n_body: `تم تكليف ${mpName} بشكواك`,
});
```

#### الملفات:
- `app/admin/complaints/page.tsx` (جديد)
- `app/admin/complaints/[id]/page.tsx` (جديد)
- `components/admin/ComplaintsList.tsx` (جديد)
- `components/admin/AssignComplaintModal.tsx` (جديد)

---

### v1.7.5 - إدارة البنرات

**التقدير:** 1-2 أيام

#### المتطلبات:
- [ ] قائمة جميع البنرات العامة
- [ ] فلترة حسب:
  - [ ] نوع الصفحة
  - [ ] المحافظة
- [ ] إضافة بانر جديد:
  - [ ] نوع الصفحة (landing, mps, candidates, complaints)
  - [ ] المحافظة (اختياري)
  - [ ] رفع صورة
  - [ ] تحديد كافتراضي
- [ ] تعديل بانر
- [ ] حذف بانر
- [ ] تفعيل/إيقاف بانر

#### الربط بقاعدة البيانات:

##### 1. جلب البنرات:
```typescript
const { data: banners } = await supabase
  .from('banners_public')
  .select(`
    *,
    governorates (name),
    uploaded_by_user:uploaded_by (first_name, last_name)
  `)
  .order('created_at', { ascending: false });
```

##### 2. إضافة بانر:
```typescript
// 1. رفع الصورة
const fileName = `public/${Date.now()}_${file.name}`;
const { data: uploadData, error: uploadError } = await supabase
  .storage
  .from('banners')
  .upload(fileName, file);

// 2. إنشاء سجل
const { data: banner, error } = await supabase
  .from('banners_public')
  .insert({
    page_type: pageType,
    governorate_id: governorateId || null,
    image_path: fileName,
    uploaded_by: adminId,
    is_default: isDefault,
    is_active: true,
  })
  .select()
  .single();
```

#### الملفات:
- `app/admin/banners/page.tsx` (جديد)
- `components/admin/BannersList.tsx` (جديد)
- `components/admin/NewBannerModal.tsx` (جديد)

---

### v1.7.6 - إدارة الأخبار

**التقدير:** 1 يوم

#### المتطلبات:
- [ ] قائمة جميع الأخبار
- [ ] إضافة خبر جديد (نص حتى 255 حرف)
- [ ] تعديل خبر
- [ ] حذف خبر
- [ ] تفعيل/إيقاف خبر
- [ ] إعدادات الشريط الإخباري:
  - [ ] الاتجاه (RTL/LTR)
  - [ ] السرعة (بالثواني)

#### الربط بقاعدة البيانات:

##### 1. جلب الأخبار:
```typescript
const { data: news } = await supabase
  .from('news')
  .select('*')
  .order('created_at', { ascending: false });
```

##### 2. إضافة خبر:
```typescript
const { data, error } = await supabase
  .from('news')
  .insert({
    text: newsText,
    is_active: true,
  })
  .select()
  .single();
```

##### 3. تحديث إعدادات الشريط:
```typescript
const { data, error } = await supabase
  .from('news_settings')
  .update({
    direction: direction, // 'rtl' or 'ltr'
    speed_seconds: speed,
    updated_by: adminId,
  })
  .eq('id', 1) // assuming single row
  .select()
  .single();
```

#### الملفات:
- `app/admin/news/page.tsx` (جديد)
- `components/admin/NewsList.tsx` (جديد)
- `components/admin/NewsSettings.tsx` (جديد)

---

### v1.7.7 - إدارة الإعدادات

**التقدير:** 1 يوم

#### المتطلبات:
- [ ] قائمة جميع الإعدادات من جدول `settings`
- [ ] تعديل الإعدادات:
  - [ ] معلومات الاتصال (email, phone, address)
  - [ ] روابط التواصل الاجتماعي
  - [ ] إعدادات عداد الزوار:
    - [ ] الحد الأدنى
    - [ ] الحد الأقصى
    - [ ] فترة التحديث (بالثواني)

#### الربط بقاعدة البيانات:

##### 1. جلب الإعدادات:
```typescript
const { data: settings } = await supabase
  .from('settings')
  .select('*')
  .order('key');
```

##### 2. تحديث إعداد:
```typescript
const { data, error } = await supabase
  .from('settings')
  .update({
    value: newValue,
    updated_by: adminId,
  })
  .eq('key', settingKey)
  .select()
  .single();
```

##### 3. تحديث إعدادات عداد الزوار:
```typescript
const { data, error } = await supabase
  .from('visitor_counter_settings')
  .update({
    min_value: minValue,
    max_value: maxValue,
    change_interval_seconds: interval,
  })
  .eq('id', 1)
  .select()
  .single();
```

#### الملفات:
- `app/admin/settings/page.tsx` (جديد)
- `components/admin/SettingsForm.tsx` (جديد)
- `components/admin/VisitorCounterSettings.tsx` (جديد)

---

### ✅ إكمال v1.7.0

```bash
./scripts/release.sh minor "لوحة تحكم الأدمن"
git push origin main && git push origin v1.7.0
```

---

## 🔔 v1.8.0 - نظام الإشعارات

**الأولوية:** 🟡 متوسطة  
**التقدير:** 2-3 أيام  
**الحالة:** ⏳ معلق

---

### v1.8.1 - مكون جرس الإشعارات

**التقدير:** 1 يوم

#### المتطلبات:
- [ ] أيقونة جرس في Header
- [ ] Badge يعرض عدد الإشعارات غير المقروءة
- [ ] قائمة منسدلة عند النقر:
  - [ ] آخر 5 إشعارات
  - [ ] عنوان الإشعار
  - [ ] نص الإشعار
  - [ ] الوقت (منذ كم)
  - [ ] حالة القراءة
  - [ ] رابط "عرض الكل"
- [ ] تحديث تلقائي كل 30 ثانية

#### الربط بقاعدة البيانات:

##### 1. جلب الإشعارات:
```typescript
const { data: notifications } = await supabase
  .from('notifications')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  .limit(5);

// عدد الإشعارات غير المقروءة
const { count: unreadCount } = await supabase
  .from('notifications')
  .select('*', { count: 'exact', head: true })
  .eq('user_id', userId)
  .eq('is_read', false);
```

##### 2. تحديد إشعار كمقروء:
```typescript
const { data, error } = await supabase
  .from('notifications')
  .update({ is_read: true })
  .eq('id', notificationId)
  .select()
  .single();
```

#### الملفات:
- `components/ui/NotificationBell.tsx` (تحديث)
- `components/ui/NotificationDropdown.tsx` (جديد)

---

### v1.8.2 - صفحة جميع الإشعارات

**التقدير:** 4-5 ساعات

#### المتطلبات:
- [ ] قائمة جميع الإشعارات
- [ ] فلترة حسب النوع
- [ ] فلترة حسب حالة القراءة
- [ ] زر "تحديد الكل كمقروء"
- [ ] حذف إشعار

#### الربط بقاعدة البيانات:

```typescript
// جلب جميع الإشعارات
const { data: notifications, count } = await supabase
  .from('notifications')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
  .range(start, end);

// تحديد الكل كمقروء
await supabase
  .from('notifications')
  .update({ is_read: true })
  .eq('user_id', userId)
  .eq('is_read', false);
```

#### الملفات:
- `app/notifications/page.tsx` (جديد)
- `components/notifications/NotificationsList.tsx` (جديد)

---

### v1.8.3 - Realtime Notifications (اختياري)

**التقدير:** 1 يوم

#### المتطلبات:
- [ ] استخدام Supabase Realtime للإشعارات الفورية
- [ ] تحديث Badge تلقائياً عند وصول إشعار جديد
- [ ] إشعار Toast عند وصول إشعار جديد

#### الربط بقاعدة البيانات:

```typescript
// الاشتراك في التحديثات الفورية
const channel = supabase
  .channel('notifications')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      // تحديث قائمة الإشعارات
      // عرض Toast
    }
  )
  .subscribe();
```

#### الملفات:
- `lib/realtime.ts` (جديد)
- `hooks/useNotifications.ts` (جديد)

---

### ✅ إكمال v1.8.0

```bash
./scripts/release.sh minor "نظام الإشعارات"
git push origin main && git push origin v1.8.0
```

---

## 🧪 v1.9.0 - الاختبار والتحسين

**الأولوية:** 🟡 متوسطة  
**التقدير:** 3-5 أيام  
**الحالة:** ⏳ معلق

---

### v1.9.1 - اختبار الوظائف

**التقدير:** 2-3 أيام

#### المهام:
- [ ] اختبار جميع صفحات المصادقة
- [ ] اختبار جميع لوحات التحكم
- [ ] اختبار جميع النماذج
- [ ] اختبار رفع الملفات
- [ ] اختبار الإشعارات
- [ ] اختبار الصلاحيات (RLS)
- [ ] اختبار التوجيه حسب الأدوار

---

### v1.9.2 - تحسين الأداء

**التقدير:** 1-2 أيام

#### المهام:
- [ ] تحسين استعلامات قاعدة البيانات
- [ ] إضافة Indexes مناسبة
- [ ] تحسين تحميل الصور (lazy loading)
- [ ] تحسين حجم Bundle (code splitting)
- [ ] إضافة Caching مناسب
- [ ] تحسين SEO

---

### v1.9.3 - إصلاح الأخطاء

**التقدير:** 1-2 أيام

#### المهام:
- [ ] إصلاح جميع الأخطاء المكتشفة
- [ ] مراجعة جميع الملاحظات المذكورة في TODO
- [ ] التأكد من:
  - [ ] البانر لا يظهر كصورة مفقودة
  - [ ] صفحات المصادقة تحتوي على Header و Footer
  - [ ] جميع الصفحات تستخدم خط Tajawal
  - [ ] المسافات البينية متساوية
  - [ ] الفوتر بدون نصوص زائدة
  - [ ] الشريط الإخباري يطابق التصميم
  - [ ] الهيدر الأبيض له ظل
  - [ ] المشروع يستخدم Next.js 15 (وليس React/Vite)

---

### ✅ إكمال v1.9.0

```bash
./scripts/release.sh minor "الاختبار والتحسين"
git push origin main && git push origin v1.9.0
```

---

## 🚀 v2.0.0 - الإطلاق النهائي

**الأولوية:** 🔴 عالية جداً  
**التقدير:** 2-3 أيام  
**الحالة:** ⏳ معلق

---

### v2.0.1 - الإعداد النهائي

**التقدير:** 1 يوم

#### المهام:
- [ ] مراجعة نهائية لجميع الصفحات
- [ ] التأكد من جميع الروابط تعمل
- [ ] التأكد من جميع الصور محملة
- [ ] مراجعة جميع النصوص
- [ ] إضافة favicon
- [ ] إضافة og:image للمشاركة
- [ ] إعداد Google Analytics (اختياري)

---

### v2.0.2 - النشر النهائي

**التقدير:** 4-5 ساعات

#### المهام:
- [ ] التأكد من جميع المتغيرات البيئية على Vercel
- [ ] التأكد من RLS مُفعّل على جميع الجداول
- [ ] التأكد من Storage Policies صحيحة
- [ ] تفعيل Backups اليومية في Supabase
-
