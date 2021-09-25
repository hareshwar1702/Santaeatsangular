import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CommonService } from '../../../service/common.service';
import { Subscription } from 'rxjs';
export let browserRefresh = false;
@Component({
  selector: 'app-outlets-details',
  templateUrl: './outlets-details.component.html',
  styleUrls: ['./outlets-details.component.scss']
})
export class OutletsDetailsComponent implements OnInit {
  restaurantObj:any;
  subscription: Subscription;
  constructor(private commonservice:CommonService,public zone: NgZone,public router: Router) {
    this.restaurantObj = this.commonservice.restaurantObj;
    if(!this.restaurantObj){
      this.zone.run(() => {this.router.navigate(['/dashboards']); });
    }
   }

  ngOnInit(): void {
  }

}
