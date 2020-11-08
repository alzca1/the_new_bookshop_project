import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnChanges {
  signForm: FormGroup;
  name: string;
  email: string;
  password: string;
  signUp: boolean = false;
  signMessage: string = 'Wanna sign up?';
  formIsInvalid: boolean = true;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signForm = new FormGroup({
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

  ngOnChanges() {
    this.buttonValidator();
  }

  onSubmit() {
    console.log(this.signForm);
    this.email = this.signForm.controls.email.value;
    this.password = this.signForm.controls.password.value;
    if (this.signUp) {
      this.name = this.signForm.controls.name.value;
    }
    this.signForm.reset();
    this.signUp
      ? this.authService.signUp(this.name, this.email, this.password)
      : this.authService.signIn(this.email, this.password);
  }

  checkLoggedIn() {
    this.authService.isLoggedIn();
  }

  signOut() {
    console.log('signin out');
    this.authService.signOut();
  }

  log(event, signForm) {
    event.preventDefault();
    console.log(signForm);
  }

  buttonValidator() {
    if (this.signUp) {
      this.formIsInvalid =
        !this.signForm.get('name').valid &&
        !this.signForm.get('email') &&
        !this.signForm.get('password').valid;
      console.log(this.formIsInvalid);
    }

    this.formIsInvalid =
      !this.signForm.get('name').valid && !this.signForm.get('password').valid;
    console.log(this.formIsInvalid);
  }
  toggleSignInSignUp() {
    !this.signUp
      ? (this.signMessage = 'Wanna sign in?')
      : (this.signMessage = 'Wanna sign up?');
    this.signUp = !this.signUp;
    console.log(this.signUp);
  }

  changeInput(event) {
    console.log(event);
  }
}
