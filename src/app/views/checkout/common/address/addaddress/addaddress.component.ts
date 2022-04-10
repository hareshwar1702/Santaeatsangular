import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { CommonService } from 'src/app/service/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RestaurantService} from '../../../../../service/restaurant.service';
import {UserService} from '../../../../../service/user.service';
@Component({
  selector: 'app-addaddress',
  templateUrl: './addaddress.component.html',
  styleUrls: ['./addaddress.component.scss']
})
export class AddaddressComponent implements OnInit {
   addressmode:boolean = false;
   addressForm: FormGroup;
   submitted = false;
   addresstype = 'Home';
   userdetails:any;
   editedOBj:any;
   geocoder: any;
  constructor(public  modalRef: MDBModalRef,private commonservice:CommonService,private formBuilder: FormBuilder,
     private restaurantservice:RestaurantService,private userservice:UserService) { 
     this.userdetails = this.userservice.userdeails; 
  }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required],
      address: ['', Validators.required],
      aptno: ['', Validators.required],
      postalcode: ['', Validators.required],
      landmark: ['', Validators.required],
      addresstype:['',Validators.required]
    });
    if(this.commonservice.addressmode == 'Edit'){
      this.addressForm.setValue({
        username : this.commonservice.editedobj.fname,
        email :  this.commonservice.editedobj.email,
        number :  this.commonservice.editedobj.mobileno,
        address :  this.commonservice.editedobj.address,
        aptno :  this.commonservice.editedobj.apartment_no,
        postalcode :  this.commonservice.editedobj.pincode,
        landmark :  this.commonservice.editedobj.landmark,
        addresstype : "Home"
      });
      this.addressmode = true;
    }
  }

  get f() { return this.addressForm.controls; }
  onReset() {
    this.submitted = false;
    this.addressForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    this.geocoder = new google.maps.Geocoder();
    var lat:Number = 0;
    var long:Number = 0; 
    
    this.geocoder.geocode({'address': this.addressForm.value.aptno+','+this.addressForm.value.address+','+this.addressForm.value.postalcode}, (results:any, status:any) => {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        long =  results[0].geometry.location.lng();
        this.addresschanges(lat,long)
   } else {
          console.log('Error - ', results, ' & Status - ', status);
      }
    });
    // stop here if form is invalid
    if (this.addressForm.invalid) {
        return;
    }
    
   
  }

  addresschanges(lat:any,long:any){
    var formData: any = new FormData();
    formData.append('user_id',this.userdetails.userdetails.user_id);
    formData.append('fullname',this.addressForm.value.username);
    formData.append('email',this.addressForm.value.email);
    formData.append('mobileno',this.addressForm.value.number);
    formData.append('address',this.addressForm.value.address);
    formData.append('apartment_no',this.addressForm.value.aptno);
    formData.append('landmark',this.addressForm.value.landmark);
    formData.append('addresstype',this.addressForm.value.addresstype);
    formData.append('pincode',this.addressForm.value.postalcode);
    formData.append('latitude',lat);
    formData.append('longitude',long);
    if(this.addressmode == false){
    this.restaurantservice.addaddress(formData).subscribe(res => {
      var data:any = res;
      if(data && data['message'] == 'success'){
        // this.userservice.userdeails = res;
        // this.zone.run(() => {this.router.navigate(['/dashboards']); });
        this.commonservice.getaddresschg();
        this.onReset();
        this.closeLoginModal();
      }
    })
  } else {
    formData.append('id',this.commonservice.editedobj.id);
    this.restaurantservice.editaddress(formData).subscribe(res => {
      var data:any = res;
      if(data && data['message'] == 'success'){
        // this.userservice.userdeails = res;
        // this.zone.run(() => {this.router.navigate(['/dashboards']); });
        this.commonservice.getaddresschg();
        this.onReset();
        this.closeLoginModal();
      }
    })
  }
  }
  closeLoginModal(){
    this.modalRef.hide();
}

}
