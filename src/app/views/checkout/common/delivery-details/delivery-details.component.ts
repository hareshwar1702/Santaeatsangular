import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { UserService } from '../../../../service/user.service';
import {RestaurantService} from '../../../../service/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {
  isHomeDelivery:boolean = true;
  checkoutarr:any;
  time = 0;
  date:Date;
  totalamount:number;
  userdetails:any;
  showModal:boolean = false;
  bsValue = new Date();
   bsRangeValue: Date[];
   maxDate = new Date();
   minDate = new Date();
  @ViewChild('centralModalSm') centralModalSm: any;
  constructor(private commonservice:CommonService,private userservice:UserService,public restaurantservice:RestaurantService,
    public zone: NgZone,public router: Router) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.totalamount = this.commonservice.finalcost;
    this.userdetails = this.userservice.userdeails;
    this.checkoutarr = this.commonservice.checkoutarr;
    this.commonservice.deliverytype.subscribe(()=>{
      this.isHomeDelivery = !this.isHomeDelivery;
    })
   }

  ngOnInit(): void {

  }
 
  homeActive(){
    this.commonservice.deleverytypefunction(true);
    this.isHomeDelivery = true;
  }
  pickUpActive(){
    this.commonservice.deleverytypefunction(false);
    this.isHomeDelivery = false;
  }
  makePayment(){
    var deleveryaddress = this.commonservice.deliveraddress;
    var pickUpdetails = this.commonservice.pickUpdetails;
    if(this.date && this.time != 0 && deleveryaddress && this.isHomeDelivery){
      this.commonservice.deliverydate = this.date;
      this.commonservice.deliverytime = this.time;
      this.zone.run(() => {this.router.navigate(['/checkout/payment-summary']); });
    } else if(this.isHomeDelivery == false && pickUpdetails && this.date && this.time != 0){
      this.zone.run(() => {this.router.navigate(['/checkout/payment-summary']); });
    }else if(deleveryaddress == undefined) {
      alert('Please select delivery adderss.(Click on DELIVER HERE Button)')
    } else{
      alert("Please select date and time First!");
    }
  }


}
