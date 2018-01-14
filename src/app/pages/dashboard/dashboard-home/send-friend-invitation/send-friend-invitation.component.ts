import { Component, OnInit } from '@angular/core';
import {StudyGroupService} from './../../../../@core/services/study-group/study-group.service'


@Component({
  selector: 'app-send-friend-invitation',
  templateUrl: './send-friend-invitation.component.html',
  styleUrls: ['./send-friend-invitation.component.css']
})
export class SendFriendInvitationComponent implements OnInit {
  friendsEmail: string
  showMessage : string

  constructor(private _StudyGroupService: StudyGroupService) {}

  ngOnInit() {}

  onSendFriendInvitation(){
   const friendsDetails = {
      groupName: localStorage.getItem("groupName"),
      friendsEmail: this.friendsEmail
    }
    this._StudyGroupService.postSendFriendInvitation(friendsDetails).subscribe(data => {
      if (data.success == true) {
        this.friendsEmail = ""
        this.showMessage = 'friend Invitation Sent'
      }else{
      this.showMessage = 'error occured while trying to send invitation'
    }
    })
  }

}
