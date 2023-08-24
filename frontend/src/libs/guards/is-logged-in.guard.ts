import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const status = inject(AuthService).isLoggedIn();
  if (!status) {
    inject(AuthService).goToLoginPage();
  }
  return !!status;
};
