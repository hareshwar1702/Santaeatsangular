import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  getRestaurantList() {
    return this.http.get('https://santaeatsapi.edigito.in/get_restaurant_list');
  }

}
