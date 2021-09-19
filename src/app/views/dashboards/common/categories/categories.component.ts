import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../../service/restaurant.service';
import {CommonService} from '../../../../service/common.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public restorantList: any = [];
  constructor(private restaurantService: RestaurantService,private commonservice:CommonService) { }
  cards:any;
  slides: any = [[]];
  chunk(arr: any, chunkSize:any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  ngOnInit(): void {
    this.getRestorantList();
    this.getCategories();
  }
  getCategories(){
    this.restaurantService.getCategories()
      .subscribe(
        (response) => {                           //Next callback
          console.log('response received')
          console.log(JSON.stringify(response));

          const res: any = response;

          this.cards = res.data;
          this.slides = this.chunk(this.cards, 12);
        },
        (error) => {                              //Error callback
          console.error('Request failed with error')
          alert(error);
        },
        () => {                                   //Complete callback
          console.log('Request completed')
        })
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
  sendRestarunt(data:any){
    console.log(data);
    this.commonservice.restaurantObj = data;
  }

}