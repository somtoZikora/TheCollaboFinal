/**
 * Created by opaluwa john on 12/18/2017.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {ThemeModule} from './../@theme/theme.module';



import {PagesComponent} from './pages.component';




import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PagesRoutingModule } from './pages-routing.module';




@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    DashboardComponent,
    ProfileComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    HttpClientModule,
    ThemeModule,
  ],
  providers: [],

})
export class PagesModule { }

