/**
 * Created by opaluwa john on 12/18/2017.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {ThemeModule} from './../../@theme/theme.module';
import { AngularDraggableModule } from 'angular2-draggable';

import {ShowSelectComponent} from './showSelect/showSelect.component';
import {DecisionComponent} from './decision/decision.component';
import {ListOfStudyGroupComponent} from './listOfStudyGroupComponent/listOfStudyGroupComponent.component';
import { ProfileComponent } from '../profile/profile.component';
import { createStudyGroupComponent } from './create-study-group/create-study-group.component';

import {StudygroupsComponent} from './study-groups.component';
import {MatGridListModule,
        MatListModule,
        MatCardModule,
        MatDialogModule} from '@angular/material/';
import { GetinformationAboutStudyGroupComponent } from './getinformation-about-study-group/getinformation-about-study-group.component';

@NgModule({
  declarations: [
    StudygroupsComponent,
    ShowSelectComponent,
    DecisionComponent,
    ListOfStudyGroupComponent,
    ProfileComponent,
    createStudyGroupComponent,
    GetinformationAboutStudyGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ThemeModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    AngularDraggableModule
  ],
  exports: [StudygroupsComponent],
  providers: [],

})
export class StudygroupModule { }
