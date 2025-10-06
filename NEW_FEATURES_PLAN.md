# خطة تطوير المميزات الجديدة v1.3.0

## 📋 المتطلبات

### 1. صفحات المستخدمين (User Profiles)

#### للمواطن (Citizen)
- **المسار:** `/citizen/[user_id]` أو `/profile/[slug]`
- **الأقسام:**
  - البيانات الشخصية (الاسم، الصورة، المحافظة، المدينة، الوظيفة)
  - إدارة الرسائل (الرسائل المرسلة والمستقبلة)
  - إدارة الشكاوى (الشكاوى المقدمة وحالتها)

#### للنائب (MP)
- **المسار:** `/mp/[slug]`
- **الأقسام:**
  - البيانات الشخصية والمهنية
  - المجلس (مجلس النواب / مجلس الشيوخ)
  - الحزب / مستقل
  - الدائرة الانتخابية
  - الرمز الانتخابي
  - إدارة الرسائل
  - إدارة الشكاوى المكلف بها
  - المحتوى (إنجازات، فعاليات، برامج)
  - النقاط المكتسبة

#### للمرشح (Candidate)
- **المسار:** `/candidate/[slug]`
- **الأقسام:** نفس أقسام النائب

### 2. تحديث Header بعد تسجيل الدخول

#### قبل تسجيل الدخول
- زر "تسجيل"
- زر "دخول"

#### بعد تسجيل الدخول
- اسم المستخدم (الاسم الأول + الأخير)
- قائمة منسدلة تحتوي على:
  - "لوحة التحكم" → يوجه إلى `/dashboard` أو مباشرة إلى لوحة التحكم الخاصة بالدور
  - "تسجيل الخروج" → يقوم بتسجيل الخروج

### 3. تحديث نموذج التسجيل

#### الحقول الحالية (موجودة)
- الاسم الأول والأخير ✅
- البريد الإلكتروني ✅
- كلمة المرور ✅
- رقم الهاتف والواتساب ✅
- المحافظة ✅
- المدينة والقرية ✅
- تاريخ الميلاد ✅
- الجنس ✅
- الوظيفة ✅

#### الحقول المطلوب إضافتها
- **نوع الحساب** (dropdown):
  - مواطن (افتراضي)
  - نائب حالي
  - مرشح

- **إذا اختار "نائب حالي":**
  - المجلس (dropdown): مجلس النواب / مجلس الشيوخ
  - الحزب (dropdown): قائمة الأحزاب + مستقل
  - الدائرة الانتخابية (text)
  - الرمز الانتخابي (dropdown)
  - الرقم الانتخابي (text)
  - اللجنة (text)

- **إذا اختار "مرشح":**
  - المجلس (dropdown): مجلس النواب / مجلس الشيوخ
  - الحزب (dropdown): قائمة الأحزاب + مستقل
  - الدائرة الانتخابية (text)
  - الرمز الانتخابي (dropdown)
  - الرقم الانتخابي (text)

---

## 🗄️ بنية قاعدة البيانات

### الجداول الرئيسية

#### `users`
```sql
- id (uuid, PK)
- auth_id (uuid, FK to auth.users)
- role_id (bigint, FK to roles)
- first_name (text)
- last_name (text)
- email (text, unique)
- dob (date)
- governorate_id (bigint, FK to governorates)
- city (text)
- village (text)
- phone (text)
- whatsapp (text)
- avatar (text)
- job_title (text)
- gender (text: "ذكر"/"أنثى")
- total_points (int, default 0)
- created_at (timestamptz)
- updated_at (timestamptz)
```

#### `profiles` (للنواب والمرشحين فقط)
```sql
- user_id (uuid, PK, FK to users)
- council_id (bigint, FK to councils)
- party_id (bigint, FK to parties)
- is_independent (boolean)
- electoral_symbol_id (bigint, FK to symbols)
- electoral_number (text)
- district (text)
- committee (text)
- banner_path (text)
- slug (text, unique)
- created_at (timestamptz)
```

#### `roles`
```sql
- id (bigint, PK)
- name (text): "admin", "manager", "citizen", "mp", "candidate"
```

#### `councils`
```sql
- id (bigint, PK)
- name (text): "مجلس النواب", "مجلس الشيوخ"
```

#### `parties`
```sql
- id (bigint, PK)
- name (text): "مستقل", "حزب الوفد", "حزب حماة وطن", إلخ.
```

#### `symbols`
```sql
- id (bigint, PK)
- name (text)
- icon_path (text)
```

#### `messages`
```sql
- id (bigint, PK)
- from_user_id (uuid, FK to users)
- to_user_id (uuid, FK to users)
- body (text, max 500 chars)
- is_approved (boolean, default false)
- created_at (timestamptz)
```

