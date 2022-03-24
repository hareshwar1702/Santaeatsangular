import { Component, NgZone, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { RestaurantService } from 'src/app/service/restaurant.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit {
  paymentHandler:any = null;
  totalamount:number;
  checkoutarr:any;
  userdetails:any;
  pickUpdetails:any;
  deliveryaddress:any;
  restoObj:any;
  deliverydate:any;
  deliverytime:any;
    @ViewChild('centralModalSm') centralModalSm: any;
  constructor(private commonservice:CommonService,private userservice:UserService,public restaurantservice:RestaurantService,
    public zone: NgZone,public router: Router) { 
    this.totalamount = this.commonservice.finalcost;
    this.userdetails = this.userservice.userdeails;
    this.checkoutarr = this.commonservice.checkoutarr;
    this.pickUpdetails = this.commonservice.pickUpdetails;
    this.deliveryaddress = this.commonservice.deliveraddress;
    this.restoObj = this.commonservice.restaurantObj;
    this.deliverydate = this.commonservice.deliverydate;
    this.deliverytime = this.commonservice.deliverytime;
    if(!this.userdetails){
      this.zone.run(() => {this.router.navigate(['/dashboards']); });
    }
  }
  

  ngOnInit(): void {
    this.invokeStripe(); 
  }

  makePayment() {
    var suggestedText = this.commonservice.suggestedText;
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HZakeG7964PNuDvKfjDJS4VzIHAn0AZkIL1KnM8PCCa74SJtn3HBUfG0guhn0vlJyCwfeB0eezzYgLvJ9uLPlA600YEjqWU7f',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
        var formData: any = new FormData();
        formData.append('order',this.checkoutarr);
        formData.append('user_id',this.userdetails.userdetails.user_id);
        formData.append('cart_subtotal',this.totalamount+111);
        formData.append('total_cgst',this.restoObj.cgst);
        formData.append('total_sgst',this.restoObj.sgst);
        formData.append('payment_type',"Card Payment");
        formData.append('delivery_address',this.deliveryaddress);
        formData.append('order_type',"takeout");
        formData.append('charges',40);
        formData.append('total', this.totalamount);
        formData.append('suggestedchange',suggestedText)
        formData.append('transaction_id',stripeToken);
        formData.append('easepayid','');
        formData.append('discount_amount',0);
        formData.append('coupon','');
        formData.append('Pickup',this.pickUpdetails);
        formData.append('order_date', this.deliverydate);
        formData.append('order_time', this.deliverytime);
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
      amount: this.totalamount * 100
    });
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
