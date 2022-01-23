import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MDBModalRef,MDBModalService } from 'angular-bootstrap-md';
import { LoginComponent } from '../login/login.component';
import { RestaurantService } from '../../service/restaurant.service';
import { CommonService } from '../../service/common.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
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
    // this.getlatlong();
  }
  changedeliverytype(){
    this.deliverytype = !this.deliverytype;
    this.commonService.deleverytypefunction(this.deliverytype);
  }
  // openModal() {
  //   this.modalRef = this.modalService.show(LoginComponent);
  // }

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

  // getlatlong(){
  //   var abc = new google.maps.Geocoder();
  //   abc.geocode( { 'address': "pune"}, function(results, status) {

  //     if (status == google.maps.GeocoderStatus.OK) {
  //         var latitude = results[0].geometry.location.lat();
  //         var longitude = results[0].geometry.location.lng();
  //         console.log(latitude, longitude);
  //         } 
  //     }); 
  // }
 
  getmyAddress(){
    this.getLocation().then((res)=>{
      this.restaurantservice.getaddress(res).subscribe((data:any) =>{
       for(var i=0;i< data.results.length;i++){
        if(data.results[i].geometry.location.lat == res[0] && data.results[i].geometry.location.lng == res[1]){
          this.locationName = data.results[i].formatted_address;
        }
       }
      });
    //   return new Promise(function (resolve, reject) {
    //     var request = new XMLHttpRequest();

    //     var method = 'GET';
    //     var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + res[0] + ',' + res[1] + '&sensor=true';
    //     var async = true;

    //     request.open(method, url, async);
    //     request.onreadystatechange = function () {
    //         if (request.readyState == 4) {
    //             if (request.status == 200) {
    //                 var data = JSON.parse(request.responseText);
    //                 var address = data.results[0];
    //                 resolve(address);
    //             }
    //             else {
    //                 reject(request.status);
    //             }
    //         }
    //     };
    //     request.send();
    // });
    })
  }
  getLocation(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
        if (navigator.geolocation){
        //   navigator.geolocation.getCurrentPosition(function(pos) {
        //    console.log("Latitude: " + pos.coords.latitude +
        //       "Longitude: " + pos.coords.longitude);
        //     sessionStorage.setItem('Latitude',pos.coords.latitude.toString());
        //     sessionStorage.setItem('Longitude',pos.coords.longitude.toString());
        //     resolve([ coords[0].toString(), coords[1].toString() ]);
        //   })

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