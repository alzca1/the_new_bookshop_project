import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit, OnDestroy {
  user: any;
  userSubscription: Subscription;
  statusMessage: string; 
  constructor(private firebaseAuth: AngularFireAuth, private authService: AuthService, private router: Router) {
    this.userSubscription = this.firebaseAuth.authState.subscribe(user => {
      this.user = user.displayName; 
    })
  }

  signOut() {
    this.statusMessage = "Signing out. Sad to say goodbye. Redirecting..."
    setTimeout(()=> {
      this.authService.signOut();
      this.router.navigate(['books']);
    }, 4000)

  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe(); 
  }

  ngOnInit(): void {}
}
