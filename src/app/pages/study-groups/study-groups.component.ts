import { Component, OnInit } from '@angular/core';
import {StudyGroupService} from '../../@core/services/study-group/study-group.service';
import {ProfileService} from '../../@core/services/profile/profile.service';


@Component({
  selector: 'app-study-groups',
  templateUrl: './study-groups.component.html',
  styleUrls: ['./study-groups.component.css']
})
export class StudygroupsComponent implements OnInit  {

  // data variables
  listOfStudyGroups: Array<any> = []
  listOfStudyGroupError: string

  // logic variables
  showShowSelectComponent = true;
  showDecisionCOmponent = false;
  showListOfStudyGroupComponent = false;

  // nav Variables
  showProfileComponent = false;

  // constructor
  constructor(private _StudyGroupService: StudyGroupService,
              private _ProfileService: ProfileService) {}

  // oninit hook
  ngOnInit() {

    // handle serveice for listOfStudyGroupComponet
    this._StudyGroupService.getListOfStudyGroups().subscribe(data => {
      this.listOfStudyGroups = data;
    }, listOfStudyGroupError => {
      this.listOfStudyGroupError = listOfStudyGroupError;
    });

    // handle service for Profile Component
    this._ProfileService.currentMessage.subscribe(
      message => {
        if (message === 'showProfileComponentFromNavbar') {
          this.showProfileComponent = true;
        }
        if (message === 'hideProfileComponentFromNavbar') {
          this.showProfileComponent = false;
        }
      });

  }

  // fuctions
  executeOnReceiveEMittedMessageFromChild($event) {
    if ($event === 'hideDecisionComponentFromDecisionComponent') {
      this.showDecisionCOmponent = false;
      this.showShowSelectComponent = true;
    }
    if ($event === 'hideListOfStudyGroupComponentFromListOfStudyGroupComponent') {
      this.showListOfStudyGroupComponent = false;
    }
    if ($event === 'showListOfStudyGroupComponentFromDecisionComponent' ) {
      this.showListOfStudyGroupComponent = true;
    }
  }
  selectStudyGroup(choice) {
    if (choice === 'hideShowSelectComponent') {
      this.showDecisionCOmponent = true;
      this.showShowSelectComponent = false;
    }
  }

}

