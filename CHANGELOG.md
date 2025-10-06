# Changelog

جميع التغييرات المهمة في هذا المشروع سيتم توثيقها في هذا الملف.

التنسيق مبني على [Keep a Changelog](https://keepachangelog.com/ar/1.0.0/)،
وهذا المشروع يتبع [Semantic Versioning](https://semver.org/lang/ar/).

## [Unreleased]

### قيد التطوير
- لا توجد تغييرات قيد التطوير حالياً

## [1.0.0] - 2025-10-06

### تمت الإضافة
- إعداد المشروع الأولي باستخدام Next.js 15.1.3
- تكامل Supabase لقاعدة البيانات
- إعداد Tailwind CSS للتصميم
- إعداد TypeScript
- نشر المشروع على Vercel
- إعداد النشر التلقائي من GitHub
- إضافة المتغيرات البيئية
- إنشاء schema قاعدة البيانات الأساسي

### تم التغيير
- لا يوجد

### تم الإصلاح
- لا يوجد

---

## دليل الإصدارات (Semantic Versioning)

الصيغة: `MAJOR.MINOR.PATCH`

- **MAJOR**: تغييرات كبيرة غير متوافقة مع الإصدارات السابقة
- **MINOR**: إضافة ميزات جديدة متوافقة مع الإصدارات السابقة
- **PATCH**: إصلاحات وتحسينات صغيرة

### أمثلة:
- `1.0.0` → `1.0.1`: إصلاح bug صغير
- `1.0.0` → `1.1.0`: إضافة ميزة جديدة
- `1.0.0` → `2.0.0`: تغيير كبير في البنية

---

## كيفية إنشاء إصدار جديد

### 1. تحديث CHANGELOG.md
```bash
# أضف التغييرات تحت قسم [Unreleased]
```

### 2. تحديث VERSION
```bash
# غيّر رقم الإصدار في ملف VERSION
echo "1.0.1" > VERSION
```

### 3. Commit التغييرات
```bash
git add .
git commit -m "Release v1.0.1: وصف التغييرات"
```

### 4. إنشاء Tag
```bash
git tag -a v1.0.1 -m "Release v1.0.1"
```

### 5. Push إلى GitHub
```bash
git push origin main
git push origin v1.0.1
```

### 6. النشر التلقائي
سيتم نشر الإصدار الجديد تلقائياً على Vercel!

---

## الرجوع لإصدار سابق

### عرض جميع الإصدارات
```bash
git tag -l
```

### الرجوع لإصدار معين
```bash
# عرض الكود فقط
git checkout v1.0.0

# إنشاء branch جديد من الإصدار
git checkout -b hotfix-v1.0.0 v1.0.0
```

### نشر إصدار سابق على Vercel
```bash
# إنشاء branch جديد من الإصدار السابق
git checkout -b deploy-v1.0.0 v1.0.0

# Push إلى GitHub
git push origin deploy-v1.0.0

# سيتم نشره تلقائياً كـ Preview Deployment
```

---

[Unreleased]: https://github.com/egyptofrance/naebak-app/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/egyptofrance/naebak-app/releases/tag/v1.0.0
