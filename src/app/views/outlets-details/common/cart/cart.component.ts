import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CommonService} from '../../../../service/common.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  checkoutarr:any;
  totalprice:any = 0;
  constructor(private commonservice:CommonService,public zone: NgZone,public router: Router) {
    this.checkoutarr = this.commonservice.checkoutarr;
    this.commonservice.productcount.subscribe(() => {
      this.totalprice = 0;
      this.checkoutarr = this.commonservice.checkoutarr;
      for(let i =0;i<  this.checkoutarr.length;i++){
        if(this.checkoutarr[i]['count'] > 0){
          this.totalprice = this.totalprice + (this.checkoutarr[i]['price']*this.checkoutarr[i]['count']);
          this.commonservice.totalprice = this.totalprice;
        }
      }
    });

   }

  ngOnInit(): void {
  }

  checkOut(){
    if(this.totalprice != 0){
      this.zone.run(() => {this.router.navigate(['/checkout/checkout-details']); });
    } else {
      alert("fail!");
    }
  }
  changeCount(type:any,index:any){
    if(type == 'minus'){
      if( this.checkoutarr[index]['count'] >= 0){
        this.checkoutarr[index]['count'] = this.checkoutarr[index]['count'] -1;
        this.commonservice.countChange(this.checkoutarr[index]['count'],this.checkoutarr[index]['index'],'minus');
      }
    } else{
        this.checkoutarr[index]['count'] = this.checkoutarr[index]['count'] +1;
        this.commonservice.countChange(this.checkoutarr[index]['count'],index,'plus');
    }
  }

}
