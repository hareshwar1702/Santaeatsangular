import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  productcount = new EventEmitter();
  latlogtrigger = new EventEmitter();
  restomenu = new EventEmitter();
  menuclick = new EventEmitter();
  categories:any;
  menus:any;
  checkoutarr:any = [];
  restaurantObj: any;
  productsList:any;
  totalprice:any;
  constructor() { }
  
  latlogtrigerchange(lat:Number,long:Number){
    console.log(lat,long);
    var json = {latitude:lat,longitude:long};
    this.latlogtrigger.emit(json)
  }

  countChange(count:any,index:any,type:string) {
    this.productsList[index]['count'] = count;
    if(type == 'minus'){
      if(this.checkoutarr.length > 0){
        for(var checkoutindex = 0;checkoutindex<= this.checkoutarr.length-1;checkoutindex++){
          if(this.checkoutarr[checkoutindex]['category_name'] == this.productsList[index]['category_name'] &&
          this.checkoutarr[checkoutindex]['id'] == this.productsList[index]['id'] &&
          this.checkoutarr[checkoutindex]['count'] > 0){
            this.checkoutarr[checkoutindex] = this.productsList[index];
          } else if(this.checkoutarr[checkoutindex]['category_name'] == this.productsList[index]['category_name'] &&
          this.checkoutarr[checkoutindex]['id'] == this.productsList[index]['id'] &&
          this.checkoutarr[checkoutindex]['count'] == 0){
          //   this.checkoutarr =  this.checkoutarr.filter(function(item:any) {
          //     return item['category_name'] !== this.productsList[index]['category_name'] && item['id'] !==  this.productsList[index]['id'];
          // })
          }
        }
      }
    }else {
      if(this.checkoutarr.length == 0){
        this.checkoutarr.push(this.productsList[index])
      }else {
        var datanotpresent = false;
        for(var checkoutindex = 0;checkoutindex<= this.checkoutarr.length-1;checkoutindex++){
          if(this.checkoutarr[checkoutindex]['category_name'] == this.productsList[index]['category_name'] &&
          this.checkoutarr[checkoutindex]['id'] == this.productsList[index]['id']){
            this.checkoutarr[checkoutindex] = this.productsList[index];
            datanotpresent = true;
          }
        }
        if(datanotpresent == false){
          this.checkoutarr.push(this.productsList[index]);
        }
      }
    }
    this.productcount.emit();
  }
  getrestomenu(data:any){
    for(var i=0;i<= data.data.categories.length-1;i++){
      data.data.categories[i]['count'] = 0;
      data.data.categories[i]['price'] = 1;
      if(i == data.data.categories.length-1){
        this.categories = data.data.categories;
      }
    }
    this.menus = data.data.menus;
    console.log(data);
    this.restomenu.emit();
  }
  changemenu(data:any){
    this.menuclick.emit(data);
  }
  //
}
