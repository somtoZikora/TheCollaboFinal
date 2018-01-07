import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './@core/guards/auth.guard';




import {SigninComponent} from './@theme/components/';
import { SignupComponent } from './@theme/components/';


const routes: Routes = [
  { path: '', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SigninComponent },
  { path: '**', redirectTo: ''},
  ]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule],
})
export class AppRoutingModule {
}
