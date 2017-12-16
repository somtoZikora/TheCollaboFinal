import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tokenNotExpired} from 'angular2-jwt';

interface redirectURL {
  signup: string;
}

@Injectable()
export class AuthenticationService {
  authToken: any;
  user: any;
  constructor(private _http: HttpClient) { }

  // Used by SignupComponent
  signup(user): any {
    return this._http.post('/user/signup', user, {headers:
    new HttpHeaders().set('Content-Type', 'application/json')});
  }

  // Used by SignInComponent
  loginAuthenticateUser(user): any {
    return this._http.post('/user/authenticate', user, {headers:
      new HttpHeaders().set('Content-Type', 'application/json')});
  }

  // Used by Porfile Component
  getProfile(): any {
    this.loadToken();
    return this._http.get('/user/profile', {headers:
      new HttpHeaders().set('Authorization', this.authToken)});
  }

  // Used by Dashboard Component
  updateInfo(user): any {
    return this._http.post<redirectURL>('/user/update-info', user);
  }

  // Used by SignIn Component
  storeUserData(token, user): any {
    localStorage.setItem('id_token', token);
    localStorage.setItem('User', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Called by storeUserData function
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Used in AuthGuard and Nav html template
  loggedIn(): any {
    return tokenNotExpired('id_token');
  }

  // Used in nav Component
  logout(): any {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}


