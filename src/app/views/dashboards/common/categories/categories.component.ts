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
  categories:any;
  start:number = 0;
  end:number = 7;
  constructor(private restaurantService: RestaurantService,private commonservice:CommonService) {
    this.commonservice.latlogtrigger.subscribe((data) => {
      console.log(data);
      this.getRestorantList(data);
    })
   }
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
    this.getRestorantList(null);   
    this.getCategories();
  }
  fetchrestaurantList(data:any){  
    this.restaurantService.getRestaurantList(data)
    .subscribe(
      (response) => {                           //Next callback
        this.restorantList = undefined; 
        const res: any = response;
        this.restorantList = res.list;
        this.commonservice.restorantList = res.list;
      },
      (error) => {                              //Error callback
        console.error('Request failed with error')
        alert(error);
      },
      () => {                                   //Complete callback
        console.log('Request completed')
      })
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

  changeCategories(type:string){
    var temps = [];
    this.slides = null;
     if(type == 'preview'){
      if(this.start >=0){
      temps = [];
      if(this.start != 0){
      this.start = this.start - 8;
      this.end = this.end - 8;
      }
      for(var i = this.start;i<=this.end;i++){
        temps.push(this.cards[i]);
        if(i == this.end){
          this.slides = this.chunk(temps, 8);
        }
      }
     }
     } else {
       if(this.start <= this.cards.length){
      temps = [];
      if(this.end <= this.cards.length){
      this.start = this.start + 8;
      this.end = this.end + 8;
      }
      for(var i = this.start;i<=this.end;i++){
        if(i<= this.cards.length){
        temps.push(this.cards[i]);
        if(i == this.end || i == this.cards.length -1){
          this.slides = this.chunk(temps, 8);
        }
      }
      }
    }
     }
  }

  getRestorantList(data:any) {
    this.restaurantService.getRestaurantList(data)
      .subscribe(
        (response) => {                           //Next callback
          console.log('response received')
          console.log(JSON.stringify(response));

          const res: any = response;

          this.restorantList = res.list;
          this.commonservice.restorantList = res.list;
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