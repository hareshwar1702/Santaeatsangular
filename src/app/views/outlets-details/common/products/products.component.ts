import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../../../service/common.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsList:any;
  constructor(private commonservice:CommonService) {
     this.productsList = this.commonservice.productsList;
     this.commonservice.productcount.subscribe(() => {
      this.productsList = this.commonservice.productsList; 
    });
   }

  ngOnInit(): void {
  }

  changeCount(type:any,index:any){
    if(type == 'minus'){
      if( this.productsList[index]['count'] > 0){
        this.productsList[index]['count'] = this.productsList[index]['count'] -1;
        this.commonservice.countChange(this.productsList[index]['count'],index);
      }
    } else{
        this.productsList[index]['count'] = this.productsList[index]['count'] +1;
        this.commonservice.countChange(this.productsList[index]['count'],index);
    }
  }

}
