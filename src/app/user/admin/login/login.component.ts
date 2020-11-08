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

  ngOnChanges() {}

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
}
