import { Component, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent {
  isCancelClicked = false;

  @Output() messageEvent = new EventEmitter<string>();

  onCancelClick(cancel) {
    this.isCancelClicked = true;
    if (cancel === 'cancel')
      this.messageEvent.emit('hideDecisionComponentFromDecisionComponent');
  }

  onSelectDecision(choice) {
   if (choice === 'showListOfStudyGroupComponent') {
     this.messageEvent.emit('showListOfStudyGroupComponentFromDecisionComponent');
   }
   if (choice === 'showCreateGroupComponent') {
     this.messageEvent.emit('showCreateGroupComponentFromDecisionComponent');
  }
  }
}
