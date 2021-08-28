
import { Component, OnInit } from '@angular/core';
import { MDBModalRef,MDBModalService } from 'angular-bootstrap-md';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  modalRef: MDBModalRef;
  constructor(private modalService: MDBModalService) { }

  ngOnInit(): void {
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
      this.modalRef.hide();
  }
  closeLoginModal(){
    this.modalRef.hide();
  }
}
