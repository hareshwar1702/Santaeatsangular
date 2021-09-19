import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MDBModalRef,MDBModalService } from 'angular-bootstrap-md';
import { LoginComponent } from '../login/login.component';
import { RestaurantService } from '../../service/restaurant.service';
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
  locationName:string;
  latitude:number;
  longitude:number;
  constructor(private modalService: MDBModalService,public restaurantservice : RestaurantService) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    this.validatingForm = new FormGroup({
      subscriptionFormModalName: new FormControl('', Validators.required),
      subscriptionFormModalEmail: new FormControl('', Validators.email)
    });
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

  getLocation() {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(pos) {
       console.log("Latitude: " + pos.coords.latitude +
          "Longitude: " + pos.coords.longitude);
        
      })
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

 
}