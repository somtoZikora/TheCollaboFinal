import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../@core/services/authentication/authentication.service';
import {ValidateService} from '../../../../@core/services/validate/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // variables for material form proper functioning
  hide = true;
  email1 = new FormControl('', [Validators.required, Validators.email]);

  // other variables
  signup = false;
  isAllFieldsFilled = true;
  isEmailValid = true
    username: String;
    password: String;
    email: String

  constructor(private _AuthenticationService: AuthenticationService,
              private  _validateService: ValidateService,
              private _flashMessagesService: FlashMessagesService,
              private  _router: Router) { }

  ngOnInit() {
  }

  // function for material form proper functioning
  getErrorMessage() {
    return this.email1.hasError('required') ? 'You must enter a value' :
      this.email1.hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmit() {
      const user = {
        username: this.username,
        password: this.password,
        email: this.email
      };

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
