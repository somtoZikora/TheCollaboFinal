import { Component, Output, EventEmitter , Input } from '@angular/core';
import {StudyGroupService} from '../../../@core/services/study-group/study-group.service';

@Component({
  selector: 'app-list-of-study-group',
  templateUrl: './listOfStudyGroupComponent.component.html',
  styleUrls: ['./listOfStudyGroupComponent.component.css']
})
export class ListOfStudyGroupComponent {

  @Output() messageEvent = new EventEmitter<any>();
  @Input() listOfStudyGroups: any;
  @Input() listOfStudyGroupError: any;


  constructor(private _StudyGroupService: StudyGroupService) {}

  onCancelClick(choice) {
    if (choice === 'cancel') {
      this.messageEvent.emit('hideListOfStudyGroupComponentFromListOfStudyGroupComponent');
    }
  }

  onSelectGroup(studyGroupName){
    this._StudyGroupService.postgetinformationAboutStudyGroup(studyGroupName).subscribe(data => {
      if(data.groupMembers.length > 0){
          // handle if there is data
   var studyGroupMembers = {
     emitterName: 'showgetInformationAboutStudyGroupComponentFromListOfStudyComponent',
     theStudyGroupMembers: [data]
   };
      return this.messageEvent.emit(studyGroupMembers);
    }else{
      // handle if there is no data
      var studyGroupMembers = {
        emitterName: 'showgetInformationAboutStudyGroupComponentFromListOfStudyComponentButNoData',
        theStudyGroupMembers: []
      };
      return this.messageEvent.emit(studyGroupMembers);
    }
  },error => {
    // handle if there is error occured while making post
    var studyGroupMembers = {
      emitterName: 'dontShowgetInformationAboutStudyGroupComponentFromListOfStudyComponent',
      theStudyGroupMembers: []
    };
     this.messageEvent.emit(studyGroupMembers);
  });

  }
  }
