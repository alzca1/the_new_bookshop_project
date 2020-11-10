import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './books/book/book.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-detail/book-edit/book-edit.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './UI/navbar/navbar.component';
import { UserComponent } from './users/user/user.component';
import { FormsModule } from '@angular/forms';
import { CategoriesDropdownComponent } from './UI/categories-dropdown/categories-dropdown.component';
import { BookSearchComponent } from './UI/book-search/book-search.component';
import { UserSignComponent } from './UI/user-sign/user-sign.component';
import { LoginComponent } from './users/user/login/login.component';
import { ForgotPasswordComponent } from './users/user/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './users/user/verify-email/verify-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './users/user/signup/signup.component';

import { environment } from 'src/environments/environment';
import { UserMenuComponent } from './users/user-menu/user-menu.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CustomAuthGuard } from './guards/auth-guard.service';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/user/login']);

const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksComponent },
  { path: 'detail/:title', component: BookDetailComponent },
  { path: 'usermenu', component: UserMenuComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin} },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [CustomAuthGuard]  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookComponent,
    BookDetailComponent,
    BookEditComponent,
    HomeComponent,
    UserComponent,
    NavbarComponent,
    CategoriesDropdownComponent,
    BookSearchComponent,
    UserSignComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SignupComponent,
    UserMenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  exports: [],
  providers: [CustomAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
