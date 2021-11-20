import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../../service/common.service';
@Component({
  selector: 'app-map1',
  templateUrl: './map1.component.html',
  styleUrls: ['./map1.component.scss']
})
export class Map1Component implements OnInit {
  public maps: any ;
  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number;
  lng: number;
  constructor(public commonservice:CommonService ) {
    this.maps = this.commonservice.restorantList;
    this.lat = parseFloat(this.maps[0]['latitude']);
    this.lng = parseFloat(this.maps[0]['longitude']);
   }

  ngOnInit() {
  }

}
