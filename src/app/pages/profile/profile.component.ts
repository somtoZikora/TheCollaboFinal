import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../@core/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: object;
  constructor(private _AuthenticationService: AuthenticationService,
              private _Router: Router) { }

  ngOnInit() {
    this._AuthenticationService.getProfile().subscribe(profile => {
      console.log(profile.user)
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
