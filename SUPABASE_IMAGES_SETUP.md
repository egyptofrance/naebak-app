# تعليمات رفع الصور إلى Supabase Storage

## معلومات المشروع
- **اسم المشروع**: naebak-kk
- **Project ID**: brjgqodpzrhjfwteryse
- **URL**: https://brjgqodpzrhjfwteryse.supabase.co

## خطوات رفع الصور

### 1. الدخول إلى لوحة تحكم Supabase
انتقل إلى: https://supabase.com/dashboard/project/brjgqodpzrhjfwteryse

### 2. إنشاء Storage Bucket
1. اذهب إلى قسم **Storage** في القائمة الجانبية
2. انقر على **Create a new bucket**
3. اسم الـ bucket: `banner_public_images`
4. تأكد من تفعيل **Public bucket** ✅
5. انقر على **Create bucket**

### 3. رفع الصور المطلوبة
قم برفع الصور التالية إلى bucket `banner_public_images`:

#### الصور المطلوبة:
- ✅ `logo-naebak-green.png` - اللوجو الأخضر
- ✅ `logo-naebak-white.png` - اللوجو الأبيض  
- ✅ `sisi-banner.jpg` - صورة البانر
- ✅ `favicon-16x16.png` - فيفأيقون 16x16
- ✅ `favicon-32x32.png` - فيفأيقون 32x32
- ✅ `favicon.ico` - الفيفأيقون الرئيسي
- ✅ `apple-touch-icon.png` - أيقونة Apple Touch

### 4. التحقق من الروابط
بعد رفع الصور، ستكون متاحة على الروابط التالية:

```
https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/logo-naebak-green.png
https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/logo-naebak-white.png
https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/sisi-banner.jpg
https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/favicon-16x16.png
https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/favicon-32x32.png
https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/favicon.ico
https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/apple-touch-icon.png
```

### 5. إعداد متغيرات البيئة
تأكد من إنشاء ملف `.env.local` في جذر المشروع مع المحتوى التالي:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://brjgqodpzrhjfwteryse.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyamdxb2RwenJoamZ3dGVyeXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4Njk2OTEsImV4cCI6MjA3NTQ0NTY5MX0.pS7Q7ZRCqVvQssC29tJANmdnjn8Xo1Hj_A9IrXkkOXs
```

### 6. اختبار الموقع
بعد رفع الصور وإعداد متغيرات البيئة:
1. قم بتشغيل الموقع محلياً: `npm run dev`
2. تحقق من ظهور اللوجو والأيقونات بشكل صحيح
3. تأكد من أن الألوان الجديدة تظهر بشكل صحيح

## ملاحظات مهمة
- ✅ تم تحديث جميع مسارات الصور في الكود
- ✅ تم تحديث الألوان حسب المطلوب
- ✅ تم إنشاء نظام تكوين منظم لإدارة الصور
- ⚠️ تأكد من أن bucket `banner_public_images` مُعرّف كـ **Public**

## في حالة وجود مشاكل
إذا لم تظهر الصور:
1. تحقق من أن الـ bucket عام (Public)
2. تحقق من أسماء الملفات (يجب أن تطابق تماماً)
3. تحقق من متغيرات البيئة في ملف `.env.local`
