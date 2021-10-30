import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';


@Component({
  selector: 'app-checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.scss']
})
export class CheckoutDetailsComponent implements OnInit {
  totalprice;
  constructor(private commonservice:CommonService,public zone: NgZone,public router: Router,) { 
    this.totalprice = this.commonservice.totalprice;
    if(!this.totalprice){
      this.zone.run(() => {this.router.navigate(['/dashboards']); });
    }
  }

  ngOnInit(): void {
  }
}
