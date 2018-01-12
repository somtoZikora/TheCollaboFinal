import { Component, } from '@angular/core';
import {AuthenticationService} from './../../../../@core/services/authentication/authentication.service';
import {Router} from '@angular/router';
import {ProfileService} from './../../../../@core/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {
  constructor(private _AuthenticationService: AuthenticationService,
              private _Router: Router,
              private _ProfileService: ProfileService) {}
  logOut() {
    this._AuthenticationService.logout();
    this._Router.navigate(['/login']);
  }
  onCancelClick() {
    this._ProfileService.changeMessage('hideProfileComponentFromNavbar');
  }
updateProfile(){
  this._Router.navigate(['/dashboard/update-profile-information']);
}
}
