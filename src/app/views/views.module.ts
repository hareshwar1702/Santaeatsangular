import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

import { CalendarModule,  } from 'angular-calendar';
import { SharedModule } from '../shared/shared.module';

import { FooterComponent } from '../main-layout/footer/footer.component';
import { BasicTableComponent } from './tables/basic-table/basic-table.component';
import { ModalsComponent } from './modals/modals.component';
import { Map1Component } from './maps/map1/map1.component';
import { StatsCardComponent } from './dashboards/common/stats-card/stats-card.component';
import { StatsCard2Component } from './dashboards/common/stats-card2/stats-card2.component';
import { Dashboard1Component } from './dashboards/dashboard1/dashboard1.component';
import { Profile1Component } from './profile/profile1/profile1.component';
import { HelpComponent } from './help/help.component';

import { CategoriesComponent } from './dashboards/common/categories/categories.component';
import { BannerCarouselComponent } from '../main-layout/banner-carousel/banner-carousel.component';
import { OutletsDetailsComponent } from './outlets-details/outlets-details/outlets-details.component';
import { MenuComponent } from './outlets-details/common/menu/menu.component';
import { ProductsComponent } from './outlets-details/common/products/products.component';
import { CartComponent } from './outlets-details/common/cart/cart.component';
import { CheckoutDetailsComponent } from './checkout/checkout-details/checkout-details.component';
import { AddressComponent } from './checkout/common/address/address.component';
import { CheckoutCartComponent } from './checkout/common/checkout-cart/checkout-cart.component';
import { DeliveryDetailsComponent } from './checkout/common/delivery-details/delivery-details.component';
import { CustomerDetailsComponent } from './checkout/common/customer-details/customer-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: ''
    }),
    CalendarModule.forRoot(),

  ],
  declarations: [
    FooterComponent,
    BasicTableComponent,
    ModalsComponent,
    Map1Component,
    StatsCardComponent,
    StatsCard2Component,
    Dashboard1Component,
    Profile1Component,
    HelpComponent,
    CategoriesComponent,
    BannerCarouselComponent,
    OutletsDetailsComponent,
    MenuComponent,
    ProductsComponent,
    CartComponent,
    CheckoutDetailsComponent,
    AddressComponent,
    CheckoutCartComponent,
    DeliveryDetailsComponent,
    CustomerDetailsComponent

  ],
  exports: [
    FooterComponent,
    BasicTableComponent,
    ModalsComponent,
    Map1Component,
    StatsCardComponent,
    StatsCard2Component,    
    Dashboard1Component,
    CategoriesComponent,
    BannerCarouselComponent,
    OutletsDetailsComponent,
    CartComponent,
    CheckoutDetailsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ViewsModule { }
