/**
 * Created by opaluwa john on 12/18/2017.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';


import {PagesComponent} from './pages.component';
import {StudygroupsComponent} from './study-groups/study-groups.component';


import {AuthGuard} from './../@core/guards/auth.guard';


const routes: Routes = [
  { path: '', 
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'study-groups' },
      { path: 'study-groups', component: StudygroupsComponent},
      { path: 'contact', component: ContactComponent },
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }
    ]},
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule]
})
export class PagesRoutingModule {
}
