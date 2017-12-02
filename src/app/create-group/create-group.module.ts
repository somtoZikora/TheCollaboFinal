import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupRoutingModule } from './/create-group-routing.module';
import { CreateGroupComponent } from './create-group.component';
import { CreateExamGroupComponent } from './create-exam-group/create-exam-group.component';
import { CreateAssignmentGroupComponent } from './create-assignment-group/create-assignment-group.component';
import { CreateGroupHomeComponent } from './create-group-home/create-group-home.component';

@NgModule({
  imports: [
    CommonModule,
    CreateGroupRoutingModule
  ],
  declarations: [
    CreateGroupComponent,
    CreateExamGroupComponent,
    CreateAssignmentGroupComponent,
    CreateGroupHomeComponent]
})
export class CreateGroupModule { }
