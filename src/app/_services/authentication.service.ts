import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tokenNotExpired} from 'angular2-jwt';

interface redirectURL{
  signup: string;
}

@Injectable()
export class AuthenticationService {
  authToken: any;
  user: any;
  constructor(private _http: HttpClient) { }
  signup(user): any {
    return this._http.post('/user/signup', user, {headers:
    new HttpHeaders().set('Content-Type', 'application/json')});
  }
  loginAuthenticateUser(user): any {
    return this._http.post('/user/authenticate', user, {headers:
      new HttpHeaders().set('Content-Type', 'application/json')});
  }
  getProfile(): any {
    this.loadToken();
    return this._http.get('/user/profile', {headers:
      new HttpHeaders().set('Authorization', this.authToken)});
  }
  storeUserData(token, user): any {
    localStorage.setItem('id_token', token);
    localStorage.setItem('User', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loggedIn(): any {
    return tokenNotExpired('id_token');
  }
  logout(): any {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  updateInfo(user): any {
    return this._http.post<redirectURL>('/user/update-info', user);
  }

}


