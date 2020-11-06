import { Component, Input, OnInit } from '@angular/core';
import { Book } from './book/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  @Input() books: Book[];
  constructor() {
    this.books = [
      new Book(
        'El Camino',
        'Miguel Delibes',
        1960,
        'Fiction',
        10.99,
        ['No summary provided'],
        10,
        'https://images-na.ssl-images-amazon.com/images/I/41EJ8GyPCML._SX327_BO1,204,203,200_.jpg'
      ),
      new Book(
        'Redención',
        'Fernando Gamboa',
        1980,
        'Thriller',
        8.99,
        ['Not provided'],
        20,
        'https://m.media-amazon.com/images/I/5149qXmwFQL.jpg'
      ),
      new Book(
        'Sidi',
        'Arturo Pérez-Reverte',
        2003,
        'Fiction',
        9.99,
        ['Not provided'],
        14,
        'https://images-na.ssl-images-amazon.com/images/I/41JwCRRKjfL._SX309_BO1,204,203,200_.jpg'
      ),
      new Book(
        'Postales del Este',
        'Reyes Monforte',
        2010,
        'Fiction',
        17.99,
        ['Not provided'],
        8,
        'https://images-na.ssl-images-amazon.com/images/I/51HzFPWh3dL._SX320_BO1,204,203,200_.jpg'
      ),
    ];
  }

  ngOnInit(): void {}
}
