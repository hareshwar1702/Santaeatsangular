import { Component,NgZone, OnInit } from '@angular/core';
import {CommonService} from '../../../service/common.service';
import { Router } from '@angular/router';
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
  constructor(public commonservice:CommonService,public zone: NgZone,public router: Router ) {
    this.maps = this.commonservice.restorantList;
    this.lat = parseFloat(this.maps[0]['latitude']);
    this.lng = parseFloat(this.maps[0]['longitude']);
   }

  ngOnInit() {
  }

  moveToMenu(restorant:any,index:any){
    console.log(restorant);
    console.log(index);
    this.commonservice.restaurantObj = restorant;
    this.zone.run(() => {this.router.navigate(['/outlets-details/outlets']); });
  }

}
