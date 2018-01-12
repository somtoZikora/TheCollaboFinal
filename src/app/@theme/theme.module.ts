/**
 * Created by opaluwa john on 12/17/2017.
 */
import {NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatGridListModule} from '@angular/material';




import {
  FooterComponent,
  NavbarComponent,
  SigninComponent,
  SignupComponent,
  ProfileComponent
} from './components';

const BASE_MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatGridListModule
 ];

const COMPONENTS = [
  FooterComponent,
  NavbarComponent,
  SigninComponent,
  SignupComponent,
  ProfileComponent
];

@NgModule({
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES, ...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class ThemeModule {
}
