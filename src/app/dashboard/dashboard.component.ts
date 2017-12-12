import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  update = false;
  user = {
    firstname: '',
    lastname: '',
    language: '',
    courseofstudy: '',
    degree: ''
  };
  constructor(private _AuhtenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  onSubmit() {
    this._AuhtenticationService.updateInfo(this.user).subscribe(data => {
      this.update = data;
      console.log(data);
    });
  }
}
