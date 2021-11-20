import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { UserService } from '../../../../service/user.service';
import {RestaurantService} from '../../../../service/restaurant.service';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {
  isHomeDelivery:boolean = true;
  paymentHandler:any = null;
  checkoutarr:any;
  time = 0;
  date:Date;
  totalamount:number;
  userdetails:any;
  showModal:boolean = false;
  bsValue = new Date();
   bsRangeValue: Date[];
   maxDate = new Date();
   minDate = new Date();
  @ViewChild('centralModalSm') centralModalSm: any;
  constructor(private commonservice:CommonService,private userservice:UserService,public restaurantservice:RestaurantService) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.totalamount = this.commonservice.finalcost;
    this.userdetails = this.userservice.userdeails;
    this.checkoutarr = this.commonservice.checkoutarr;
   }

  ngOnInit(): void {
    this.invokeStripe(); 

  }
 
  homeActive(){
    this.commonservice.deleverytypefunction(true);
    this.isHomeDelivery = true;
  }
  pickUpActive(){
    this.commonservice.deleverytypefunction(false);
    this.isHomeDelivery = false;
  }

  makePayment(amount:number) {
    if(this.date && this.time != 0){
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HZakeG7964PNuDvKfjDJS4VzIHAn0AZkIL1KnM8PCCa74SJtn3HBUfG0guhn0vlJyCwfeB0eezzYgLvJ9uLPlA600YEjqWU7f',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
        var formData: any = new FormData();
        formData.append('order',this.checkoutarr);
        formData.append('user_id',this.userdetails.userdetails.user_id);
        formData.append('cart_subtotal',this.totalamount);
        formData.append('total_cgst',2);
        formData.append('total_sgst',5);
        formData.append('payment_type',"Cash on delivery");
        formData.append('delivery_address',"Pune");
        formData.append('order_type',"takeout");
        formData.append('charges',40);
        formData.append('total',250);
        formData.append('transaction_id','');
        formData.append('easepayid','');
        formData.append('discount_amount',0);
        formData.append('coupon','');
        formData.append('order_date',"21-08-2021");
        formData.append('order_time',"20:46");
        this.restaurantservice.saveorder(formData).subscribe((res:any)=>{
          if(res['message'] == 'Order Saved.'){
            alert("success!");
          } else {
            alert("fails!");
          }
        })
      }
    });
  
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100
    });
  } else {
    alert("Please select date and time First!");
  }
  }
  savedetails(){
    var formData: any = new FormData();
    formData.append('order',this.checkoutarr);
    formData.append('user_id',this.userdetails.userdetails.user_id);
    formData.append('cart_subtotal',this.totalamount);
    formData.append('total_cgst',2);
    formData.append('total_sgst',5);
    formData.append('payment_type',"Cash on delivery");
    formData.append('delivery_address',"Pune");
    formData.append('order_type',"takeout");
    formData.append('charges',40);
    formData.append('total',250);
    formData.append('transaction_id','');
    formData.append('easepayid','');
    formData.append('discount_amount',0);
    formData.append('coupon','');
    formData.append('order_date',"21-08-2021");
    formData.append('order_time',"20:46");
    this.restaurantservice.saveorder(formData).subscribe((res:any)=>{
      if(res['message'] == 'Order Saved.'){
        alert("success!");
      } else {
        alert("fails!");
      }
    })
  }
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HZakeG7964PNuDvKfjDJS4VzIHAn0AZkIL1KnM8PCCa74SJtn3HBUfG0guhn0vlJyCwfeB0eezzYgLvJ9uLPlA600YEjqWU7f',
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
