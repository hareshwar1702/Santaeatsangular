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
  productsList = [
    {img:'https://mdbootstrap.com/img/Photos/Others/photo8.jpg',name:'Plan Padadam',cat:'Milk,Mustard,Crustaceans',price:'0.74',index:0,count: 0},
    {img:'https://mdbootstrap.com/img/Photos/Others/photo8.jpg',name:'Plan Padadam',cat:'Milk,Mustard,Crustaceans',price:'0.75',index:1,count: 0},
    {img:'https://mdbootstrap.com/img/Photos/Others/photo8.jpg',name:'Plan Padadam',cat:'Milk,Mustard,Crustaceans',price:'0.76',index:2,count: 0},
    {img:'https://mdbootstrap.com/img/Photos/Others/photo8.jpg',name:'Plan Padadam',cat:'Milk,Mustard,Crustaceans',price:'0.77',index:3,count: 0},
    {img:'https://mdbootstrap.com/img/Photos/Others/photo8.jpg',name:'Plan Padadam',cat:'Milk,Mustard,Crustaceans',price:'0.78',index:4,count: 0},
    {img:'https://mdbootstrap.com/img/Photos/Others/photo8.jpg',name:'Plan Padadam',cat:'Milk,Mustard,Crustaceans',price:'0.79',index:5,count: 0},
    {img:'https://mdbootstrap.com/img/Photos/Others/photo8.jpg',name:'Plan Padadam',cat:'Milk,Mustard,Crustaceans',price:'0.80',index:6,count: 0},
    {img:'https://mdbootstrap.com/img/Photos/Others/photo8.jpg',name:'Plan Padadam',cat:'Milk,Mustard,Crustaceans',price:'0.81',index:7,count: 0}
  ]
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
