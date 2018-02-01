/**
 * Created by opaluwa john on 12/18/2017.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {ChatComponent} from './chat.component'
import {ChatHomePageComponent} from './chat-home-page/chat-home-page.component'
import {ChatCommunicationPageComponent} from './chat-communication-page/chat-communication-page.component'

import {MatGridListModule,
        MatListModule,
        MatCardModule,
        MatDialogModule} from '@angular/material/';
import {ThemeModule} from './../../../../@theme/theme.module';

const MATERIAL = [MatGridListModule,
        MatListModule,
        MatCardModule,
        MatDialogModule,
        ]

@NgModule({
  declarations: [
    ChatComponent,
    ChatHomePageComponent,
    ChatCommunicationPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MATERIAL,
    ThemeModule
  ],
  exports: [ChatComponent],
  providers: [],

})
export class ChatModule { }
