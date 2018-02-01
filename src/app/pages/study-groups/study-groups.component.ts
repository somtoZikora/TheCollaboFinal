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

  // data variabless ***************************************************************************
  // used in showListOfStudyGroupComponent
  listOfStudyGroups: Array<any> = []
  listOfStudyGroupError: string

  // used in showGetInformationAboutGroupComponent
  listOfGroupMembers: Array<any> = []

  // used in showInformationComponent
  usersGroups: Array<any> = []
  usersGroupsError: string
  //***********************************************************************************************


  // logic variables ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  showShowSelectComponent = true;
  showDecisionCOmponent = false;
  showListOfStudyGroupComponent = false;
  showGetInformationAboutGroupComponent = false
  showCreateStudyCOmponent = false
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


  // nav Variables ***************************************************************************
  showProfileComponent = false;
  showInformationComponent = false;
//***********************************************************************************************

  // constructor
  constructor(private _StudyGroupService: StudyGroupService,
              private _ProfileService: ProfileService,
            //  private _SocketGroupService: SocketGroupService
   ) {}

  // oninit hook
  ngOnInit() {
// #############################################################
    /*this._SocketGroupService.on('mesage-received', (msg: any) => {
      this.messages.push(msg);
    } )*/

    // ###########################################################

    //handle servive for InformationComponent
    this._StudyGroupService.getUsersGroups().subscribe(data =>{
    this.usersGroups = data
    this._ProfileService.postUserGroup(this.usersGroups);
  }, usersGroupsError => {
    this.usersGroupsError = usersGroupsError;
  })

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
        if (message === 'showInformationComponentFromNavbar') {
          this.showInformationComponent = true;
        }
        if (message === 'hideInformationComponentFromNavbar') {
          this.showInformationComponent = false;
        }
      });

  }

  // ##################################################################

  sedMessage() {
    const message = {
      text: this.messageText
    };
    /*this._SocketGroupService.emit('send-message', message);
    this.messageText = '';*/
  }
  // ######################################################################


  // fuctions
  executeOnReceiveEMittedMessageFromDecisionComponent($event) {
    if ($event === 'hideDecisionComponentFromDecisionComponent') {
      this.showDecisionCOmponent = false;
      this.showShowSelectComponent = true;
    }
    if ($event === 'showListOfStudyGroupComponentFromDecisionComponent' ) {
      this.showListOfStudyGroupComponent = true;
    }
    if ($event === 'showCreateGroupComponentFromDecisionComponent' ) {
      this.showCreateStudyCOmponent = true;
    }

  }

  executeOnReceiveEMittedMessageFromListOfStudyComponent($event) {
    if ($event === 'hideListOfStudyGroupComponentFromListOfStudyGroupComponent') {
      this.showListOfStudyGroupComponent = false;
    }

    if ($event.emitterName === 'dontShowgetInformationAboutStudyGroupComponentFromListOfStudyComponent' ) {
      this.showGetInformationAboutGroupComponent = false;
      this.listOfGroupMembers = $event.theStudyGroupMembers
    }
    if ($event.emitterName === 'showgetInformationAboutStudyGroupComponentFromListOfStudyComponent' ) {
      this.showGetInformationAboutGroupComponent = true;
      this.listOfGroupMembers = $event.theStudyGroupMembers[0]
    }
    if ($event.emitterName === 'showgetInformationAboutStudyGroupComponentFromListOfStudyComponentButNoData' ) {
      this.showGetInformationAboutGroupComponent = true;
      this.listOfGroupMembers = $event.theStudyGroupMembers
    }

  }

  executeOnReceiveEMittedMessageFromGetInformationAboutStudyGroupComponent($event) {
    if ($event === 'hideGetInformationAboutStudyGroupComponentFromGetInformationAboutStudyGroupComponent') {
      this.showGetInformationAboutGroupComponent = false;
    }
  }

  executeOnReceiveEMittedMessageFromCreateSTudyGroup($event) {
    if ($event === 'hideCreateStudyGroupComponentFromCreateStudyGroupComponent') {
      this.showCreateStudyCOmponent = false;
    }
  }

  selectStudyGroup(choice) {
    if (choice === 'hideShowSelectComponent') {
      this.showDecisionCOmponent = true;
      this.showShowSelectComponent = false;
    }
  }

}
