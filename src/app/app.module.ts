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
      { path: 'map1', component: Map1Component},
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
    // BannerCarouselComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: ''
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
    
  ],
  entryComponents: [ LoginComponent],
  
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
