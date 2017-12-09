import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

interface redirectURL{
  signup: string;
}

@Injectable()
export class SignUpServiceService {

  constructor(private _http: HttpClient, private router: Router) { }
  signup(user): any {
    return this._http.post<redirectURL>('/api/signup', user);
  }

}

@Injectable()
export class UpdateInfoService {

  constructor(private _http: HttpClient, private router: Router) { }
  updateInfo(user): any {
    return this._http.post<redirectURL>('/api/update-info', user);
  }

}

