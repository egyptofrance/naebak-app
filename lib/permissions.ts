// Role-based access control

export type Role = 'admin' | 'manager' | 'citizen' | 'mp' | 'candidate';

export const ROLE_ROUTES: Record<Role, string> = {
  admin: '/admin',
  manager: '/manager',
  citizen: '/citizen',
  mp: '/mp',
  candidate: '/candidate',
};

export const PROTECTED_ROUTES = [
  '/admin',
  '/manager',
  '/citizen',
  '/mp',
  '/candidate',
  '/dashboard',
];

export const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/auth/callback',
];

// Check if user has permission to access a route
export function hasPermission(userRole: Role, path: string): boolean {
  // Public routes are accessible to everyone
  if (PUBLIC_ROUTES.some(route => path.startsWith(route))) {
    return true;
  }

  // Admin has access to everything
  if (userRole === 'admin') {
    return true;
  }

  // Manager has access to manager and citizen routes
  if (userRole === 'manager') {
    return path.startsWith('/manager') || path.startsWith('/citizen');
  }

  // Other roles can only access their own routes
  if (path.startsWith(`/${userRole}`)) {
    return true;
  }

  // Dashboard is accessible to all authenticated users
  if (path === '/dashboard') {
    return true;
  }

  return false;
}

// Get redirect URL based on role
export function getRoleRedirectUrl(role: Role): string {
  return ROLE_ROUTES[role] || '/';
}

// Check if route is protected
export function isProtectedRoute(path: string): boolean {
  return PROTECTED_ROUTES.some(route => path.startsWith(route));
}

// Check if route is public
export function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some(route => path.startsWith(route));
}
