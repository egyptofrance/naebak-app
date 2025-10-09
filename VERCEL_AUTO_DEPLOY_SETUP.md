# دليل ضبط النشر التلقائي في Vercel

## 🎯 الهدف
ضبط Vercel بحيث يتم النشر التلقائي على الدومين الثابت `naebak.com` عند كل push إلى الفرع `main` بدون إنشاء روابط جديدة.

## 📋 الخطوات المطلوبة

### 1. التحقق من إعدادات Git Integration

**المسار:** Project Settings → Git

**التأكد من:**
- ✅ **Repository:** `egyptofrance/naebak-app` مربوط
- ✅ **Production Branch:** `main` 
- ✅ **Automatically deploy changes:** مفعل
- ✅ **Deploy Hooks:** مفعل إذا لزم الأمر

### 2. ضبط إعدادات الـ Deployments

**المسار:** Project → Deployments

**الخطوات:**
1. **البحث عن آخر deployment** (commit `b6cfff2`)
2. **الضغط على الـ deployment**
3. **الضغط على "Promote to Production"**
4. **تأكيد العملية**

### 3. التحقق من إعدادات الدومين

**المسار:** Project Settings → Domains

**التأكد من:**
- ✅ `naebak.com` → **Production** (ليس Preview)
- ✅ `www.naebak.com` → **Production**
- ✅ `naebak-com.vercel.app` → **Production**

### 4. ضبط إعدادات Build & Development

**المسار:** Project Settings → Build and Deployment

**التأكد من:**
- ✅ **Framework Preset:** Next.js
- ✅ **Build Command:** `npm run build` أو تلقائي
- ✅ **Output Directory:** `.next` أو تلقائي
- ✅ **Install Command:** `npm install` أو تلقائي

## 🔧 إعدادات متقدمة لمنع Preview Deployments

### إذا كنت تريد منع Preview Deployments تماماً:

**في ملف `vercel.json`:**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "public": true,
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  },
  "functions": {
    "app/**/*.js": {
      "includeFiles": "**"
    }
  }
}
```

### أو في إعدادات Vercel Dashboard:

**المسار:** Project Settings → Git → Deploy Hooks

**الإعدادات:**
- ✅ **Deploy only production branch:** مفعل
- ❌ **Deploy preview for all branches:** معطل
- ✅ **Deploy when pushing to main:** مفعل

## 🚀 اختبار النشر التلقائي

### لاختبار أن النظام يعمل:

1. **إنشاء تعديل بسيط:**
```bash
# في المشروع المحلي
echo "<!-- Test auto-deploy -->" >> README.md
git add README.md
git commit -m "اختبار النشر التلقائي"
git push origin main
```

2. **مراقبة Vercel Dashboard:**
- الذهاب إلى تبويب "Deployments"
- مشاهدة deployment جديد يبدأ تلقائياً
- التأكد من أنه يتم نشره على Production مباشرة

3. **التحقق من الموقع:**
- زيارة `https://naebak.com`
- التأكد من ظهور التحديث

## 🔍 استكشاف الأخطاء

### إذا لم يتم النشر التلقائي:

**التحقق من:**
1. **Webhook Status:** في GitHub → Settings → Webhooks
2. **Build Logs:** في Vercel → Deployments → Build Logs
3. **Environment Variables:** التأكد من وجود جميع المتغيرات المطلوبة

### إذا تم إنشاء Preview بدلاً من Production:

**الحل:**
1. الذهاب إلى الـ Preview Deployment
2. الضغط على "Promote to Production"
3. أو تعديل إعدادات Git Integration

## 📊 الحالة المطلوبة بعد الضبط

### عند كل push إلى main:
1. ✅ **Vercel يبدأ build تلقائياً**
2. ✅ **يتم النشر على Production مباشرة**
3. ✅ **الدومين `naebak.com` يتحدث فوراً**
4. ✅ **لا يتم إنشاء preview URLs جديدة**

### النتيجة النهائية:
- 🎯 **رابط ثابت:** `https://naebak.com`
- 🚀 **نشر فوري:** عند كل commit
- 🔄 **تحديث تلقائي:** بدون تدخل يدوي

## ⚠️ ملاحظات مهمة

### احتفظ بـ Preview Deployments للاختبار:
- يمكن الاحتفاظ بها للفروع الأخرى (غير main)
- مفيدة لاختبار التحديثات قبل الدمج

### مراقبة الأداء:
- تابع Build Times في Analytics
- راقب Error Rates بعد كل deployment
- استخدم Logs لاستكشاف المشاكل

---

**الهدف:** نشر تلقائي سلس على `naebak.com` عند كل تحديث  
**الحالة:** 🟡 يحتاج ضبط في Vercel Dashboard  
**الأولوية:** متوسطة (للراحة في المستقبل)
