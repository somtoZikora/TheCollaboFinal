/**
 * Created by opaluwa john on 12/18/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PagesComponent} from './pages.component';




import {AuthGuard} from './../@core/guards/auth.guard';


const routes: Routes = [
  { path: '',
    component: PagesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'profile', component: ProfileComponent},
    ]},
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule]
})
export class PagesRoutingModule {
}
