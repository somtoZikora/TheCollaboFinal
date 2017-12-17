import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NbThemeModule} from '@nebular/theme';

import { CoreModule } from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';


import {FlashMessagesService} from 'angular2-flash-messages';



import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateGroupModule } from './create-group/create-group.module';
import {FlashMessagesModule} from 'angular2-flash-messages';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    DashboardComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CreateGroupModule,
    AppRoutingModule,
    HttpClientModule,
    FlashMessagesModule,
    NbThemeModule.forRoot({name: 'Default'}),
    CoreModule.forRoot(),
    ThemeModule
  ],
  providers: [FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
