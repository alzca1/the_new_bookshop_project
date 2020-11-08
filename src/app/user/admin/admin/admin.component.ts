import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  signUp: boolean = false;
  signMessage: string = 'Wanna sign up?';
  constructor() {}

  ngOnInit(): void {}

  toggleSignInSignUp() {
    !this.signUp
      ? (this.signMessage = 'Wanna sign in?')
      : (this.signMessage = 'Wanna sign up?');
    this.signUp = !this.signUp;
    console.log(this.signUp);
  }
}
