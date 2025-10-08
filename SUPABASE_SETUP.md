# 🔧 Supabase Configuration Setup - NAEBAK PROJECT

## ⚠️ IMPORTANT: Permanent Supabase Credentials

**If the `.env.local` file gets deleted or reset, use these credentials:**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://hgnsgecejirhafynztdi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnbnNnZWNlamlyaGFmeW56dGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NTcwOTQsImV4cCI6MjA3NTIzMzA5NH0.BQWJWrETqDeMoDLTLVUsPaNYaCBYVEs8KuRwig9VHEA
```

## 🚀 Quick Setup Commands

### 1. Create .env.local file:
```bash
cd /home/ubuntu/naebak-app
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://hgnsgecejirhafynztdi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnbnNnZWNlamlyaGFmeW56dGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NTcwOTQsImV4cCI6MjA3NTIzMzA5NH0.BQWJWrETqDeMoDLTLVUsPaNYaCBYVEs8KuRwig9VHEA
EOF
```

### 2. Start development server:
```bash
npm run dev
```

## 📋 Project Information

- **Project Name:** naebak
- **Supabase Dashboard:** https://supabase.com/dashboard/project/hgnsgecejirhafynztdi
- **Project ID:** hgnsgecejirhafynztdi
- **Region:** AWS eu-west-3

## 🔍 Backup Locations

The Supabase credentials are saved in multiple places:

1. **`.env.local`** - Main configuration file
2. **`.env.example`** - Template with real values
3. **`supabase-config.js`** - JavaScript backup file
4. **`SUPABASE_SETUP.md`** - This documentation file

## 🛠️ Troubleshooting

If you see "Failed to fetch" errors:

1. Check if `.env.local` exists and has the correct values
2. Restart the development server: `npm run dev`
3. Clear browser cache and try again
4. Verify Supabase project is active in dashboard

## ✅ Testing Checklist

- [ ] `.env.local` file exists with correct credentials
- [ ] Development server starts without errors
- [ ] Registration form loads dropdown data
- [ ] Login attempts connect to Supabase (may show auth errors, but no "Failed to fetch")
- [ ] Dashboard redirects to login (authentication guard working)

---

**Last Updated:** October 8, 2025  
**Configuration Status:** ✅ ACTIVE
