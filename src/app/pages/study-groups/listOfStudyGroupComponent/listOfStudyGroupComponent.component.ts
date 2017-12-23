import { Component, OnInit, Output, EventEmitter , Input   } from '@angular/core';
import {StudyGroupService} from '../../../@core/services/study-group/study-group.service';

@Component({
  selector: 'app-list-of-study-group',
  templateUrl: './listOfStudyGroupComponent.component.html',
  styleUrls: ['./listOfStudyGroupComponent.component.css']
})
export class ListOfStudyGroupComponent {

  @Output() messageEvent = new EventEmitter<string>();
  @Input() listOfStudyGroups: any;
  @Input() listOfStudyGroupError: any;

  constructor(private _StudyGroupService: StudyGroupService) {}

  onCancelClick(choice) {
    if (choice === 'cancel') {
      this.messageEvent.emit('hideListOfStudyGroupComponentFromListOfStudyGroupComponent');
    }
  }
}

