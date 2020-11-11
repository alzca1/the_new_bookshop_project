import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import firebase from '@firebase/app';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router, public auth: AuthService) {}

  redirectToUser() {
    console.log('clicked');
    if (!this.auth.user$) {
      this.router.navigate(['user/login']);
    }
    this.router.navigate(['/usermenu']);
  }
}
