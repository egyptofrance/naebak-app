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
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/auth/callback',
    '/test-banner',
    '/mps',
    '/candidates',
    '/complaints',
    '/about',
    '/contact',
    '/unauthorized',
  ];

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some((route) => path === route || path.startsWith(route));

  // If the route is public, allow access
  if (isPublicRoute) {
    return response;
  }

  // Protected routes require authentication
  const protectedRoutes = ['/admin', '/manager', '/citizen', '/mp', '/candidate', '/dashboard'];
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

  if (isProtectedRoute) {
    // If no session, redirect to login
    if (!session) {
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(redirectUrl);
    }

    // Get user role
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role_id')
        .eq('auth_id', session.user.id)
        .single();

      if (userError || !userData) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .select('name')
        .eq('id', userData.role_id)
        .single();

      if (roleError || !roleData) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      const userRole = roleData.name;

      // Role-based access control
      if (path.startsWith('/admin') && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      if (path.startsWith('/manager') && !['admin', 'manager'].includes(userRole)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      if (path.startsWith('/citizen') && !['admin', 'manager', 'citizen'].includes(userRole)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      if (path.startsWith('/mp') && !['admin', 'mp'].includes(userRole)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      if (path.startsWith('/candidate') && !['admin', 'candidate'].includes(userRole)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      // Dashboard is accessible to all authenticated users
      if (path === '/dashboard') {
        return response;
      }
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
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
