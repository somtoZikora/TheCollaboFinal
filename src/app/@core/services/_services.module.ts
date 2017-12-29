/**
 * Created by opaluwa john on 12/16/2017.
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {ContactUsService} from './contact-us/contact-us.service';
import {AuthenticationService} from './authentication/authentication.service';
import {ValidateService} from './validate/validate.service';
import {StudyGroupService} from './study-group/study-group.service';
import {ProfileService} from './profile/profile.service';
import {SocketGroupService} from './socket/socket.service';

const SERVICES = [
  ContactUsService,
  AuthenticationService,
  ValidateService,
  StudyGroupService,
  ProfileService,
  SocketGroupService
]

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [...SERVICES]
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServiceModule,
      providers: [
        ...SERVICES
      ]
    };
  }
}

