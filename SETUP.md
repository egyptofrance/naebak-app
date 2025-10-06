# NAEBAK App Setup Guide

## 🚀 Project Overview
This is a Next.js 15 e-commerce application with TypeScript, Tailwind CSS, and Supabase integration.

## 📋 Prerequisites
- Node.js 18+ installed
- Supabase account
- Vercel account
- GitHub account

## 🛠️ Setup Instructions

### 1. Environment Variables
Copy the `.env.local` file and update with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://hgnsgecejirhafynztdi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
```

### 2. Database Setup
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `supabase/schema.sql`
4. This will create all necessary tables, indexes, and policies

### 3. Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### 4. Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_JWT_SECRET`
3. Deploy automatically on push to main branch

### 5. GitHub Actions CI/CD
The project includes GitHub Actions workflow for automated deployment:
- Builds on every push to main
- Runs tests (when added)
- Deploys to Vercel

## 📁 Project Structure
```
naebak-app/
├── app/                 # Next.js 15 App Router
├── lib/                 # Utility functions and Supabase client
├── supabase/           # Database schema and migrations
├── .github/workflows/  # CI/CD configuration
├── .env.local          # Environment variables
└── vercel.json         # Vercel deployment config
```

## 🗄️ Database Schema
The database includes the following main tables:
- **users** - User profiles and authentication
- **categories** - Product categories
- **products** - Product catalog
- **product_variants** - Product variations (size, color, etc.)
- **orders** - Customer orders
- **order_items** - Order line items
- **cart_items** - Shopping cart
- **addresses** - Customer addresses
- **payments** - Payment transactions
- **reviews** - Product reviews
- **coupons** - Discount coupons
- **wishlist_items** - User wishlists
- **notifications** - User notifications

## 🔐 Security Features
- Row Level Security (RLS) enabled
- User-specific data access policies
- Secure authentication with Supabase Auth
- Environment variable protection

## 🚀 Next Steps
1. Customize the UI components
2. Add product management interface
3. Implement payment gateway integration
4. Add email notifications
5. Set up analytics and monitoring

## 📞 Support
For questions or issues, please refer to the documentation or create an issue in the repository.
