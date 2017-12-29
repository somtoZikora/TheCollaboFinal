import { Component, OnInit } from '@angular/core';
import {StudyGroupService} from '../../@core/services/study-group/study-group.service';
import {ProfileService} from '../../@core/services/profile/profile.service';
import {SocketGroupService} from '../../@core/services/socket/socket.service';
@Component({
  selector: 'app-study-groups',
  templateUrl: './study-groups.component.html',
  styleUrls: ['./study-groups.component.css']
})
export class StudygroupsComponent implements OnInit  {

  // ###################################################
  // message variable for chat
  messages: Array<any>
  messageText: string;
  // ###################################################

  // data variabless
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
              private _ProfileService: ProfileService,
              private _SocketGroupService: SocketGroupService
   ) {}

  // oninit hook
  ngOnInit() {
// #############################################################
    this._SocketGroupService.on('mesage-received', (msg: any) => {
      this.messages.push(msg);
      console.log(msg);
      console.log(this.messages);
    } )

    // ###########################################################

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

  // ##################################################################

  sedMessage() {
    const message = {
      text: this.messageText
    };
    this._SocketGroupService.emit('send-message', message);
    this.messageText = '';
  }
  // ######################################################################


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

