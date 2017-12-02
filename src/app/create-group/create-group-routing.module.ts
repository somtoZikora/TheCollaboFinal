import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGroupComponent } from './create-group.component';
import { CreateExamGroupComponent } from './create-exam-group/create-exam-group.component';
import { CreateAssignmentGroupComponent } from './create-assignment-group/create-assignment-group.component';
import { CreateGroupHomeComponent } from './create-group-home/create-group-home.component';

const routes: Routes = [
  { path: 'create-group',
    component: CreateGroupComponent,
    children:[
          {path: '', component: CreateGroupHomeComponent},
          {path: 'create-exam-group', component: CreateExamGroupComponent},
          {path: 'create-exam-group', component: CreateAssignmentGroupComponent}

    ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class CreateGroupRoutingModule { }
