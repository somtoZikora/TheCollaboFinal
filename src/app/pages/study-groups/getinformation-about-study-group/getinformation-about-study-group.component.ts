import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
import {StudyGroupService} from './../../../@core/services/study-group/study-group.service'

@Component({
  selector: 'app-getinformation-about-study-group',
  templateUrl: './getinformation-about-study-group.component.html',
  styleUrls: ['./getinformation-about-study-group.component.css']
})
export class GetinformationAboutStudyGroupComponent {
    @Output() messageEvent = new EventEmitter<any>();
    @Input() listOfGroupMembers: any;
    showMessage: string

  // constructor
  constructor(private _StudyGroupService: StudyGroupService) {}

  sendFriendRequest(){
    const userInfo = {
      groupName: this.listOfGroupMembers.groupName
    }
    this._StudyGroupService.postFriendRequestToGroup(userInfo).subscribe(data => {
      if(data.success == false) return this.showMessage = data.message
      this.showMessage = data.message
    })
  }

  onCancelClick(choice) {
    if (choice === 'cancel') {
      this.messageEvent.emit('hideGetInformationAboutStudyGroupComponentFromGetInformationAboutStudyGroupComponent');
    }
  }
}
