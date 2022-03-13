import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MDBModalRef,MDBModalService } from 'angular-bootstrap-md';
import { LoginComponent } from '../login/login.component';
import { RestaurantService } from '../../service/restaurant.service';
import { CommonService } from '../../service/common.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ForgetpasswordComponent} from '../forgetpassword/forgetpassword.component';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;
  validatingForm: FormGroup;
  clicked: boolean;
  modalRef: MDBModalRef;
  locationName:string = '';
  latitude:number;
  longitude:number;
  userobj:any;
  restaurantObj:any;
  deliverytype:boolean = true;
  geocoder: any;

  constructor(private modalService: MDBModalService,public restaurantservice : RestaurantService,
       public commonService : CommonService,public userservice:UserService,public zone: NgZone,public router: Router,) {
    this.clicked = this.clicked === undefined ? false : true;
    this.userservice.loginchange.subscribe(()=>{
      this.userobj = this.userservice.userdeails;
    })
    this.commonService.deliverytype.subscribe((val)=>{
      this.deliverytype = val;
      document.getElementById('deliverytype')?.click();
    })
  }

  ngOnInit() {
    this.validatingForm = new FormGroup({
      subscriptionFormModalName: new FormControl('', Validators.required),
      subscriptionFormModalEmail: new FormControl('', Validators.email)
    });
    this.getmyAddress()
  }
  changedeliverytype(){
    this.deliverytype = !this.deliverytype;
    this.commonService.deleverytypefunction(this.deliverytype);
  }

  get subscriptionFormModalName() {
    return this.validatingForm.get('subscriptionFormModalName');
  }

  get subscriptionFormModalEmail() {
    return this.validatingForm.get('subscriptionFormModalEmail');
  }
  setClicked(val: boolean): void {
    this.clicked = val;
  }
  openLoginModal() {
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

  getlatlong(){
    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({'address': this.locationName}, (results:any, status:any) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.commonService.searchlatlong = {'lat':results[0].geometry.location.lat(),'long':results[0].geometry.location.lng()}
        this.commonService.latlogtrigerchange(results[0].geometry.location.lat(),results[0].geometry.location.lng());
      } else {
          console.log('Error - ', results, ' & Status - ', status);
      }
    });
  }
  changePassword(){
      this.modalRef = this.modalService.show(ForgetpasswordComponent,
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
  getmyAddress(){
    this.getLocation().then((res)=>{
      this.restaurantservice.getaddress(res).subscribe((data:any) =>{
       for(var i=0;i< data.results.length;i++){
        if(data.results[i].geometry.location.lat == res[0] && data.results[i].geometry.location.lng == res[1]){
          this.locationName = data.results[i].formatted_address;
          this.commonService.searchlatlong = {'lat':data.results[i].geometry.location.lat,'long': data.results[i].geometry.location.lng};
          this.commonService.latlogtrigerchange(data.results[i].geometry.location.lat,data.results[i].geometry.location.lng);
        }
       }
      });
    })
  }
  getLocation(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
        if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(pos => {
            this.commonService.latlogtrigerchange(pos.coords.latitude, pos.coords.longitude);
            resolve([pos.coords.latitude.toString(), pos.coords.longitude.toString() ]);
          });
    
        } else {
          console.log("Geolocation is not supported by this browser.");
          reject(false);
        }
      }); 

  }

  logout(){
    this.userobj = undefined;
    this.userservice.userdeails = undefined;
      this.zone.run(() => {this.router.navigate(['/dashboards']); });
  }
  
 
}