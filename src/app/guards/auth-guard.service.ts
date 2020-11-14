import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route, state);
    return this.auth.user$.pipe(
      map((user) => {
        if (user) {
          return true;
        }

        this.router.navigate(['user/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      })
    );
  }
}
