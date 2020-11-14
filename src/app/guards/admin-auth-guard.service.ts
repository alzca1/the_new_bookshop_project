import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../users/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserService
  ) {}
  canActivate(): any {
    return this.auth.user$.pipe(
      switchMap((user) => this.userService.get(user.uid)),
      map((userApp: AppUser) => {
        if (!userApp.isAdmin) {
          this.router.navigate(['books']);
        }
        return userApp.isAdmin;
      })
    );
  }
}
