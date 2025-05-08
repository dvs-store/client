import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isLogged: CanActivateFn = (route, state) => {
  const value = inject(AuthService).isAuthenticated;

  return value;
};
