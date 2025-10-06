#!/bin/bash

# سكريبت لإنشاء إصدار جديد بسهولة
# الاستخدام: ./scripts/release.sh [patch|minor|major] "وصف الإصدار"

set -e

# التحقق من المعاملات
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "❌ خطأ: يجب تحديد نوع الإصدار والوصف"
    echo ""
    echo "الاستخدام:"
    echo "  ./scripts/release.sh patch \"إصلاح bug في الصفحة الرئيسية\""
    echo "  ./scripts/release.sh minor \"إضافة صفحة من نحن\""
    echo "  ./scripts/release.sh major \"إعادة تصميم كاملة للموقع\""
    echo ""
    exit 1
fi

TYPE=$1
DESCRIPTION=$2

# قراءة الإصدار الحالي
CURRENT_VERSION=$(cat VERSION)
echo "📦 الإصدار الحالي: v$CURRENT_VERSION"

# تقسيم الإصدار
IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR="${VERSION_PARTS[0]}"
MINOR="${VERSION_PARTS[1]}"
PATCH="${VERSION_PARTS[2]}"

# حساب الإصدار الجديد
case $TYPE in
    patch)
        PATCH=$((PATCH + 1))
        ;;
    minor)
        MINOR=$((MINOR + 1))
        PATCH=0
        ;;
    major)
        MAJOR=$((MAJOR + 1))
        MINOR=0
        PATCH=0
        ;;
    *)
        echo "❌ خطأ: نوع الإصدار يجب أن يكون patch أو minor أو major"
        exit 1
        ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"
echo "🎉 الإصدار الجديد: v$NEW_VERSION"

# التحقق من وجود تغييرات غير محفوظة
if [[ -n $(git status -s) ]]; then
    echo "⚠️  تحذير: يوجد تغييرات غير محفوظة"
    echo ""
    git status -s
    echo ""
    read -p "هل تريد المتابعة؟ (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ تم الإلغاء"
        exit 1
    fi
fi

# تحديث ملف VERSION
echo "$NEW_VERSION" > VERSION
echo "✅ تم تحديث VERSION"

# تحديث CHANGELOG.md
DATE=$(date +%Y-%m-%d)
sed -i "s/## \[Unreleased\]/## [Unreleased]\n\n### قيد التطوير\n- لا توجد تغييرات قيد التطوير حالياً\n\n## [$NEW_VERSION] - $DATE\n\n### تم التغيير\n- $DESCRIPTION/" CHANGELOG.md
echo "✅ تم تحديث CHANGELOG.md"

# Commit التغييرات
git add VERSION CHANGELOG.md
git commit -m "Release v$NEW_VERSION: $DESCRIPTION"
echo "✅ تم عمل commit للتغييرات"

# إنشاء Tag
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION: $DESCRIPTION"
echo "✅ تم إنشاء tag v$NEW_VERSION"

# عرض الخطوات التالية
echo ""
echo "🎯 الخطوات التالية:"
echo "   1. راجع التغييرات: git log -1"
echo "   2. ادفع إلى GitHub: git push origin main && git push origin v$NEW_VERSION"
echo "   3. سيتم النشر تلقائياً على Vercel!"
echo ""
echo "📝 ملاحظة: إذا أردت التراجع، استخدم:"
echo "   git tag -d v$NEW_VERSION"
echo "   git reset --soft HEAD~1"
echo ""
