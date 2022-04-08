import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../../../service/common.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsList:any;
  menuid = '';
  foodtype = '';
  searchname:any;
  constructor(private commonservice:CommonService) {
    this.commonservice.productcount.subscribe(() => {
      // this.productsList = this.commonservice.productsList;
      if(this.foodtype == 'Vegetarian'){
        var pList = this.commonservice.productsList;
        var temppList = []; 
        for(let i=0;i<= pList.length -1;i++ ){
          if(pList[i]['menu_foodtype'] == 'Vegetarian'){
            temppList.push(pList[i]); 
          }
        }
        this.productsList = temppList;
      } else {  
        this.productsList = this.commonservice.productsList;
      } 
    });
    this.commonservice.menuclick.subscribe((data)=>{
      this.menuid = data.id;
      this.productsList= null;
      if(this.foodtype == 'Vegetarian'){
        var pList =this.commonservice.categories;
        var temppList = []; 
        for(let i=0;i<= pList.length -1;i++ ){
          if(pList[i]['menu_foodtype'] == 'Vegetarian'){
            temppList.push(pList[i]); 
          }
        }
        this.productsList = temppList;
      } else {
      this.productsList = this.commonservice.categories;
      } 
      for(var i=0;i<=this.productsList.length-1;i++){
        this.productsList[i]['index'] = i;
      }
      this.commonservice.productsList = this.productsList;
    });
    this.commonservice.searchMenu.subscribe((data)=>{
      this.searchname = data;
      this.showMenuonSearch();
  })
    this.commonservice.foodtype.subscribe((res) =>{
      if(res == true){
        this.foodtype = 'Vegetarian';
        if(this.foodtype == 'Vegetarian'){
          var pList = this.commonservice.productsList;
          var temppList = []; 
          for(let i=0;i<= pList.length -1;i++ ){
            if(pList[i]['menu_foodtype'] == 'Vegetarian'){
              temppList.push(pList[i]); 
            }
          }
          this.productsList = temppList;
        } 
      } else {
        this.foodtype = '';
        this.productsList = this.commonservice.productsList;
      }
    })
   }

  ngOnInit(): void {
  }

  showMenuonSearch(){
    var filter, li1, i, txtValue;
    filter = this.searchname.toUpperCase();
    var ul:any = document.getElementById("myUL1");
    li1 = ul.getElementsByTagName("li");
    for (i = 0; i < li1.length; i++) {
        // a = li1[i].getElementsByTagName("p")[0];
        txtValue = li1[i].textContent || li1[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li1[i].style.display = "";
        } else {
            li1[i].style.display = "none";
        }
    }
  }

  changeCount(type:any,index:any){
    if(type == 'minus'){
      if( this.productsList[index]['count'] > 0){ 
        this.productsList[index]['count'] = this.productsList[index]['count'] -1;
        this.commonservice.countChange(this.productsList[index]['count'],index,'minus');
      }
    } else{
        this.productsList[index]['count'] = this.productsList[index]['count'] +1;
        this.commonservice.countChange(this.productsList[index]['count'],index,'plus');
    }
  }

}
