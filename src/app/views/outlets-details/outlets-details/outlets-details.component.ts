import { Component, OnInit } from '@angular/core';
import {CommonService } from '../../../service/common.service';
@Component({
  selector: 'app-outlets-details',
  templateUrl: './outlets-details.component.html',
  styleUrls: ['./outlets-details.component.scss']
})
export class OutletsDetailsComponent implements OnInit {
  restaurantObj:any;
  constructor(private commonservice:CommonService) {
    this.restaurantObj = this.commonservice.restaurantObj;
   }

  ngOnInit(): void {
  }

}
