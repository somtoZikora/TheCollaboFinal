import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {ValidateService} from '../_services/validate.service';
import {LocalStorageService} from 'angular-2-local-storage';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup = false;
  isAllFieldsFilled = true;
  isEmailValid = true
    username: String;
    password: String;
    email: String

  constructor(private _AuthenticationService: AuthenticationService,
              private _localstorageService: LocalStorageService,
              private  _validateService: ValidateService,
              private _flashMessagesService: FlashMessagesService,
              private  _router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
      const user = {
        username: this.username,
        password: this.password,
        email: this.email
      }
    if (!this._validateService.validateSignup(user)) {
      this._flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 5000});
      return false;
  }
  if (!this._validateService.validateEmail(user.email)) {
    this._flashMessagesService.show('Please fill a valid email', {cssClass: 'alert-danger', timeout: 5000});
      return false;
  }
    this._AuthenticationService.signup(user).subscribe(data => {
      // this.signup = data.signup
      console.log(data.sucess)
      if (data.sucess) {
      this._flashMessagesService.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 5000});
      this._router.navigate(['/login']);
      // this._localstorageService.
      }else {
        this._flashMessagesService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});
        this._router.navigate(['/signup']);
      }
    });
  }
}
