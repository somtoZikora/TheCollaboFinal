import { Component, OnInit } from '@angular/core';
import {StudyGroupService} from './../../../@core/services/study-group/study-group.service';


@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {


  constructor(private _StudyGroupService: StudyGroupService) { }

  ngOnInit() {
    var groupName = localStorage.getItem("groupName")
    this._StudyGroupService.postGetGroupRandomNumber({groupName:groupName}).subscribe(data => {
    localStorage.setItem('groupRandomNumber', data.groupRandomNumber);
  });

  }

}
