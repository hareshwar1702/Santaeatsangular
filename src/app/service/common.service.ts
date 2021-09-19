import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  productcount = new EventEmitter();
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

  countChange(count:any,index:any) {
    this.productsList[index]['count'] = count;
    this.productcount.emit();
  }
  //
}
