import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CustomAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route, state: RouterStateSnapshot) {
    const isLoggedIn = this.auth.isLoggedIn();
    if (isLoggedIn) {
      return true;
    }
    this.router.navigate(['user/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