#### `complaints`
```sql
- id (bigint, PK)
- citizen_id (uuid, FK to users)
- title (varchar 100)
- body (varchar 1500)
- type_id (bigint, FK to complaint_types)
- governorate_id (bigint, FK to governorates)
- agree_publish_public (boolean)
- assigned_to (uuid, FK to users)
- assigned_by (uuid, FK to users)
- status (text: "new", "assigned", "responded", إلخ.)
- points_awarded (int)
- assigned_at (timestamptz)
- hold_until (timestamptz)
- due_date (timestamptz)
- created_at (timestamptz)
```

---

## 🎯 خطة التنفيذ

### المرحلة 1: تحديث نموذج التسجيل ✅ (سنبدأ بها)

#### 1.1. جلب البيانات المرجعية من Supabase
- جلب `councils` (المجالس)
- جلب `parties` (الأحزاب)
- جلب `symbols` (الرموز الانتخابية)

#### 1.2. تحديث `RegisterForm.tsx`
- إضافة حقل "نوع الحساب" (dropdown)
- إضافة حقول النائب/المرشح (تظهر conditionally)
- تحديث validation
- تحديث API call لإنشاء الحساب

#### 1.3. تحديث API `/api/auth/signup`
- إنشاء user في `users` table
- إذا كان نائب أو مرشح، إنشاء profile في `profiles` table
- ربط `auth_id` مع Supabase Auth
- تعيين `role_id` الصحيح

### المرحلة 2: صفحات المستخدمين (User Profiles)

#### 2.1. صفحة المواطن
- `app/citizen/[id]/page.tsx`
- عرض البيانات الشخصية
- قسم الرسائل
- قسم الشكاوى

#### 2.2. صفحة النائب
- `app/mp/[slug]/page.tsx`
- عرض البيانات الشخصية والمهنية
- قسم الرسائل
- قسم الشكاوى
- قسم المحتوى
- عرض النقاط

#### 2.3. صفحة المرشح
- `app/candidate/[slug]/page.tsx`
- نفس محتوى صفحة النائب

### المرحلة 3: تحديث Header

#### 3.1. إنشاء مكون `UserMenu`
- عرض اسم المستخدم
- قائمة منسدلة
- رابط لوحة التحكم
- زر تسجيل الخروج

#### 3.2. تحديث `Header.tsx`
- استخدام `getUser()` للتحقق من تسجيل الدخول
- عرض `UserMenu` إذا كان مسجل دخول
- عرض أزرار "تسجيل" و "دخول" إذا لم يكن مسجل دخول

### المرحلة 4: لوحات التحكم (Dashboards)

#### 4.1. Citizen Dashboard
- `app/dashboard/citizen/page.tsx`
- عرض ملخص الرسائل والشكاوى
- روابط سريعة

#### 4.2. MP Dashboard
- `app/dashboard/mp/page.tsx`
- عرض ملخص الرسائل والشكاوى المكلف بها
- عرض النقاط
- إدارة المحتوى

#### 4.3. Candidate Dashboard
- `app/dashboard/candidate/page.tsx`
- نفس محتوى MP Dashboard

---

## 📝 الملفات المطلوب إنشاؤها/تعديلها

### تعديلات
1. `components/auth/RegisterForm.tsx` - تحديث النموذج
2. `components/layout/Header.tsx` - إضافة UserMenu
3. `lib/auth.ts` - إضافة دوال جديدة
4. `app/(auth)/register/page.tsx` - تحديث الصفحة

### ملفات جديدة
1. `components/auth/UserMenu.tsx` - قائمة المستخدم المنسدلة
2. `app/citizen/[id]/page.tsx` - صفحة المواطن
3. `app/mp/[slug]/page.tsx` - صفحة النائب
4. `app/candidate/[slug]/page.tsx` - صفحة المرشح
5. `app/dashboard/citizen/page.tsx` - لوحة تحكم المواطن
6. `app/dashboard/mp/page.tsx` - لوحة تحكم النائب
7. `app/dashboard/candidate/page.tsx` - لوحة تحكم المرشح
8. `lib/supabase-queries.ts` - دوال جلب البيانات من Supabase

---

## ⚙️ متغيرات البيئة المطلوبة

يجب التأكد من وجود هذه المتغيرات في `.env.local` و Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://hgnsgecejirhafynztdi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🚀 البدء في التنفيذ

سنبدأ بالمرحلة 1: تحديث نموذج التسجيل

### الخطوات:
1. ✅ جلب البيانات المرجعية من Supabase
2. ✅ تحديث `RegisterForm.tsx`
3. ✅ تحديث API signup
4. ✅ الاختبار

---

**تاريخ الإنشاء:** 2025-10-06  
**الإصدار المستهدف:** v1.3.0  
**الحالة:** 🚧 قيد التطوير
