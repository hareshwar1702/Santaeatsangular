import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../../service/restaurant.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public restorantList: any = [];
  constructor(private restaurantService: RestaurantService) { }
  cards = [
    {
      title: 'Deals',
      description: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      buttonText: 'Button',
      img: 'assets/img/categories/deals.jpeg'
    },
    {
      title: 'Grocery',
      description: 'This card has supporting text below as a natural lead-in to additional content.',
      buttonText: 'Button',
      img: 'assets/img/categories/grocery.jpeg'
    },
    { 
      title: 'Conveniences',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This text is much longer so that you can see a significant difference between the text in  previous tabs.',
      buttonText: 'Button',
      img: 'assets/img/categories/conveniences.jpeg'
    },
    {
      title: 'Alcohol',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'assets/img/categories/alcohol.jpeg'
    },
    {
      title: 'Bakery',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'assets/img/categories/bakery.jpeg'
    },
    {
      title: 'Halal',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'assets/img/categories/halal.jpeg'
    }
    ,    {
      title: 'Fast Food ',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'assets/img/categories/fastfood.jpeg'
    },
    {
      title: 'Healthy',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'assets/img/categories/healthy.jpeg'
    },
    {
      title: 'Burgers',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'assets/img/categories/burgers.jpeg'
    },
    {
      title: 'Sandwich',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'assets/img/categories/sandwich.jpeg'
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
    this.slides = this.chunk(this.cards, 12);
    this.getRestorantList();
  }
  getRestorantList() {

    this.restaurantService.getRestaurantList()
      .subscribe(
        (response) => {                           //Next callback
          console.log('response received')
          console.log(JSON.stringify(response));

          const res: any = response;

          this.restorantList = res.list;
        },
        (error) => {                              //Error callback
          console.error('Request failed with error')
          alert(error);
        },
        () => {                                   //Complete callback
          console.log('Request completed')
        })

  }

}