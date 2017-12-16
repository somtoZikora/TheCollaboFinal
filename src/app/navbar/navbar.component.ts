import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../@core/services/authentication.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _AuthenticationService: AuthenticationService,
              private _Router: Router,
              private _FlashMessageService: FlashMessagesService) { }

  ngOnInit() {
  }

  onLogOutClick(): any {
    this._AuthenticationService.logout();
    this._FlashMessageService.show('You are logged out', {
      cssClass: 'alert-success',
        timeout: 5000
    });
    this._Router.navigate(['/login']);
    return false;
  }
}
