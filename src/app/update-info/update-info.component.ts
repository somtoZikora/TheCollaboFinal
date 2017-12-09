import { Component, OnInit } from '@angular/core';
import {UpdateInfoService} from '../sign-up-service.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
  update = false;
  user = {
    firstname: '',
    lastname: '',
    language: '',
    courseofstudy: '',
    degree: ''
  };
  constructor(private _UpdateInfoService: UpdateInfoService) { }

  ngOnInit() {
  }
  onSubmit() {
    this._UpdateInfoService.updateInfo(this.user).subscribe(data => {
      this.update = data;
    });
  }
}
