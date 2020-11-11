import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  signForm: FormGroup;
  email: string;
  password: string;
  statusMessage: string;
  returnUrl: string;
  private signInMessageLog: Subscription = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnDestroy() {
    this.signInMessageLog.unsubscribe();
  }

  onSubmit() {
    this.email = this.signForm.controls.email.value;
    this.password = this.signForm.controls.password.value;
    this.returnUrl = localStorage.getItem('returnUrl');
    console.log(this.returnUrl);
    const signIn: any = this.authService.signIn(this.email, this.password);

    this.signInMessageLog = this.authService.signInMessage$.subscribe(
      (response) => {
        if (response === true) {
          this.statusMessage =
            'Yay! You succesfully signed in :) Redirecting...';
          setTimeout(() => {
            this.router.navigate([this.returnUrl]);
          }, 3500);
          return;
        }
        this.statusMessage = 'Oooops! ' + response.message;
      }
    );
  }

  checkLoggedIn() {
    this.authService.isLoggedIn();
  }

  closeWindow() {
    this.statusMessage = '';
  }

  logForm(event, signForm) {
    event.preventDefault();
    console.log(signForm);
  }

  signOut() {
    console.log('signin out');
    this.authService.signOut();
  }
}
