import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  name: string;
  email: string;
  password: string;
  signUp: boolean = false;
  signMessage: string = 'Wanna sign up?';
  formIsInvalid: boolean = true;
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  constructor(private authService: AuthService) {}

  onSubmit() {
    const { email, password, name } = this.signUpForm.controls;
    this.email = email.value;
    this.password = password.value;
    this.name = name.value;

    this.signUpForm.reset();
    this.authService.signUp(this.name, this.email, this.password);
  }

  log(event, signUpForm) {
    event.preventDefault();
    console.log(signUpForm);
  }

  // toggleSignInSignUp() {
  //   !this.signUp
  //     ? (this.signMessage = 'Wanna sign in?')
  //     : (this.signMessage = 'Wanna sign up?');
  //   this.signUp = !this.signUp;
  //   console.log(this.signUp);
  // }
}
