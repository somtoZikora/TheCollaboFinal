/**
 * Created by opaluwa john on 12/16/2017.
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthGuard} from './auth.guard';

const SERVICES = [
  AuthGuard
]

@NgModule({
  imports: [
    CommonModule],
  providers: [...SERVICES]
})
export class GuardsModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: GuardsModule,
      providers: [
        ...SERVICES
      ]
    };
  }
}

