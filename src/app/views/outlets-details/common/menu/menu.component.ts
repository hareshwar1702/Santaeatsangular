import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../service/common.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menus:any;
  index =  0;
  constructor(public commonservice:CommonService) {
    this.commonservice.restomenu.subscribe(()=>{
      this.menus = this.commonservice.menus;
      this.commonservice.changemenu(this.menus[0]);
    })
   }

  ngOnInit(): void {
  }

  menuitemclick(data:any,index:number){
    this.index =  index;
    console.log(index);
    this.commonservice.changemenu(data);
  }

}
