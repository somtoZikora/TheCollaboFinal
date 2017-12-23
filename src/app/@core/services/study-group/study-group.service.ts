import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class StudyGroupService {
  constructor(private _http: HttpClient) { }
  authToken: any

  // Used by listOfStudyGroupComponent
  getListOfStudyGroups(): any {
    this.authToken = localStorage.getItem('id_token');
    return this._http.get('/api/study-group/list-of-study-groups', {headers:
      new HttpHeaders().set('Authorization', this.authToken)})
      .pipe(
        catchError(this._handleError)
      );
  }
  _handleError(error: Response) {
    console.log(error);
    return Observable.throw(error || 'Server Error');
  }

}


