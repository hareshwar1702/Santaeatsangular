import { Component, OnInit } from '@angular/core';
import { MDBModalRef,MDBModalService } from 'angular-bootstrap-md';
import { CommonService } from 'src/app/service/common.service';
import { AddaddressComponent } from './addaddress/addaddress.component';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  modalRef: MDBModalRef;
  constructor(private modalService: MDBModalService,private commonservice:CommonService) { }

  ngOnInit(): void {
  }

  openAddAddressModal(val:string) {
    this.commonservice.addressmode = val;
    this.modalRef = this.modalService.show(AddaddressComponent,
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

}
