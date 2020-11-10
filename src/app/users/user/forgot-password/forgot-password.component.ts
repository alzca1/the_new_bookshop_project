import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  userEmail: string;
  statusMessage: string;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    this.userEmail = this.forgotForm.controls.email.value;
    this.authService
      .resetPassword(this.userEmail)
      .then((response) => {
        this.statusMessage =
          "Yay! An e-mail was sent successfully to the specified address with instructions on how to reset your account's password";
          setTimeout(() => {
            this.router.navigate(['/user/login'])
          }, 4000);
      })
      .catch((error) => {
       console.log(error)
       this.statusMessage = 'Ooops! ' + error.message; 
      });
  }
}
