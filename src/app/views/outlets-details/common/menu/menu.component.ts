import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../service/common.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menus:any;
  constructor(public commonservice:CommonService) {
    this.commonservice.restomenu.subscribe(()=>{
      this.menus = this.commonservice.menus;
    })
   }

  ngOnInit(): void {
  }

  menuitemclick(data:any){
    this.commonservice.changemenu(data);
  }

}
