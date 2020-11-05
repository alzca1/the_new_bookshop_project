export class Book {
  public title: string;
  public author: string;
  public year: number;
  public category: string;
  public price: number;
  public summary: string;
  public stock: number;
  public cover: string;

  constructor(
    title: string,
    author: string,
    year: number,
    category: string,
    price: number,
    summary: string,
    stock: number,
    cover: string
  ) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.category = category;
    this.price = price;
    this.summary = summary;
    this.stock = stock;
    this.cover = cover;
  }
}
