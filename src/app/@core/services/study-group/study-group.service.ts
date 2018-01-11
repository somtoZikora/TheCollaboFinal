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
    return this._http.get('/api/study-group/list-of-study-groups')
      .pipe(
        catchError(this._handleError)
      );
  }
  _handleError(error: Response) {
    console.log(error);
    return Observable.throw(error || 'Server Error')
    .pipe(
      catchError(this._handleError)
    );
  }


  // Used by getinformationAboutStudyGroupComponent
  postgetinformationAboutStudyGroup(user): any {
  return this._http.post('/api/study-group/get-summary-group-information', user, {headers:
    new HttpHeaders().set('Content-Type', 'application/json')});
  }

  // Used by post friend request getinformationAboutStudyGroupComponent
  postFriendRequestToGroup(userInfo): any {
  return this._http.post('/api/study-group/post-friend-request-to-group', userInfo, {headers:
    new HttpHeaders().set('Content-Type', 'application/json')});
  }

  // Used by createStudyGroupComponent
  postCreateStudyGroup(studyGroupInfo): any {
  return this._http.post('/api/study-group/create-study-group', studyGroupInfo, {headers:
    new HttpHeaders().set('Content-Type', 'application/json')});
  }
}
