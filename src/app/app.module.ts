import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { AppComponent } from './app.component';

import { ViewsModule } from './views/views.module';
import { SharedModule } from './shared/shared.module';
import { ErrorModule } from './views/errors/error.module';
import { NgxStripeModule } from 'ngx-stripe';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


import { Map1Component } from './views/maps/map1/map1.component';
import { ModalsComponent } from './views/modals/modals.component';
import { BasicTableComponent } from './views/tables/basic-table/basic-table.component';
import { Profile1Component } from './views/profile/profile1/profile1.component';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';
import { OutletsDetailsComponent } from './views/outlets-details/outlets-details/outlets-details.component';



// main layout
import { NavigationModule } from './main-layout/navigation/navigation.module';
import { LoginComponent } from './main-layout/login/login.component';
import { RegisterComponent } from './main-layout/register/register.component';
import { CheckoutDetailsComponent } from './views/checkout/checkout-details/checkout-details.component';
import { OrderhistoryComponent } from './main-layout/orderhistory/orderhistory.component';
import { PaymentSummaryComponent } from './views/checkout/payment-summary/payment-summary.component';
import { ForgetpasswordComponent } from './main-layout/forgetpassword/forgetpassword.component';
// import { BannerCarouselComponent } from './main-layout/banner-carousel/banner-carousel.component';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboards' },
  // { path: 'carousel', children:
  // [
  //   { path: '', component:CarouselComponent },
  // ]
  // },
  { path: 'dashboards', children:
    [
      { path: '', component: Dashboard1Component },
    ]
  },
  {path: 'orderhistory', component: OrderhistoryComponent},
  { path: 'outlets-details', children:
  [
    { path: 'outlets', component: OutletsDetailsComponent},
  ]
  },
  
  { path: 'checkout', children:
  [
    { path: 'checkout-details', component: CheckoutDetailsComponent},
  ]
  },

  { path: 'profiles', children:
    [
      { path: 'profile1', component: Profile1Component },
    ]
  },
  { path: 'tables', children:
    [
      { path: 'table1', component: BasicTableComponent },
    ]
  },
  { path: 'maps', children:
    [
      { path: '', component: Map1Component},
    ]
  },
  { path: 'checkout', children:
  [
    { path: 'payment-summary', component: PaymentSummaryComponent},
  ]
},

  { path: 'modals', component: ModalsComponent},
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OrderhistoryComponent,
    ForgetpasswordComponent,
    // DatepickerModule.forRoot(),
    // TimepickerModule.forRoot(),
    // DatetimePopupModule.forRoot()
    // BannerCarouselComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCEUpMCzyUSq20aQbmtH90UvrQZUvGyQkg'
    }),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NavigationModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    FormsModule,
    SharedModule,
    ViewsModule,
    ErrorModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule.setLocale('en'),
    NgxStripeModule.forRoot('pk_test_51Jq05JSFO2k4lj9j8r9TeyYlzrmh1aDD7XmZcVjFR8ZykCIyLSxdsT1DNBdMeQA1fNytJKbagcKYrfg1Wr5Kg64S00CqS8PQjO')
    
  ],
  entryComponents: [ LoginComponent,],
  
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
