
import { Component, OnInit } from '@angular/core';
import { MDBModalRef,MDBModalService } from 'angular-bootstrap-md';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  modalRef: MDBModalRef;
  constructor(private modalService: MDBModalService) { }

  ngOnInit(): void {
  }
  openRegisterModal() {
    this.modalRef = this.modalService.show(RegisterComponent,
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
      this.modalRef.hide();
  }
  closeLoginModal(){
    this.modalRef.hide();
  }

}
