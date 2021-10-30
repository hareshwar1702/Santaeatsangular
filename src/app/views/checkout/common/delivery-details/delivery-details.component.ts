import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {
  isHomeDelivery:boolean = true;
  paymentHandler:any = null;
  totalamount:number;
  userdetails:any;
  showModal:boolean = false;
  @ViewChild('centralModalSm') centralModalSm: any;
  constructor(private commonservice:CommonService,private userservice:UserService) {
    this.totalamount = this.commonservice.finalcost;
    this.userdetails = this.userservice.userdeails;
   }

  ngOnInit(): void {
    this.invokeStripe(); 
  }

  homeActive(){
    this.isHomeDelivery = true;
  }
  pickUpActive(){
    this.isHomeDelivery = false;
  }

  makePayment(amount:number) {
    if(this.userdetails){
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Jq05JSFO2k4lj9j8r9TeyYlzrmh1aDD7XmZcVjFR8ZykCIyLSxdsT1DNBdMeQA1fNytJKbagcKYrfg1Wr5Kg64S00CqS8PQjO',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });
  
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100
    });
  } else {
    alert("Please Login First!");
  }
  }
  
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Jq05JSFO2k4lj9j8r9TeyYlzrmh1aDD7XmZcVjFR8ZykCIyLSxdsT1DNBdMeQA1fNytJKbagcKYrfg1Wr5Kg64S00CqS8PQjO',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
        
      window.document.body.appendChild(script);
    }
  }
}
