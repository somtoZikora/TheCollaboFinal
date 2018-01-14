import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProfileService {

  // used for communication between ProfileComponent
  //and study-groupComponent
  private messageSource = new BehaviorSubject<string>('no message sent');
  currentMessage = this.messageSource.asObservable();


  // used for communication between InformationComponent
  //and study-groupComponent
  private userGroupsSource = new BehaviorSubject<any>('not userGroup Selected yet');
  currentuserGroups= this.userGroupsSource.asObservable();

  constructor() { }
// ############################################################################

// used for communication between ProfileComponent
//and study-groupComponent
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  // used for communication between InformationComponent
  //and study-groupComponent
  postUserGroup(userGroups: Array<any>){
  this.userGroupsSource.next(userGroups);
}

}
