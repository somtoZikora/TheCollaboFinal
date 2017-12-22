import { Component } from '@angular/core';


@Component({
  selector: 'app-study-groups',
  templateUrl: './study-groups.component.html',
  styleUrls: ['./study-groups.component.css']
})
export class StudygroupsComponent  {
  showShowSelectComponent = true;
  showDecisionCOmponent = false;
  showListOfStudyGroupComponent = false;

  executeOnReceiveEMittedMessageFromChild($event) {
    if ($event === 'hideDecisionComponentFromDecisionComponent') {
      this.showDecisionCOmponent = false;
      this.showShowSelectComponent = true;
    }
    if ($event === 'hideListOfStudyGroupComponentFromListOfStudyGroupComponent') {
      this.showListOfStudyGroupComponent = false;
    }
    if ($event === 'showListOfStudyGroupComponentFromDecisionComponent') {
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

