import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
import {StudyGroupService} from './../../../@core/services/study-group/study-group.service'

@Component({
  selector: 'app-create-study-group',
  templateUrl: './create-study-group.component.html',
  styleUrls: ['./create-study-group.component.css']
})
export class createStudyGroupComponent {
  @Output() messageEvent = new EventEmitter<any>();
  groupname: String
  showMessage:String

  // constructor
  constructor(private _StudyGroupService: StudyGroupService) {}

  createGroup(){
    const groupInfo = {
      groupName: this.groupname
    }
    this._StudyGroupService.postCreateStudyGroup(groupInfo).subscribe(data => {
     if(data.success == false) return this.showMessage = data.message
      this.showMessage = data.message
    })
  }

  onCancelClick(choice) {
    if (choice === 'cancel') {
      this.messageEvent.emit('hideCreateStudyGroupComponentFromCreateStudyGroupComponent');
    }
  }

}
