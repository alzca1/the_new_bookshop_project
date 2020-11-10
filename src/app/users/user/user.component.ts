import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
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
