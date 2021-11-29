import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.scss']
})
export class CheckoutCartComponent implements OnInit {
  productlist:any;
  totalprice:any;
  serviceCharge:any = 50;
  deliveryCharge:any = 50;
  total:any = 0;
  restaurantObj:any;
  isHomeDelivery:boolean = true;
  constructor(private commonservice:CommonService,public zone: NgZone,public router: Router) {
    this.productlist = this.commonservice.productsList;
    this.restaurantObj = this.commonservice.restaurantObj;
    this.totalprice = this.commonservice.totalprice;
    this.total = this.totalprice + this.serviceCharge + this.deliveryCharge;
    this.commonservice.finalcost = this.total;
    this.commonservice.productcount.subscribe(() => {
      this.totalprice = 0;
      this.total = 0;
      this.productlist = this.commonservice.productsList;
      for(let i =0;i<  this.productlist.length;i++){
        if(this.productlist[i]['count'] > 0){
          this.totalprice = this.totalprice + (this.productlist[i]['menu_price']*this.productlist[i]['count']);
          this.commonservice.totalprice = this.totalprice;
          if( this.isHomeDelivery){
            this.total = this.totalprice + this.serviceCharge + this.deliveryCharge;
          }
          this.commonservice.finalcost = this.total;
        }
      }
    });
    this.commonservice.deliverytype.subscribe((val)=>{
      this.isHomeDelivery = !this.isHomeDelivery;
      if(val == true){
        this.serviceCharge = 50;
        this.deliveryCharge = 50;
        this.total = this.totalprice + this.serviceCharge + this.deliveryCharge;
      } else {
        this.serviceCharge = 0;
        this.deliveryCharge = 0;
        this.total = this.totalprice + this.serviceCharge + this.deliveryCharge;
      }

    })
   }

  ngOnInit(): void {
  }
  changeCount(type:any,index:any){
    if(type == 'minus'){
      if( this.productlist[index]['count'] > 0){
        this.productlist[index]['count'] = this.productlist[index]['count'] -1;
        this.commonservice.countChange(this.productlist[index]['count'],index,'minus');
      }
    } else{
        this.productlist[index]['count'] = this.productlist[index]['count'] +1;
        this.commonservice.countChange(this.productlist[index]['count'],index,'plus');
    }
  }

}
