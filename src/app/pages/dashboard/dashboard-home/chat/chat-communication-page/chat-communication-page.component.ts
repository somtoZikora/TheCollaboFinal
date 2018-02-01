import { Component, OnInit, Input } from '@angular/core';
import {StudyGroupService} from './../../../../../@core/services/study-group/study-group.service';
import {SocketGroupService} from './../../../../../@core/services/socket/socket.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat-communication-page',
  templateUrl: './chat-communication-page.component.html',
  styleUrls: ['./chat-communication-page.component.css']
})
export class ChatCommunicationPageComponent implements OnInit  {
  @Input() usersForChatCommunicationPageComponent: any

  constructor(private _StudyGroupService: StudyGroupService) {}

 typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasinssssssssssssssssssssssssssssssssssssssssss', 'Sneakers'];
 groupMessages: Array<any> = []
 message: String
 sender: String
groupName: String

//socket.io variable
 socket: any;
 websocketToken: any
 authToken: any
 rommNamspace: any

 // logic variables
 showChatCommunicationComponent: boolean

  ngOnInit() {

    // #####################subscribe to websocket########################################
  /*  this.socket = io.connect('http://localhost:3000/', {
    query: "token="+ 'jjjjdhd'
      });


      this.socket.on('connect', () =>{
        this.websocketToken = localStorage.getItem("websocketToken");
        this.authToken = localStorage.getItem("id_token");
        if(this.websocketToken){
       this.socket.emit('authenticate',
       {websocketToken: this.websocketToken
          authToken: this.authToken});
      }else{
        this.socket.emit('authenticate', {websocketToken: false});
      }
        });


                this.socket.on('saveWebSocketToken', (websocketToken: any) => {
                  localStorage.setItem('websocketToken', websocketToken);
                } )


        this.socket.on('mesage-received', (msg: any) => {
          this.groupMessages.push(msg);
        } )*/

      this.socket = io('http://localhost:3000/');


        this.socket.on('connect', () =>{
        this.authToken = localStorage.getItem("id_token");
         this.socket.emit('authenticate',{token:this.authToken, groupRandomNumber:localStorage.getItem("groupRandomNumber")})
        });

        this.socket.on('message-received', (msg: any) => {
          this.groupMessages.push(msg);
        });
        // ###########################################################

    this.sender = JSON.parse(localStorage.getItem("User")).username;

    this.groupName = localStorage.getItem("groupName")

    var group ={
      groupName: this.groupName
    }

    this._StudyGroupService.postgetGroupMessages(group).subscribe(data => {
      if(data.messages.length > 0){
          // handle if there is data
            this.groupMessages = data.messages
          this.showChatCommunicationComponent = true
          //console.log(this.listOfGroupMembers)

    }else{
      // handle if there is no data
    this.showChatCommunicationComponent = false
    }
  },error => {
    // handle if there is error occured while making post
  this.showChatCommunicationComponent = true
  });

  }

  //send message

  onSendMessage(){

    var group ={
      groupName: this.groupName,
      message: this.message,
      sender: JSON.parse(localStorage.getItem("User")).username
      groupRandomNumber: localStorage.getItem("groupRandomNumber")
    }
    // #######################handles websocket###########################################
       this.socket.emit('send-message', group);
    // ######################################################################

    this._StudyGroupService.postPostGroupMessages(group).subscribe(data => {
      if(data.messages.length > 0){
          // handle if there is data
        //  this.groupMessages = data.messages
          this.showChatCommunicationComponent = true
          this.message= "";

    }else{
      // handle if there is no data
    this.showChatCommunicationComponent = false
    }
  },error => {
    // handle if there is error occured while making post
  this.showChatCommunicationComponent = true
  });

  }


}
