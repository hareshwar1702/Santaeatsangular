import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../../../service/common.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productlist:any;
  totalprice:any = 50;
  constructor(private commonservice:CommonService) {
    this.productlist = this.commonservice.productsList;
    this.commonservice.productcount.subscribe(() => {
      this.totalprice = 0;
      this.productlist = this.commonservice.productsList;
      for(let i =0;i<  this.productlist.length;i++){
        if(this.productlist[i]['count'] > 0){
          this.totalprice = this.totalprice + (this.productlist[i]['price']*this.productlist[i]['count']);

        }
      }
    });

   }

  ngOnInit(): void {
  }
  changeCount(type:any,index:any){
    if(type == 'minus'){
      if( this.productlist[index]['count'] > 0){
        this.productlist[index]['count'] = this.productlist[index]['count'] -1;
        this.commonservice.countChange(this.productlist[index]['count'],index);
      }
    } else{
        this.productlist[index]['count'] = this.productlist[index]['count'] +1;
        this.commonservice.countChange(this.productlist[index]['count'],index);
    }
  }

}
