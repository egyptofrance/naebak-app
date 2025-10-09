import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          req.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // التحقق من الجلسة
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const path = req.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/callback',
    '/mps',
    '/candidates',
    '/complaints',
    '/about',
    '/contact',
    '/unauthorized',
    '/pending-approval',
    '/account-rejected',
  ];

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some((route) => path === route || path.startsWith(route));

  // If user is authenticated
  if (session?.user) {
    const user = session.user;
    const profileCompleted = user.user_metadata?.profile_completed || false;
    const accountType = user.user_metadata?.account_type;
    const accountStatus = user.user_metadata?.account_status || 'active';

    // إذا لم يكمل المستخدم ملفه الشخصي
    if (!profileCompleted && !path.startsWith('/onboarding')) {
      // استثناءات: السماح بالوصول لصفحات معينة
      const allowedPaths = ['/auth/logout', '/api', '/_next', '/favicon.ico'];
      const isAllowedPath = allowedPaths.some(allowedPath => path.startsWith(allowedPath));
      
      if (!isAllowedPath) {
        return NextResponse.redirect(new URL('/onboarding', req.url));
      }
    }

    // إذا كان المستخدم مرشح أو نائب وحسابه في انتظار الموافقة
    if ((accountType === 'candidate' || accountType === 'mp') && accountStatus === 'pending') {
      const allowedPaths = ['/pending-approval', '/auth/logout', '/api', '/_next', '/favicon.ico'];
      const isAllowedPath = allowedPaths.some(allowedPath => path.startsWith(allowedPath));
      
      if (!isAllowedPath) {
        return NextResponse.redirect(new URL('/pending-approval', req.url));
      }
    }

    // إذا كان المستخدم مرشح أو نائب وتم رفض حسابه
    if ((accountType === 'candidate' || accountType === 'mp') && accountStatus === 'rejected') {
      const allowedPaths = ['/account-rejected', '/auth/logout', '/api', '/_next', '/favicon.ico'];
      const isAllowedPath = allowedPaths.some(allowedPath => path.startsWith(allowedPath));
      
      if (!isAllowedPath) {
        return NextResponse.redirect(new URL('/account-rejected', req.url));
      }
    }

    // منع الوصول لصفحات المصادقة إذا كان مسجل دخول
    if (path.startsWith('/auth/') && !path.startsWith('/auth/logout')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else {
    // إذا لم يكن مسجل دخول، منع الوصول للصفحات المحمية
    const protectedPaths = ['/dashboard', '/profile', '/onboarding'];
    const isProtectedPath = protectedPaths.some(protectedPath => path.startsWith(protectedPath));
    
    if (isProtectedPath) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  // If the route is public, allow access
  if (isPublicRoute) {
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
