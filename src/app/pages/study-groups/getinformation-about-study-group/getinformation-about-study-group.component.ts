import { Component, OnInit, Input } from '@angular/core';
import {StudyGroupService} from './../../../@core/services/study-group/study-group.service'

@Component({
  selector: 'app-getinformation-about-study-group',
  templateUrl: './getinformation-about-study-group.component.html',
  styleUrls: ['./getinformation-about-study-group.component.css']
})
export class GetinformationAboutStudyGroupComponent {
  groupMembers: string
    @Input() listOfGroupMembers: any;

  // constructor
  constructor(private _StudyGroupService: StudyGroupService) {
}

}
