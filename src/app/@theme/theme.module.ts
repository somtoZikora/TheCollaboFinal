/**
 * Created by opaluwa john on 12/17/2017.
 */
import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import {
  FooterComponent,
  NavbarComponent,
  SigninComponent,
  SignupComponent,
} from './components';

const BASE_MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  HttpClientModule,
 ];

const COMPONENTS = [
  FooterComponent,
  NavbarComponent,
  SigninComponent,
  SignupComponent
];

@NgModule({
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES, ...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class ThemeModule {
}

