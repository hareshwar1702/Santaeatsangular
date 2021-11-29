import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customerDetails ={'email':'','number':'','name':'','pickUpFrom':''}
  constructor(public commonservice:CommonService) { }

  ngOnInit(): void {
  }

  changepickUpFrom(){
    this.commonservice.pickUpdetails = this.customerDetails;
  }
}
