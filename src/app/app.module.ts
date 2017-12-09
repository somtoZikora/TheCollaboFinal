import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {ContactUsService} from './contact-us.service';
import {SignUpServiceService} from './sign-up-service.service';
import {UpdateInfoService} from './sign-up-service.service';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './/app-routing.module';
import { ContactComponent } from './contact/contact.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { SignupComponent } from './signup/signup.component';
import { CreateGroupModule } from './create-group/create-group.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    UpdateInfoComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CreateGroupModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ContactUsService, SignUpServiceService, UpdateInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
