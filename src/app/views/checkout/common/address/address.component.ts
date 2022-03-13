import { Component, OnInit } from '@angular/core';
import { MDBModalRef,MDBModalService } from 'angular-bootstrap-md';
import { CommonService } from 'src/app/service/common.service';
import { AddaddressComponent } from './addaddress/addaddress.component';
import { UserService } from '../../../../service/user.service';
import {RestaurantService} from '../../../../service/restaurant.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  modalRef: MDBModalRef;
  userdetails:any;
  addresses:any;
  deleveryaddressarr  = [];
  constructor(private modalService: MDBModalService,private commonservice:CommonService,public userservice:UserService,
    public restaurantservice:RestaurantService) {
      this.userdetails = this.userservice.userdeails;
      this.commonservice.fetchaddress.subscribe(()=>{
        this.getaddresses();
      })
     }

  ngOnInit(): void {
    this.getaddresses();
  }

  getaddresses(){
    if(this.userdetails){
    this.restaurantservice.getaddresses(this.userdetails.userdetails.user_id).subscribe((data)=>{
      this.addresses = undefined;
      this.addresses = data;
    })
  }
  }
  openAddAddressModal(val:string,data:any) {
    this.commonservice.addressmode = val;
    this.commonservice.editedobj = data;
    this.modalRef = this.modalService.show(AddaddressComponent,
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
  setdeliveraddress(deliveraddress:any){
    this.commonservice.deliveraddress = deliveraddress;
  }
}
