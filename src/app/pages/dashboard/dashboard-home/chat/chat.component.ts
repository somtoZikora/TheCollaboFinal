import { Component, OnInit} from '@angular/core';
import {StudyGroupService} from './../../../../@core/services/study-group/study-group.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit  {

  //logic variables
  showChatHomeComponent = false
  showChatCommunicationComponent = false

  //data variables
  listOfGroupMembers: Array<any> = []
  usersForChatCommunicationPageComponent: String

    constructor(private _StudyGroupService: StudyGroupService) {}

  ngOnInit() {

    var group ={
      groupName: localStorage.getItem("groupName")
    }

    this._StudyGroupService.postgetinformationAboutStudyGroup(group).subscribe(data => {
      if(data.groupMembers.length > 0){
          // handle if there is data
            this.listOfGroupMembers = data.groupMembers
          this.showChatHomeComponent = true
          //console.log(this.listOfGroupMembers)

    }else{
      // handle if there is no data
    this.showChatHomeComponent = false
    }
  },error => {
    // handle if there is error occured while making post
  this.showChatHomeComponent = true
  });

  }

  // Functions responsible for showing and hiding component
  executeOnReceiveEMittedMessageFromChatHomePageComponent($event){
  if ($event.message === 'hideChatHomePageComponentFromChatHomePageComponent') {
      this.usersForChatCommunicationPageComponent = $event.user
      this.showChatHomeComponent = false;
      this.showChatCommunicationComponent = true;
    }
}

}
