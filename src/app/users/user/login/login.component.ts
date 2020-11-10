import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signForm: FormGroup;
  email: string;
  password: string;
  statusMessage: string;
  returnUrl: string; 
  constructor(private authService: AuthService, private router: Router) {
   
   
    if (this.authService.isLoggedIn) {
      this.router.navigate(['usermenu']);
    }
  }

  ngOnInit(): void {
    this.signForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    this.email = this.signForm.controls.email.value;
    this.password = this.signForm.controls.password.value;
    this.returnUrl = localStorage.getItem('returnUrl');
    console.log(this.returnUrl);
    this.authService
      .signIn(this.email, this.password)
      .then((response) => {
        console.log(response);
        this.statusMessage = 'Yay! You succesfully signed in :) Redirecting...';
        setTimeout(() => {
          this.router.navigate(['books']);
        }, 4000);
      })
      .catch((error) => {
        this.statusMessage = 'Ooops! ' + error.message;
      });
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
