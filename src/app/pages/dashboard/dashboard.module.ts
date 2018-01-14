/**
 * Created by opaluwa john on 12/18/2017.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';



import { AngularDraggableModule } from 'angular2-draggable';

import {DashBoardRoutingModule} from './dashboard-routing.module'

import {DashboardComponent} from './dashboard.component'
import {DashboardHomeModule} from './dashboard-home/dashboard-home.module'
import {UpdateProfileInformationComponent} from './components'

const COMPONENTS = [UpdateProfileInformationComponent]



@NgModule({
  declarations: [
    DashboardComponent,
    COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashBoardRoutingModule,
    HttpClientModule,
    AngularDraggableModule,
    DashboardHomeModule,
  ],
  exports: [],
  providers: []
})
export class DashboardModule { }
