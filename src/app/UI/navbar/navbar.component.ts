import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: any;
  userSubscription: Subscription; 

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.userSubscription = this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  redirectToUser(){
    console.log('clicked')
    if(!this.user){
      this.router.navigate(['user/login'])
    }
    this.router.navigate(['/usermenu']);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe(); 
  }

  ngOnInit(): void {}
}
