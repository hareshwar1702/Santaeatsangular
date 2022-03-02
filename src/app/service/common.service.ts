import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  productcount = new EventEmitter();
  latlogtrigger = new EventEmitter();
  restomenu = new EventEmitter();
  menuclick = new EventEmitter();
  deliverytype = new EventEmitter();
  searchMenu = new EventEmitter();
  fetchaddress = new EventEmitter();
  foodtype = new EventEmitter();
  
  categories:any;
  editedobj:any;
  restorantList:any;
  menus:any;
  selectedMenu:any;
  checkoutarr:any = [];
  restaurantObj: any;
  productsList:any;
  totalprice:any;
  addressmode:string;
  finalcost:any;
  couponlist:any;
  descountcoupun:any;
  tax:any;
  deliveraddress:any;
  deliverydate:any;
  deliverytime:any;
  pickUpdetails:any;
  searchlatlong:any;
  constructor() { }
  
  latlogtrigerchange(lat:Number,long:Number){
    console.log(lat,long);
    var json = {latitude:lat,longitude:long};
    this.latlogtrigger.emit(json)
  }
  getaddresschg(){
    this.fetchaddress.emit();
  }
  deleverytypefunction(val:boolean){
    this.deliverytype.emit(val);
  }
  countChange(count:any,index:any,type:string) {
    this.productsList[index]['count'] = count;
    if(type == 'minus'){
      if(this.checkoutarr.length > 0){
        for(var checkoutindex = 0;checkoutindex<= this.checkoutarr.length-1;checkoutindex++){
          if(this.checkoutarr[checkoutindex]['menu_name'] == this.productsList[index]['menu_name'] &&
          this.checkoutarr[checkoutindex]['menu_categoryid'] == this.productsList[index]['menu_categoryid'] &&
          this.checkoutarr[checkoutindex]['count'] > 0){
            this.checkoutarr[checkoutindex] = this.productsList[index];
          } else if(this.checkoutarr[checkoutindex]['menu_name'] == this.productsList[index]['menu_name'] &&
          this.checkoutarr[checkoutindex]['menu_categoryid'] == this.productsList[index]['menu_categoryid'] &&
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
          if(this.checkoutarr[checkoutindex]['menu_name'] == this.productsList[index]['menu_name'] &&
          this.checkoutarr[checkoutindex]['menu_categoryid'] == this.productsList[index]['menu_categoryid']){
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
    for(var i=0;i<= data.data.menus.length-1;i++){
      data.data.menus[i]['count'] = 0;
      // data.data.menus[i]['price'] = 1;
      if(i == data.data.menus.length-1){
        this.categories = data.data.menus;
      }
    }
    this.menus = data.data.categories;
    console.log(data); 
    this.restomenu.emit();
  }
  changemenu(data:any){
    this.selectedMenu = data;
    this.menuclick.emit(data);
  }
  searchMenufun(data:any){
    this.searchMenu.emit(data)
  }
  foodtypechange(type:boolean){
    this.foodtype.emit(type);
  }
}
