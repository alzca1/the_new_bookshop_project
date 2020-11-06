import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book/book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book;
  constructor() {}

  ngOnInit(): void {
    this.book = new Book(
      'Fall of Giants',
      'Ken Follett',
      2020,
      'Fiction',
      23.65,
      [
        'A thirteen-year-old Welsh boy enters a man’s world in the mining pits.',
        'An American law student rejected in love finds a surprising new career in Woodrow Wilson’s White House.',
        'A housekeeper for the aristocratic Fitzherberts takes a fateful step above her station, while Lady Maud Fitzherbert herself crosses deep into forbidden territory when she falls in love with a German spy. . . .',
        'And two orphaned Russian brothers embark on radically different paths when their plan to emigrate to America falls afoul of war, conscription, and revolution. From the dirt and danger of a coal mine to the glittering chandeliers of a palace, from the corridors of power to the bedrooms of the mighty, Fall of Giants takes us into the inextricably entangled fates of five families—and into a century that we thought we knew, but that now will never seem the same again. . . .',
      ],
      23,
      'https://m.media-amazon.com/images/I/51PSEPcKYsL.jpg'
    );
  }
}
