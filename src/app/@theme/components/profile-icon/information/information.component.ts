import { Component, OnInit  } from '@angular/core';
import {AuthenticationService} from './../../../../@core/services/authentication/authentication.service';
import {Router} from '@angular/router';
import {ProfileService} from './../../../../@core/services/profile/profile.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent  implements OnInit {
  userGroups: Array<any>

  constructor(private _Router: Router,
              private _ProfileService: ProfileService) {}

ngOnInit() {
this._ProfileService.currentuserGroups.subscribe(userGroups =>{
  this.userGroups = userGroups
})
}

  onCancelClick() {
    this._ProfileService.changeMessage('hideInformationComponentFromNavbar');
  }
updateSelectGroup(userGroup){
  this._Router.navigate(['/dashboard/dashboard-home']);
  localStorage.setItem('groupName', userGroup);
}
}
