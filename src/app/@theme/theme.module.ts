/**
 * Created by opaluwa john on 12/17/2017.
 */
import {NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  FooterComponent,
  NavbarComponent,
} from './components';

const BASE_MODULES = [
  CommonModule,
  RouterModule];

const COMPONENTS = [
  FooterComponent,
  NavbarComponent
];

@NgModule({
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES, ...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class ThemeModule {
}

