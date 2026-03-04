import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is logged in
  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  // Get Expected Roles from the route data
  const expectedRoles = route.data['expectedRoles'] as Array<string>;
  const userRole = authService.getUserRole();

  if (expectedRoles && userRole && expectedRoles.includes(userRole)) {
    return true; // Use has the correct role
  }

  // If user is authenticated but doesn't have the correct role, redirect them to a safe page (or their own dashboard)
  if (userRole === 'ADMIN') router.navigate(['/admin']);
  else if (userRole === 'MANAGER') router.navigate(['/manager']);
  else if (userRole === 'CLIENT') router.navigate(['/client']);
  else router.navigate(['/auth/login']);

  return false;
};
