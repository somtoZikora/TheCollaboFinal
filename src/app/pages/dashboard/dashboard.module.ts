/**
 * Created by opaluwa john on 12/18/2017.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AngularDraggableModule } from 'angular2-draggable';

import {DashBoardRoutingModule} from './dashboard-routing.module'

import {UpdateProfileInformationComponent} from './update-profile-information/update-profile-information.component'
import {DashboardComponent} from './dashboard.component'

@NgModule({
  declarations: [
    UpdateProfileInformationComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashBoardRoutingModule,
    HttpClientModule,
    AngularDraggableModule
  ],
  exports: [],
  providers: [],

})
export class DashboardModule { }
