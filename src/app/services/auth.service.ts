import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { FirebaseApp } from '@angular/fire';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: Observable<any>;
  userData: any;
  isUserLoggedIn: boolean;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signUp(name: string, email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        response.user.updateProfile({ displayName: name });
      })
      .catch((error) => {
        console.log('error', error);
      })

      .then(() => {
        this.sendVerificationMail();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  signIn(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve({ success: true });
          
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
  signOut():Promise<any> {
    return new Promise((resolve,reject)=> {
      this.firebaseAuth.signOut()
      .then(() => {
        resolve({success:true})
      })
      .catch(error => {
        reject(error)
      })
    })
  
    
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
