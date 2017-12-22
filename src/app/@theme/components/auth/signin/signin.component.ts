import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../@core/services/authentication/authentication.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide = true;
  username: string;
  password: string;
  constructor(private _AuthenticationService: AuthenticationService,
              private _Router: Router,
              private _FlashMessageService: FlashMessagesService) {}

  ngOnInit() {
  }

  onSubmit() {
    const User = {
      username: this.username,
      password: this.password
    }
    this._AuthenticationService.loginAuthenticateUser(User).subscribe(data => {
      if (data.success) {
        this._AuthenticationService.storeUserData(data.token, data.user);
        this._FlashMessageService.show('You are now logged In', {cssClass: 'alert-success', timeout: 5000});
        this._Router.navigate(['/']);
      } else {
        this._FlashMessageService.show(data.message, {cssClass: 'alert-danger', timeout: 5000});
        this._Router.navigate(['/login']);
      }
    });
  }

}
