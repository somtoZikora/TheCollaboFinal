import { Component, OnInit } from '@angular/core';
import {SignUpServiceService} from '../sign-up-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup = false
  user = {
    username: '',
    password: '',
    email: ''
  }

  constructor(private _SignUpService: SignUpServiceService) { }

  ngOnInit() {
  }

  onSubmit() {
  this._SignUpService.signup(this.user).subscribe(data =>{
    this.signup = data.signup;
  });
  }
}
