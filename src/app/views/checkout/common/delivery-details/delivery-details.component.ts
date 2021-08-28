import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {
  isHomeDelivery:boolean = true;
 
  constructor() { }

  ngOnInit(): void {
  }
  homeActive(){
    this.isHomeDelivery = true;
  }
  pickUpActive(){
    this.isHomeDelivery = false;
  }
}
