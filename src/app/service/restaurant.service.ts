import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  url = 'https://api.foodbahok.com';

  constructor(private http: HttpClient) { }

  getRestaurantList(data:any) {
    var latitude='';    
    var longitude='';
    if(data){
        latitude = data.latitude;
        longitude = data.longitude;
    }
    return this.http.get(this.url+'/get_restaurant_list?latitude='+latitude+'&longitude='+longitude+'');
  }
  getRestaurantListCategorie(data:any){
    var latitude='';    
    var longitude='';
    if(data){
        latitude = data.latitude;
        longitude = data.longitude;
    }
    const formdata:any = new FormData()
    formdata.append('parent_category_id',data.pid);
    return this.http.post(this.url+'/restaurant_list_parent_categorywise?latitude='+latitude+'&longitude='+longitude+'',formdata);
  }
  getaAddressdetails(lat:number,long:number){
    return this.http.get('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+lat+'&longitude='+long+'&localityLanguage=en')
  }
  getCategories(){
    return this.http.get(this.url+'/parentcategories');
  }
  getaddress(data:any){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + data[0] + ',' + data[1] + '&key=AIzaSyCEUpMCzyUSq20aQbmtH90UvrQZUvGyQkg');
  }
  restopruntmenu(id:Number){
    return this.http.get(this.url+'/mapped_restaurant_menus?restaurant_id='+id+''); 
  }
  addaddress(data:any){
    return this.http.post(this.url+'/add-address',data);
  }
  editaddress(data:any){
    return this.http.post(this.url+'/update-address',data);
  }
  getorderhistory(data:any){
    return this.http.get(this.url+'/orders?user_id='+data+"");
  }
  getaddresses(data:any){
    return this.http.get(this.url+"/address?user_id="+data+"");
  }
  saveorder(data:FormData){
    return this.http.post(this.url+"/save-order",data);
  }
  couponList(data:any){
    return this.http.get(this.url+"/coupons?restaurant_id="+data);
  }
  descountcoupon(data:FormData){
    return this.http.post(this.url+"/discount_coupon",data);
  }
  taxes(){
    return this.http.get(this.url+"/tax");
  }
}
