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
  deleveryaddressarr:any  = [];
  restaurantObj:any ;
  deliverychargecomman:any;
  constructor(private modalService: MDBModalService,private commonservice:CommonService,public userservice:UserService,
    public restaurantservice:RestaurantService) {
      this.userdetails = this.userservice.userdeails;
      this.deliverychargecomman =  this.commonservice.deliveryCharge;
      this.restaurantObj  = this.commonservice.restaurantObj;
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
  setdeliveraddress(deliveraddress:any,index:number){
    this.commonservice.deliveraddress = deliveraddress;
    var tempdeliveryObj:any = this.addresses.address[index];
    if(!tempdeliveryObj.hasOwnProperty('checkflag') || this.addresses.address[index]['checkflag'] == false){
      this.addresses.address[index]['checkflag'] = true;
      var distimkm = this.getDistanceFromLatLonInKm(deliveraddress.latitude,deliveraddress.longitude,this.restaurantObj.latitude,this.restaurantObj.longitude);
      var distanceimMeter = Number((Number(distimkm)*1000).toFixed()) - 1000;
      if(distanceimMeter > 0){
       this.commonservice.deliveryCharge = Number((((distanceimMeter / 100 ) * 0.5) + 6).toFixed())
       this.commonservice.deviveryAddchange();
      } else {
        this.commonservice.deliveryCharge = 6;
        this.commonservice.deviveryAddchange();
      }
    } else {
      this.addresses.address[index]['checkflag'] = false;
      this.commonservice.deliveryCharge = this.deliverychargecomman;
      this.commonservice.deviveryAddchange();
    }
  }
  getDistanceFromLatLonInKm(lat1:number, lon1:number, lat2:number, lon2:number) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  deg2rad(deg:any) {
    return deg * (Math.PI/180)
  }
  
}
