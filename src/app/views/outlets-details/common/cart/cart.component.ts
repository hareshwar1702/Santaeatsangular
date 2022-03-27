import { Component, NgZone, OnInit , AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import {CommonService} from '../../../../service/common.service';
import { UserService } from '../../../../service/user.service';
import { LoginComponent } from '../../../../main-layout/login/login.component';
import { MDBModalRef,MDBModalService } from 'angular-bootstrap-md';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {
  checkoutarr:any;
  totalprice:any = 0;
  userobj:any;
  modalRef: MDBModalRef;
  restoObj:any;
  constructor(private commonservice:CommonService,private modalService: MDBModalService,public zone: NgZone,public router: Router,public userservice:UserService) {
    this.checkoutarr = this.commonservice.checkoutarr;
    this.restoObj = this.commonservice.restaurantObj;
    this.userobj = this.userservice.userdeails
    this.commonservice.productcount.subscribe(() => {
      this.totalprice = 0;
      this.checkoutarr = this.commonservice.checkoutarr;
      for(let i =0;i<  this.checkoutarr.length;i++){
        if(this.checkoutarr[i]['count'] > 0){
          this.totalprice = this.totalprice + (parseFloat(this.checkoutarr[i]['menu_price'])*this.checkoutarr[i]['count']);
          this.commonservice.totalprice = this.totalprice;
        }
      }
    });
    this.userservice.loginchange.subscribe(()=>{
      this.userobj = this.userservice.userdeails
    })

   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if(this.checkoutarr.length !=0){
      setTimeout(() => {
        let text = "You have already items in your cart from different outlet. Are you sure you want remove?";
    if(this.checkoutarr[0]['restaurant_id'] != this.restoObj.restaurant_id){
      if (confirm(text) == true) {
      this.checkoutarr = undefined;
      this.commonservice.checkoutarr = [];
      } else {
        if(this.checkoutarr[0]['restaurant_id'] != this.restoObj.restaurant_id){
          this.zone.run(() => {this.router.navigate(['/dashboards']); });
        }
      }
    } else {
      for(let i =0;i<  this.checkoutarr.length;i++){
        if(this.checkoutarr[i]['count'] > 0){
          this.totalprice = this.totalprice + (parseFloat(this.checkoutarr[i]['menu_price'])*this.checkoutarr[i]['count']);
          this.commonservice.totalprice = this.totalprice;
        }
      }
    } 
      }, 1000);
  }
}

  deleteCard(){
    this.totalprice = 0;
    this.commonservice.checkoutarr = [];
    this.checkoutarr = undefined;

  }

  checkOut(){
    if(this.totalprice != 0 && this.userobj){
      this.zone.run(() => {this.router.navigate(['/checkout/checkout-details']); });
    } else if(!this.userobj){
      this.openLoginModal();
    } else {
      alert("Please add value in card!");
    }
  }

  openLoginModal(){
    this.modalRef = this.modalService.show(LoginComponent,
      {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: 'form-elegant',
        containerClass: 'top',
        animated: true

      });
  }
  changeCount(type:any,index:any){
    if(type == 'minus'){
      if( this.checkoutarr[index]['count'] >= 0){
        this.checkoutarr[index]['count'] = this.checkoutarr[index]['count'] -1;
        this.commonservice.countChange(this.checkoutarr[index]['count'],this.checkoutarr[index]['index'],'minus');
      }
    } else{
        this.checkoutarr[index]['count'] = this.checkoutarr[index]['count'] +1;
        this.commonservice.countChange(this.checkoutarr[index]['count'],index,'plus');
    }
  }

}
