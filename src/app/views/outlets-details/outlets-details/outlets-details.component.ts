import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CommonService } from '../../../service/common.service';
import { Subscription } from 'rxjs';
export let browserRefresh = false;
import { RestaurantService } from '../../../service/restaurant.service';
import { UserService } from '../../../service/user.service';
@Component({
  selector: 'app-outlets-details',
  templateUrl: './outlets-details.component.html',
  styleUrls: ['./outlets-details.component.scss']
})
export class OutletsDetailsComponent implements OnInit {
  restaurantObj:any;
  subscription: Subscription;
  searchvalue='';
  foodtype = false;
  constructor(private commonservice:CommonService,public zone: NgZone,public router: Router,
        public restaurantservice:RestaurantService,public userService: UserService) {
    this.restaurantObj = this.commonservice.restaurantObj;
    if(!this.restaurantObj){
      this.zone.run(() => {this.router.navigate(['/dashboards']); });
    }
   }

  ngOnInit(): void {
    if(this.restaurantObj){
    this.restaurantservice.restopruntmenu(parseInt(this.restaurantObj.restaurant_id)).subscribe((data)=>{
      this.commonservice.getrestomenu(data);
    });
  }
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if(this.userService.userdeails != undefined){
    localStorage.setItem('userinfo', JSON.stringify(this.userService.userdeails));
    }
    // Do more processing...
    event.returnValue = false;
   }
  searchMenu(){
    console.log(this.searchvalue);
    this.commonservice.searchMenufun(this.searchvalue);
  }
  FoodTypecheck(){
    this.foodtype = !this.foodtype;
    this.commonservice.foodtypechange(this.foodtype);
  }

}
