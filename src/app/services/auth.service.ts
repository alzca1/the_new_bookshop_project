import { Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { FirebaseApp } from '@angular/fire';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<firebase.default.User>;
  userData: any;
  private signInMessage = new Subject<any>();
  public signInMessage$ = this.signInMessage.asObservable();

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user$ = firebaseAuth.authState;
  }

  signUp(name: string, email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        response.user.updateProfile({ displayName: name });
        // this.userService.save(response.user);
      })
      .catch((error) => {
        console.log('error', error);
      })

      .then((response) => {
        this.sendVerificationMail();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  signIn(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || "/";
        localStorage.setItem('returnUrl', returnUrl);
        this.signInMessage.next(true);
      })
      .catch((error) => {
        this.signInMessage.next(error);
      });
  }


  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth
        .signOut()
        .then(() => {
          resolve({ success: true });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  resetPassword(email): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve({ succes: true });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async sendVerificationMail() {
    (await this.firebaseAuth.currentUser).sendEmailVerification().then(() => {
      console.log('email sent');
    });
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  getUserFromLocalStorage() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.displayName;
  }
}
