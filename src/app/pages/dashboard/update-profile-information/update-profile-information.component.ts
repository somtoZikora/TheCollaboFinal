import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../@core/services/authentication/authentication.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-profile-information',
  templateUrl: './update-profile-information.component.html',
  styleUrls: ['./update-profile-information.component.css']
})
export class UpdateProfileInformationComponent implements OnInit {
  FLashMesage = false;
  firstname: string;
  lastname: string;
  language: string;
  courseofstudy: string;
  degree: string;

  constructor(private _AuhtenticationService: AuthenticationService,
              private _FlashMessageService: FlashMessagesService,
              private _Router: Router,) { }

  ngOnInit() {
  }
  onSubmit() {
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      language: this.language,
      courseofstudy: this.courseofstudy,
      degree: this.degree,
    };

    this._AuhtenticationService.updateInfo(user).subscribe(data => {
      if(data.success = true){
      this._FlashMessageService.show(data.message, {cssClass: 'alert-success', timeout: 5000});
      this._Router.navigate(['/study-groups']);
      }
    });
  }
}
