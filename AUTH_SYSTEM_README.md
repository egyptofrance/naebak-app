# نظام المصادقة v1.2.0 - نائبك.com

## نظرة عامة

تم تنفيذ نظام المصادقة الكامل للتطبيق بما يشمل:

- ✅ تسجيل الدخول
- ✅ إنشاء حساب جديد (للمواطنين)
- ✅ نسيان كلمة المرور
- ✅ إعادة تعيين كلمة المرور
- ✅ Middleware للحماية والتحقق من الصلاحيات
- ✅ Dashboard مركزي للتوجيه حسب الدور
- ✅ Header و Footer في جميع صفحات المصادقة
- ✅ استخدام خط Tajawal

---

## الملفات التي تم إنشاؤها

### 1. ملفات المصادقة الأساسية

#### `lib/auth.ts`
يحتوي على جميع دوال المصادقة:
- `signInWithEmail()` - تسجيل الدخول
- `signUpWithEmail()` - إنشاء حساب جديد
- `signOut()` - تسجيل الخروج
- `resetPassword()` - إرسال رابط إعادة تعيين كلمة المرور
- `updatePassword()` - تحديث كلمة المرور
- `getCurrentUser()` - جلب المستخدم الحالي
- `getUserRole()` - جلب دور المستخدم
- `getGovernorates()` - جلب قائمة المحافظات

#### `lib/permissions.ts`
يحتوي على نظام الصلاحيات:
- تعريف الأدوار (admin, manager, citizen, mp, candidate)
- مسارات كل دور
- دوال التحقق من الصلاحيات

---

### 2. صفحات المصادقة

#### `app/(auth)/login/page.tsx`
صفحة تسجيل الدخول مع:
- Header و Footer
- نموذج تسجيل الدخول
- رابط إنشاء حساب جديد
- رابط نسيان كلمة المرور

#### `app/(auth)/register/page.tsx`
صفحة إنشاء حساب جديد مع:
- Header و Footer
- نموذج التسجيل الكامل (جميع الحقول المطلوبة)
- قائمة منسدلة للمحافظات
- التحقق من صحة البيانات

#### `app/(auth)/forgot-password/page.tsx`
صفحة نسيان كلمة المرور مع:
- Header و Footer
- نموذج إرسال رابط إعادة التعيين

#### `app/(auth)/reset-password/page.tsx`
صفحة إعادة تعيين كلمة المرور مع:
- Header و Footer
- نموذج تحديث كلمة المرور

#### `app/(auth)/layout.tsx`
Layout خاص بصفحات المصادقة مع خط Tajawal

---

### 3. مكونات المصادقة

#### `components/auth/LoginForm.tsx`
نموذج تسجيل الدخول مع:
- حقول البريد الإلكتروني وكلمة المرور
- معالجة الأخطاء
- مؤشر تحميل
- التوجيه إلى Dashboard بعد النجاح

#### `components/auth/RegisterForm.tsx`
نموذج التسجيل مع:
- جميع الحقول المطلوبة (الاسم، البريد، الهاتف، المحافظة، إلخ)
- التحقق من صحة البيانات
- قائمة المحافظات من قاعدة البيانات
- موافقة على الشروط والأحكام

#### `components/auth/ForgotPasswordForm.tsx`
نموذج نسيان كلمة المرور

#### `components/auth/ResetPasswordForm.tsx`
نموذج إعادة تعيين كلمة المرور

---

### 4. Middleware والحماية

#### `middleware.ts`
Middleware للحماية يقوم بـ:
- التحقق من تسجيل الدخول
- التحقق من الصلاحيات حسب الدور
- إعادة توجيه غير المصرح لهم
- حماية المسارات المحمية

المسارات المحمية:
- `/admin` - للمدير فقط
- `/manager` - للمدير والمشرف
- `/citizen` - للمواطنين والمشرفين والمدير
- `/mp` - للنواب والمدير
- `/candidate` - للمرشحين والمدير
- `/dashboard` - لجميع المستخدمين المسجلين

---

### 5. Dashboard والتوجيه

