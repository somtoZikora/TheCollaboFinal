import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {ContactUsService} from './_services/contact-us.service';
import {AuthenticationService} from './_services/authentication.service';
import {ValidateService} from './_services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthGuard} from './_guards/auth.guard';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './/app-routing.module';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { CreateGroupModule } from './create-group/create-group.module';
import {LocalStorageModule} from 'angular-2-local-storage';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { SigninComponent } from './signin/signin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    DashboardComponent,
    SignupComponent,
    SigninComponent,
    NavbarComponent,
    FooterComponent,
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
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    FlashMessagesModule
  ],
  providers: [ContactUsService, AuthenticationService,
    ValidateService, FlashMessagesService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
