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
    var searchlatlong = this.commonservice.searchlatlong;
    if(searchlatlong){
      // var searchdist = new google.maps.LatLng(searchlatlong.lat,searchlatlong.long);
      // var restodist = new google.maps.LatLng(this.restaurantObj.latitude,this.restaurantObj.longitude);
      var distimkm = this.getDistanceFromLatLonInKm(searchlatlong.lat,searchlatlong.long,this.restaurantObj.latitude,this.restaurantObj.longitude);
      var distanceimMeter = Number((Number(distimkm)*1000).toFixed()) - 1000;
      if(distanceimMeter > 0){
       this.commonservice.deliveryCharge = Number((((distanceimMeter / 100 ) * 0.5) + 6).toFixed())
      } else {
        this.commonservice.deliveryCharge = 6;
      }

    }
  }

  }
  getDistanceFromLatLonInKm(lat1:number, lon1:number, lat2:number, lon2:number) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  deg2rad(deg:any) {
    return deg * (Math.PI/180)
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
  createRange(data:any){
    var item = Number(data);
    var items: number[] = [];
    for(var i = 1; i <= item; i++){
      items.push(i);
    }
    return items;
  }

}
