import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServiceModule} from './services/_services.module';
import {GuardsModule} from './guards/_guards.module';

const CORE_PROVIDERS = [
  ...ServiceModule.forRoot().providers
];

@NgModule({
  imports: [
    CommonModule,
    GuardsModule
  ],
  declarations: [],
})

export class CoreModule {
  // Guard against importing core.Module into any module
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(` CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...CORE_PROVIDERS,
      ],
    };
  }
}



