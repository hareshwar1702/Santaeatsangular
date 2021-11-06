
import { Component, NgZone, OnInit } from '@angular/core';
import { MDBModalRef,MDBModalService } from 'angular-bootstrap-md';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(private modalService: MDBModalService,private formBuilder: FormBuilder,public zone: NgZone,
    public userservice:UserService,public router: Router,public  modalRef: MDBModalRef,public commonservice:CommonService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() { return this.loginForm.controls; }
  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    var formData: any = new FormData();
    formData.append('username',this.loginForm.value.username);
    formData.append('password',this.loginForm.value.password);

    this.userservice.login(formData).subscribe(res => {
      if(res && res.hasOwnProperty('userdetails')){
        this.userservice.userdeails = res;
        this.onReset();
        this.closeLoginModal();
      }
    })
  }
  openRegisterModal() { 
    this.closeLoginModal();
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
      this.userservice.closefunction();
      this.modalRef.hide();
  }

}
