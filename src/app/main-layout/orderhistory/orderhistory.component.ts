import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../service/restaurant.service';
import {UserService} from '../../service/user.service';
@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.scss']
})
export class OrderhistoryComponent implements OnInit {
  orderHistory:any;
  userdetails:any;
  constructor(private resauranthistory:RestaurantService,private userservice:UserService,public zone: NgZone,public router: Router) {
    this.userdetails = this.userservice.userdeails;
    if(!this.userdetails){
      this.zone.run(() => {this.router.navigate(['/dashboards']); });
    }
   }

   @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    localStorage.setItem('userinfo', JSON.stringify(this.userdetails));
    // Do more processing...
    event.returnValue = false;
   }
  ngOnInit(): void {
    this.resauranthistory.getorderhistory(this.userdetails.userdetails.user_id).subscribe(res =>{
      this.orderHistory = res;
    })
  }

}
