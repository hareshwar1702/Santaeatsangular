import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userdeails:any;
  constructor(public httpclient: HttpClient) { }

  login(val:FormData){
    return this.httpclient.post("https://santaeatsapi.edigito.in/login",val);
  }

  register(val:FormData){
    return this.httpclient.post("https://santaeatsapi.edigito.in/sign-up",val);
  }
}
