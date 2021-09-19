
import { Component, NgZone, OnInit } from '@angular/core';
import { MDBModalRef,MDBModalService } from 'angular-bootstrap-md';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false; 
  constructor(private modalService: MDBModalService,private formBuilder: FormBuilder,public zone: NgZone,
    public userservice:UserService,public router: Router,public  modalRef: MDBModalRef) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      mobileno: ['', Validators.required],
      fname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      reffralcode: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    var formData1= new FormData();
    formData1.append('mobileno',this.registerForm.value.mobileno);
    formData1.append('fname',this.registerForm.value.fname);
    formData1.append('email',this.registerForm.value.email);
    formData1.append('password',this.registerForm.value.password);
    formData1.append('reffralcode',this.registerForm.value.reffralcode);
    formData1.append('device_token',Math.random() + navigator.userAgent + Date() );
    this.userservice.register(formData1).subscribe(res => {
      if(res && res.hasOwnProperty('userdetails')){
        this.zone.run(() => {this.router.navigate(['/dashboards']); });
        this.onReset();
        this.closeLoginModal();
      }
    })
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
