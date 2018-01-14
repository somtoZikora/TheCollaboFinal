/**
 * Created by opaluwa john on 12/18/2017.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AngularDraggableModule } from 'angular2-draggable';
import {DashboardHomeComponent} from './dashboard-home.component'
import {SendFriendInvitationComponent} from './send-friend-invitation/send-friend-invitation.component'

import {MatGridListModule,
        MatListModule,
        MatCardModule,
        MatDialogModule} from '@angular/material/';
import {ThemeModule} from './../../../@theme/theme.module';

        const MATERIAL = [MatGridListModule,
                MatListModule,
                MatCardModule,
                MatDialogModule,
                ]

@NgModule({
  declarations: [
    DashboardHomeComponent,
    SendFriendInvitationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AngularDraggableModule,
    MATERIAL,
    ThemeModule
  ],
  exports: [
    DashboardHomeComponent,
  ],
  providers: [],

})
export class DashboardHomeModule { }
