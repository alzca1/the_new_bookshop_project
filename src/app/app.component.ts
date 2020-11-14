import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'theNewBookShopProject';

  constructor(
    private userService: UserService,
    private auth: AuthService,
    router: Router
  ) {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.userService.save(user);
      }
    });
  }
}
