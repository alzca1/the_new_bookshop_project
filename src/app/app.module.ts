import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './books/book/book.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-detail/book-edit/book-edit.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './UI/navbar/navbar.component';
import { CategoriesDropdownComponent } from './UI/categories-dropdown/categories-dropdown.component';
import { BookSearchComponent } from './UI/book-search/book-search.component';
import { UserSignComponent } from './UI/user-sign/user-sign.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookComponent,
    BookDetailComponent,
    BookEditComponent,
    HomeComponent,
    NavbarComponent,
    CategoriesDropdownComponent,
    BookSearchComponent,
    UserSignComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
