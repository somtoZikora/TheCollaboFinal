import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../@core/services/profile/profile.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  showProfileComponent = false;

  constructor(private _ProfileService: ProfileService) {}

  ngOnInit() {
    this._ProfileService.currentMessage.subscribe(
      message => {
        if (message === 'showProfileComponentFromNavbar') {
          this.showProfileComponent = true;
        }
        if (message === 'hideProfileComponentFromNavbar') {
          this.showProfileComponent = false;
        }
      });
  }
}
