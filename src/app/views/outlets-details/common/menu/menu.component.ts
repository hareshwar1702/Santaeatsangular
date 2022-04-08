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
  searchname:any;
  constructor(public commonservice:CommonService) {
    this.commonservice.restomenu.subscribe(()=>{
      this.menus = this.commonservice.menus;
      this.commonservice.changemenu(this.menus[0]);
    })
    // this.commonservice.searchMenu.subscribe((data)=>{
    //     this.searchname = data;
    //     this.showMenuonSearch();
    // })
   }

  ngOnInit(): void {
  }
 
  showMenuonSearch(){
    var filter, li, a, i, txtValue;
    filter = this.searchname.toUpperCase();
    var ul:any = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
  }
  menuitemclick(data:any,index:number){
    this.index =  index;
    console.log(index);
    this.commonservice.changemenu(data);
  }

}
