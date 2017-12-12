import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

interface redirectURL {
  sent: string;
}

@Injectable()
export class ContactUsService {
  constructor(private  _http: HttpClient, private router: Router) { }

  sendMail(message): any {
    return this._http.post<redirectURL>('/user/contact', message);
  }
}
