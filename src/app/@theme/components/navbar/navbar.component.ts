import { Component} from '@angular/core';
import {ProfileService} from '../../../@core/services/profile/profile.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private _ProfileService: ProfileService) { }
  onClickProfileIcon(choice) {
    if (choice === 'Profile')
    this._ProfileService.changeMessage('showProfileComponentFromNavbar');
  }
}
