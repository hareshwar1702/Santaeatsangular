import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { RestaurantService } from '../../../service/restaurant.service';


@Component({
  selector: 'app-checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.scss']
})
export class CheckoutDetailsComponent implements OnInit {
  totalprice;
  restaurantObj:any; 
  checkoutarr:any;
  subtotal:any;
  categories=[] as any;
  menu=[] as any;
  constructor(private commonservice:CommonService,public zone: NgZone,public router: Router,public restaurantservice:RestaurantService) { 
    this.totalprice = this.commonservice.totalprice;
    this.restaurantObj = this.commonservice.restaurantObj;
    this.checkoutarr = this.commonservice.checkoutarr;
    if(!this.totalprice){
      this.zone.run(() => {this.router.navigate(['/dashboards']); });
    }
    if(this.checkoutarr){
      for(let i =0;i<=this.checkoutarr.length -1;i++){
        var json1 ={
          menu_id:this.checkoutarr[i]['menu_id']+'',
          qty:this.checkoutarr[i]['count']+''
        }
        var json2 = {
          menu_categoryid:this.checkoutarr[i]['menu_categoryid']+''
        }
        this.categories.push(json2);
        this.menu.push(json1);
      }
    }
  }

  ngOnInit(): void {
    this.couponlist();
    this.discountcoupon();
  }
  couponlist(){
     this.restaurantservice.couponList(this.restaurantObj['restaurant_id']).subscribe(res=>{
       console.log(res);
        this.commonservice.couponlist = res;
     })
  }
  discountcoupon(){
    var formData = new FormData();
    formData.append('coupon','');
    formData.append('subtotal',this.totalprice);
    formData.append('totalall',this.totalprice);
    formData.append('restaurant_id',this.restaurantObj['restaurant_id']);
    formData.append('menus',this.menu);
    formData.append('categories',this.categories);
    formData.append('ordertype','delivery');
    this.restaurantservice.descountcoupon(formData).subscribe(res=>{
      console.log(res);
      this.commonservice.descountcoupun = res;
    })
  }
}
