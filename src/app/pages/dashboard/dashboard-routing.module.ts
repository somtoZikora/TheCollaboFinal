/**
 * Created by opaluwa john on 12/18/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateProfileInformationComponent } from './components/';

import {AuthGuard} from '../../@core/guards/auth.guard';

import {DashboardComponent} from './dashboard.component'
import {DashboardHomeComponent} from './dashboard-home/dashboard-home.component'


const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard-home' },
      {path:'dashboard-home', component:DashboardHomeComponent},
      { path: 'update-profile-information', component: UpdateProfileInformationComponent},
    ]},
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule]
})
export class DashBoardRoutingModule {
}
