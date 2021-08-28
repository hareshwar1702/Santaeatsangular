import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor() { }
  cards = [
    {
      title: 'Most Popular',
      description: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      buttonText: 'Button',
      img: 'assets/img/categories/imgg.jpg'
    },
    {
      title: 'New Arrivals',
      description: 'This card has supporting text below as a natural lead-in to additional content.',
      buttonText: 'Button',
      img: 'assets/img/categories/newarrival.jpg'
    },
    {
      title: 'Fast Food',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This text is much longer so that you can see a significant difference between the text in  previous tabs.',
      buttonText: 'Button',
      img: 'assets/img/categories/fastfood.jpeg'
    },
    {
      title: 'Italian',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'assets/img/categories/italian.jpeg'
    },
    {
      title: 'Salad',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'assets/img/categories/salad.jpeg'
    },
    {
      title: 'Chinese',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'assets/img/categories/chinese.jpeg'
    }
    ,    {
      title: 'Desserts',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'assets/img/categories/dessert.jpeg'
    },
    {
      title: 'Burgers',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'assets/img/categories/burger.jpeg'
    },
    {
      title: 'New Items',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'assets/img/categories/newarrival.jpg'
    }
  ];
  slides: any = [[]];
  chunk(arr: any, chunkSize:any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  ngOnInit(): void {
    this.slides = this.chunk(this.cards, 9);
  }
}