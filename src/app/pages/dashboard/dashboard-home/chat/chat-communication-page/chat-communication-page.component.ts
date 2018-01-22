import { Component, OnInit, Input } from '@angular/core';
import {StudyGroupService} from './../../../../../@core/services/study-group/study-group.service';


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

 // logic variables
 showChatCommunicationComponent: boolean

  ngOnInit() {

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
    }

    this._StudyGroupService.postPostGroupMessages(group).subscribe(data => {
      if(data.messages.length > 0){
          // handle if there is data
            this.groupMessages = data.messages
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
