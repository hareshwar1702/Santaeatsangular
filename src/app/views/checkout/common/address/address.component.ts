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
  constructor(private modalService: MDBModalService,private commonservice:CommonService,public userservice:UserService,
    public restaurantservice:RestaurantService) {
      this.userdetails = this.userservice.userdeails;
     }

  ngOnInit(): void {
    this.getaddresses();
  }

  getaddresses(){
    if(this.userdetails){
      // this.userdetails.userdetails.user_id
    this.restaurantservice.getaddresses(2).subscribe((data)=>{
      this.addresses = data;
    })
  }
  }
  openAddAddressModal(val:string) {
    this.commonservice.addressmode = val;
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

}
