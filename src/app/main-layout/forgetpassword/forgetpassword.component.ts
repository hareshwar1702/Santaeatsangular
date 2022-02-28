
import { Component, NgZone, OnInit } from '@angular/core';
import { MDBModalRef,MDBModalService } from 'angular-bootstrap-md';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
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

    this.userservice.changepassword(formData).subscribe(res => {
      var response:any =  res;
      if( response['message'] =="Password Changed Successfully!!" ){
        this.userservice.userdeails = response;
        this.onReset();
        this.closeLoginModal();
      } else {
        alert("Please enter valid credentials!");
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
