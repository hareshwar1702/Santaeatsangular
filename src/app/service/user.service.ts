import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userdeails:any;
  url = 'https://api.foodbahok.com';
  loginchange = new EventEmitter();
  constructor(public httpclient: HttpClient) { }

  login(val:FormData){
    return this.httpclient.post(this.url+'/login',val);
  }

  register(val:FormData){
    return this.httpclient.post(this.url+'/sign-up',val);
  }
  closefunction(){
    this.loginchange.emit();
  }
  changepassword(val:FormData){
    return this.httpclient.post(this.url+'/change-password',val);
  }
}