#### `app/dashboard/page.tsx`
صفحة Dashboard المركزية التي:
- تجلب المستخدم الحالي
- تحدد دوره
- توجهه إلى الصفحة المناسبة:
  - Admin → `/admin`
  - Manager → `/manager`
  - Citizen → `/citizen`
  - MP → `/mp`
  - Candidate → `/candidate`

#### `app/auth/callback/route.ts`
معالج callback لـ Supabase Auth

#### `app/unauthorized/page.tsx`
صفحة عدم التصريح مع Header و Footer

---

## الربط مع قاعدة البيانات

### جداول قاعدة البيانات المستخدمة:

1. **users** - بيانات المستخدمين
   - `auth_id` - معرف Supabase Auth
   - `role_id` - معرف الدور
   - `first_name`, `last_name` - الاسم
   - `email`, `phone`, `whatsapp` - معلومات الاتصال
   - `governorate_id`, `city`, `village` - العنوان
   - `dob`, `gender`, `job_title` - معلومات شخصية

2. **roles** - الأدوار
   - `id` - معرف الدور
   - `name` - اسم الدور (admin, manager, citizen, mp, candidate)

3. **governorates** - المحافظات
   - `id` - معرف المحافظة
   - `name` - اسم المحافظة

---

## إعدادات Supabase المطلوبة

### 1. تفعيل Email/Password Provider
في لوحة تحكم Supabase:
- Authentication → Providers → Email
- تفعيل Email Provider

### 2. إعداد Redirect URLs
في لوحة تحكم Supabase:
- Authentication → URL Configuration
- إضافة:
  - `http://localhost:3000/auth/callback`
  - `https://naebak-com.vercel.app/auth/callback`

### 3. متغيرات البيئة
في ملف `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## كيفية الاستخدام

### تسجيل الدخول
1. المستخدم يذهب إلى `/login`
2. يدخل البريد الإلكتروني وكلمة المرور
3. بعد النجاح، يتم توجيهه إلى `/dashboard`
4. Dashboard يوجهه إلى صفحته حسب دوره

### إنشاء حساب جديد
1. المستخدم يذهب إلى `/register`
2. يملأ جميع الحقول المطلوبة
3. يوافق على الشروط والأحكام
4. بعد النجاح، يتم توجيهه إلى `/login`
5. يسجل الدخول ويتم توجيهه إلى `/citizen` (دور المواطن)

### نسيان كلمة المرور
1. المستخدم يذهب إلى `/forgot-password`
2. يدخل بريده الإلكتروني
3. يتلقى رابط إعادة التعيين في بريده
4. يضغط على الرابط ويذهب إلى `/reset-password`
5. يدخل كلمة المرور الجديدة
6. يتم توجيهه إلى `/login`

---

## الاختبار

### اختبار تسجيل الدخول
```bash
# تشغيل التطبيق
npm run dev

# الذهاب إلى
http://localhost:3000/login
```

### اختبار التسجيل
```bash
# الذهاب إلى
http://localhost:3000/register
```

### اختبار الحماية
```bash
# محاولة الوصول إلى صفحة محمية بدون تسجيل دخول
http://localhost:3000/admin
# يجب أن يتم توجيهك إلى /login
```

---

## الملاحظات المهمة

1. ✅ جميع صفحات المصادقة تحتوي على Header و Footer
2. ✅ تم استخدام خط Tajawal في جميع الصفحات
3. ✅ Middleware يحمي جميع المسارات المحمية
4. ✅ نظام الأدوار يعمل بشكل كامل
5. ✅ التحقق من صحة البيانات في جميع النماذج
6. ✅ معالجة الأخطاء في جميع العمليات
7. ✅ مؤشرات التحميل في جميع النماذج

---

## التحسينات المستقبلية

- [ ] إضافة تأكيد البريد الإلكتروني
- [ ] إضافة تسجيل الدخول بواسطة Google/Facebook
- [ ] إضافة Two-Factor Authentication
- [ ] إضافة صفحة الملف الشخصي
- [ ] إضافة إمكانية تحديث البيانات الشخصية
- [ ] إضافة سجل تسجيلات الدخول

---

## الدعم

للمساعدة أو الإبلاغ عن مشاكل، يرجى التواصل مع فريق التطوير.
