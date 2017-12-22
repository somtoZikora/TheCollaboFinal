import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {FlashMessagesModule} from 'angular2-flash-messages';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



import {FlashMessagesService} from 'angular2-flash-messages';



import { AppComponent } from './app.component';

import { AppRoutingModule } from './/app-routing.module';



  @NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    ThemeModule,
    FlashMessagesModule,
    BrowserAnimationsModule,
  ],
 providers: [FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
