import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const checkAdminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const user = auth.getUser;

  if( !user ) return false;
  const roles = user.roles;

  return roles.includes('ADMIN');
};
