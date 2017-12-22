import { Component, OnInit, Output, EventEmitter   } from '@angular/core';
import {StudyGroupService} from '../../../@core/services/study-group/study-group.service';

@Component({
  selector: 'app-list-of-study-group',
  templateUrl: './listOfStudyGroupComponent.component.html',
  styleUrls: ['./listOfStudyGroupComponent.component.css']
})
export class ListOfStudyGroupComponent implements OnInit {

  listOfStudyGroups: Array<any> = []
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private _StudyGroupService: StudyGroupService) {}

  ngOnInit() {
  this._StudyGroupService.getListOfStudyGroups().subscribe(data => {
    this.listOfStudyGroups = data;
    console.log(this.listOfStudyGroups);
  });
  }

  onCancelClick(choice) {
    if(choice === 'cancel') {
      this.messageEvent.emit('hideListOfStudyGroupComponentFromListOfStudyGroupComponent');
    }
  }
}

