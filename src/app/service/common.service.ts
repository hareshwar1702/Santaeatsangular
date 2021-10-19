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
  checkoutarr = [];
  restaurantObj: any;
  productsList:any;
  constructor() { }
  
  latlogtrigerchange(lat:Number,long:Number){
    console.log(lat,long);
    var json = {latitude:lat,longitude:long};
    this.latlogtrigger.emit(json)
  }

  countChange(count:any,index:any) {
    this.productsList[index]['count'] = count;
    this.productcount.emit();
  }
  getrestomenu(data:any){
    this.categories = data.data.categories;
    this.menus = data.data.menus;
    console.log(data);
    this.restomenu.emit();
  }
  changemenu(data:any){
    this.menuclick.emit(data);
  }
  //
}
